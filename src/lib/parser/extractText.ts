/**
 * Multi-format text extraction engine for PDF, DOCX, and TXT files.
 */

export async function extractTextFromPdf(buffer: ArrayBuffer | Uint8Array | Buffer): Promise<string> {
  try {
    // 1. Prepare clean Uint8Array that is guaranteed not to be a Node.js Buffer
    let uint8: Uint8Array;
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(buffer)) {
      const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      uint8 = new Uint8Array(ab);
    } else if (buffer instanceof Uint8Array) {
      const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      uint8 = new Uint8Array(ab);
    } else {
      uint8 = new Uint8Array(buffer);
    }

    // 2. Load PDF using pdfjs-dist legacy build (and load worker module)
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    try {
      // @ts-ignore
      await import("pdfjs-dist/legacy/build/pdf.worker.mjs");
    } catch {
      // Ignore if worker already loaded or bundled
    }
    const loadingTask = pdfjs.getDocument({
      data: uint8,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const pdfDocument = await loadingTask.promise;
    const pageStrings: string[] = [];

    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      interface RawItem {
        str: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }

      const items: RawItem[] = [];

      for (const item of textContent.items) {
        if ("str" in item && typeof item.str === "string" && item.str.trim().length > 0) {
          const transform = Array.isArray(item.transform) ? item.transform : [1, 0, 0, 1, 0, 0];
          items.push({
            str: item.str,
            x: transform[4] || 0,
            y: transform[5] || 0,
            width: typeof item.width === "number" ? item.width : (item.str.length * 6),
            height: typeof item.height === "number" ? item.height : 10,
          });
        }
      }

      if (items.length === 0) continue;

      // Intelligent Layout Detection: Determine if page has a 2-column sidebar layout
      // In a single-column resume, many words span across the center of the page.
      // In a genuine 2-column resume, there is a clear vertical corridor (gutter) with <= 2 crossing items (header only).
      const testGutters = [
        { start: 175, end: 235 }, // 1/3 sidebar layout (e.g., modern two-column)
        { start: 265, end: 325 }, // 1/2 split layout
      ];

      let detectedGutter: { start: number; end: number } | null = null;

      for (const g of testGutters) {
        // Items that start on the left and cross into/past the gutter
        const crossingItems = items.filter(
          (it) => it.x < g.start && (it.x + it.width) > (g.start + 15)
        );
        // Items located inside the gutter
        const insideGutter = items.filter(
          (it) => it.x >= g.start && (it.x + it.width) <= g.end
        );

        const leftCount = items.filter((it) => it.x < g.start).length;
        const rightCount = items.filter((it) => it.x > g.end).length;

        // In a true 2-column layout, crossing items must be <= 3 (at most candidate name/title header)
        // and both columns must contain substantial content (>= 12 items each).
        if (crossingItems.length <= 3 && insideGutter.length <= 3 && leftCount >= 12 && rightCount >= 12) {
          detectedGutter = g;
          break;
        }
      }

      const processItemsToLines = (rawItems: RawItem[]): string => {
        // Group items into horizontal lines (tolerance: within 3.5 vertical points)
        const lines: { y: number; items: RawItem[] }[] = [];

        for (const item of rawItems) {
          let line = lines.find((l) => Math.abs(l.y - item.y) <= 3.5);
          if (!line) {
            line = { y: item.y, items: [] };
            lines.push(line);
          }
          line.items.push(item);
        }

        // Sort lines from top of the page to bottom (higher Y in PDF = higher on page)
        lines.sort((a, b) => b.y - a.y);

        // Sort items within each line from left to right
        const lineStrings = lines.map((line) => {
          line.items.sort((a, b) => a.x - b.x);
          let str = "";
          let prevRight = -1;

          for (const it of line.items) {
            // Insert space if there is a gap between items and neither ends/starts with space
            if (prevRight !== -1 && (it.x - prevRight) > 2.0 && !str.endsWith(" ") && !it.str.startsWith(" ")) {
              str += " ";
            }
            str += it.str;
            prevRight = it.x + it.width;
          }

          return str.trim();
        });

        return lineStrings.filter((l) => l.length > 0).join("\n");
      };

      if (detectedGutter) {
        // True 2-column page:
        // Extract full-width header items first (items with Y above the top of the column split)
        const g = detectedGutter;
        const headerThresholdY = Math.max(...items.map((it) => it.y)) - 70;
        
        const topHeaderItems = items.filter((it) => it.y >= headerThresholdY && (it.x < g.start && (it.x + it.width) > g.start));
        const remainingItems = items.filter((it) => !topHeaderItems.includes(it));

        const leftItems = remainingItems.filter((it) => it.x < g.start);
        const rightItems = remainingItems.filter((it) => it.x >= g.start);

        const headerText = topHeaderItems.length > 0 ? processItemsToLines(topHeaderItems) : "";
        const leftText = processItemsToLines(leftItems);
        const rightText = processItemsToLines(rightItems);

        const pageParts = [headerText, leftText, rightText].filter((p) => p.trim().length > 0);
        pageStrings.push(pageParts.join("\n\n"));
      } else {
        // Single-column page (or unified flow): preserves continuous lines and complete sentences
        pageStrings.push(processItemsToLines(items));
      }
    }

    return pageStrings.join("\n\n");
  } catch (err: any) {
    console.error("PDF extraction error:", err);
    throw new Error(`Failed to extract text from PDF: ${err.message || String(err)}`);
  }
}

export async function extractTextFromDocx(buffer: ArrayBuffer | Buffer | Uint8Array): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    let nodeBuffer: Buffer;
    if (Buffer.isBuffer(buffer)) {
      nodeBuffer = buffer;
    } else if (buffer instanceof Uint8Array) {
      nodeBuffer = Buffer.from(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    } else {
      nodeBuffer = Buffer.from(buffer);
    }
    const result = await mammoth.extractRawText({ buffer: nodeBuffer });
    return result.value || "";
  } catch (err: any) {
    console.error("DOCX extraction error:", err);
    throw new Error(`Failed to extract text from DOCX: ${err.message || String(err)}`);
  }
}

export function extractTextFromTxt(buffer: ArrayBuffer | Buffer | Uint8Array | string): string {
  if (typeof buffer === "string") return buffer;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(buffer)) {
    return buffer.toString("utf-8");
  }
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}

export async function extractRawTextFromFile(
  buffer: ArrayBuffer | Buffer | Uint8Array,
  format: "pdf" | "docx" | "txt"
): Promise<string> {
  switch (format) {
    case "pdf":
      return extractTextFromPdf(buffer);
    case "docx":
      return extractTextFromDocx(buffer);
    case "txt":
      return extractTextFromTxt(buffer);
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
}

