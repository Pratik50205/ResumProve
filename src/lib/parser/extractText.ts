/**
 * Multi-format text extraction engine for PDF, DOCX, and TXT files.
 */

export async function extractTextFromPdf(buffer: ArrayBuffer | Uint8Array | Buffer): Promise<string> {
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const data = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

    const loadingTask = pdfjs.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
    });

    const pdfDocument = await loadingTask.promise;
    const pageStrings: string[] = [];

    for (let i = 1; i <= pdfDocument.numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      let lastY: number | null = null;
      let pageText = "";

      for (const item of textContent.items) {
        if ("str" in item) {
          const hasTransform = Array.isArray(item.transform);
          const currentY = hasTransform ? item.transform[5] : null;

          // If vertical position changed substantially, start a newline
          if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 6) {
            pageText += "\n";
          } else if (pageText.length > 0 && !pageText.endsWith("\n") && !pageText.endsWith(" ")) {
            pageText += " ";
          }

          pageText += item.str;
          if (currentY !== null) {
            lastY = currentY;
          }
        }
      }

      pageStrings.push(pageText);
    }

    return pageStrings.join("\n\n");
  } catch (err: any) {
    console.error("PDF extraction error:", err);
    throw new Error(`Failed to extract text from PDF: ${err.message || String(err)}`);
  }
}

export async function extractTextFromDocx(buffer: ArrayBuffer | Buffer): Promise<string> {
  try {
    const mammoth = await import("mammoth");
    const nodeBuffer = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const result = await mammoth.extractRawText({ buffer: nodeBuffer });
    return result.value || "";
  } catch (err: any) {
    console.error("DOCX extraction error:", err);
    throw new Error(`Failed to extract text from DOCX: ${err.message || String(err)}`);
  }
}

export function extractTextFromTxt(buffer: ArrayBuffer | Buffer | string): string {
  if (typeof buffer === "string") return buffer;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(buffer)) {
    return buffer.toString("utf-8");
  }
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(buffer);
}

export async function extractRawTextFromFile(
  buffer: ArrayBuffer | Buffer,
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

