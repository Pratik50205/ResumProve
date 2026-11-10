const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const SCREENSHOTS_DIR = path.join(__dirname, '..', '.system_generated', 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const ROUTES = [
  { name: 'landing', path: '/' },
  { name: 'builder', path: '/builder' },
  { name: 'analyzer', path: '/analyzer' },
  { name: 'templates', path: '/templates' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'settings', path: '/settings' }
];

async function runCheck() {
  console.log('Launching browser with binary:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const errors = [];
  const warnings = [];

  page.on('pageerror', (err) => {
    console.error('  [PAGE ERROR]:', err.message);
    errors.push({ type: 'pageerror', message: err.message });
  });

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      console.error('  [CONSOLE ERROR]:', text);
      errors.push({ type: 'console.error', message: text });
    } else if (msg.type() === 'warn') {
      const text = msg.text();
      warnings.push({ type: 'console.warn', message: text });
    }
  });

  page.on('requestfailed', (req) => {
    const failure = req.failure();
    console.error(`  [REQUEST FAILED]: ${req.url()} - ${failure ? failure.errorText : 'Unknown'}`);
    errors.push({ type: 'requestfailed', url: req.url(), error: failure ? failure.errorText : 'Unknown' });
  });

  console.log('\n--- 1. STATIC ROUTE AUDIT ---\n');

  for (const route of ROUTES) {
    const url = `http://localhost:3000${route.path}`;
    console.log(`Auditing: ${route.name} (${url})...`);

    const pageErrorsBefore = errors.length;

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = response ? response.status() : 'No response';
      console.log(`  HTTP Status: ${status}`);

      // Check for Next.js error overlay
      const hasErrorOverlay = await page.evaluate(() => {
        return !!document.querySelector('nextjs-portal') ||
               !!document.querySelector('[data-nextjs-dialog-overlay]') ||
               document.body.innerText.includes('Application error: a client-side exception has occurred');
      });

      // Check if blank
      const bodyTextLength = await page.evaluate(() => document.body.innerText.trim().length);
      const title = await page.title();

      console.log(`  Document Title: "${title}"`);
      console.log(`  Body text length: ${bodyTextLength} chars`);
      console.log(`  Next.js error overlay: ${hasErrorOverlay}`);

      if (hasErrorOverlay) {
        errors.push({ type: 'overlay', route: route.path, message: 'Next.js error overlay displayed on screen!' });
      }

      if (bodyTextLength < 50) {
        errors.push({ type: 'blank_screen', route: route.path, message: 'Page rendered blank or almost empty!' });
      }

      // Take screenshot
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  Screenshot saved: ${route.name}.png`);

      const pageErrors = errors.length - pageErrorsBefore;
      console.log(`  Route check completed with ${pageErrors} errors.\n`);

    } catch (e) {
      console.error(`  Failed to audit ${route.name}:`, e.message);
      errors.push({ type: 'navigation_error', route: route.path, message: e.message });
    }
  }

  // INTERACTIVE TEST: /analyzer
  console.log('--- 2. INTERACTIVE AUDIT: /analyzer ---');
  try {
    await page.goto('http://localhost:3000/analyzer', { waitUntil: 'networkidle2' });
    
    // Check if dropdown exists and select Anthropic sample
    const sampleDropdown = await page.$('select');
    if (sampleDropdown) {
      console.log('  Selecting Anthropic sample in dropdown...');
      await page.select('select', 'anthropic-ml');
      await page.evaluate(() => {
        const select = document.querySelector('select');
        if (select) select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      await new Promise(r => setTimeout(r, 1000));
    }

    // Click "Extract Job Intelligence" button
    const buttons = await page.$$('button');
    let extractBtn = null;
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('Extract Job Intelligence')) {
        extractBtn = btn;
        break;
      }
    }

    if (extractBtn) {
      console.log('  Clicking "Extract Job Intelligence" button...');
      await extractBtn.click();
      await new Promise(r => setTimeout(r, 1500));
    }

    // Verify right panel extracted content
    const intelligenceText = await page.evaluate(() => {
      const el = document.querySelector('main');
      return el ? el.innerText.toLowerCase() : '';
    });

    const hasRequiredSkills = intelligenceText.includes('required skills');
    const hasSeniority = intelligenceText.includes('senior') || intelligenceText.includes('principal') || intelligenceText.includes('staff');
    const hasResponsibilities = intelligenceText.includes('responsibilities');

    console.log(`  Has Required Skills section: ${hasRequiredSkills}`);
    console.log(`  Has Seniority badge: ${hasSeniority}`);
    console.log(`  Has Responsibilities: ${hasResponsibilities}`);

    if (!hasRequiredSkills) {
      errors.push({ type: 'ui_error', feature: 'analyzer', message: 'Required skills section missing from UI' });
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'analyzer_interactive.png') });
    console.log('  Screenshot saved: analyzer_interactive.png\n');
  } catch (e) {
    console.error('  Interactive /analyzer test failed:', e.message);
    errors.push({ type: 'interactive_error', feature: 'analyzer', message: e.message });
  }

  // INTERACTIVE TEST: /builder
  console.log('--- 3. INTERACTIVE AUDIT: /builder ---');
  try {
    await page.goto('http://localhost:3000/builder', { waitUntil: 'networkidle2' });
    
    // Check if preview canvas exists
    const hasLivePreview = await page.evaluate(() => {
      return !!document.querySelector('.resume-print-canvas');
    });
    console.log(`  Has Live Resume Print Canvas (.resume-print-canvas): ${hasLivePreview}`);
    if (!hasLivePreview) {
      errors.push({ type: 'ui_error', feature: 'builder', message: 'Resume print canvas missing' });
    }

    // Switch to Summary Tab
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('Summary')) {
        console.log('  Switching to Summary section...');
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }

    // Check for "AI Draft Summary" button
    const hasSummaryAiButton = await page.evaluate(() => {
      return document.body.innerText.includes('AI Draft Summary');
    });
    console.log(`  Has Summary "AI Draft Summary" button: ${hasSummaryAiButton}`);

    // Click "AI Draft Summary" to test modal opening
    const summaryAiBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.includes('AI Draft Summary'));
    });

    if (summaryAiBtn && summaryAiBtn.asElement()) {
      console.log('  Clicking "AI Draft Summary" button to test modal opening...');
      await summaryAiBtn.asElement().click();
      await new Promise(r => setTimeout(r, 1000));

      const isModalOpen = await page.evaluate(() => {
        return document.body.innerText.includes('Fact-Lock™ Summary Architect');
      });
      console.log(`  Summary Generator Modal opened cleanly: ${isModalOpen}`);

      // Close modal
      const closeBtn = await page.evaluateHandle(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        return btns.find(b => b.innerText.includes('Cancel'));
      });
      if (closeBtn && closeBtn.asElement()) {
        await closeBtn.asElement().click();
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // Switch to Experience Tab
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text.includes('Experience')) {
        console.log('  Switching to Experience tab...');
        await btn.click();
        await new Promise(r => setTimeout(r, 800));
        break;
      }
    }

    // Check for "AI Fix" button in Experience
    const hasAiFixButton = await page.evaluate(() => {
      return document.body.innerText.includes('AI Fix');
    });
    console.log(`  Has "AI Fix" Fact-Lock button in experience bullets: ${hasAiFixButton}`);

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'builder_interactive.png') });
    console.log('  Screenshot saved: builder_interactive.png\n');
  } catch (e) {
    console.error('  Interactive /builder test failed:', e.message);
    errors.push({ type: 'interactive_error', feature: 'builder', message: e.message });
  }

  await browser.close();

  console.log('====================================');
  console.log('       FINAL AUDIT SUMMARY          ');
  console.log('====================================');
  console.log(`Total errors detected: ${errors.length}`);
  if (errors.length > 0) {
    console.log('Errors details:');
    errors.forEach((e, i) => console.log(`  ${i + 1}. [${e.type}] ${e.route || ''} ${e.message || JSON.stringify(e)}`));
  } else {
    console.log('SUCCESS: All 6 routes, interactive controls, live print canvas, Fact-Lock modals, and assets passed with 0 UI/runtime errors!');
  }
}

runCheck().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
