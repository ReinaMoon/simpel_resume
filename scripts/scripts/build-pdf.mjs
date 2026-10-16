import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const variants = [
  ['original', 'blue', 'Juyoung-Moon-Resume.pdf'],
  ['original', 'charcoal', 'Juyoung-Moon-Resume-original-charcoal.pdf'],
  ['sidebar', 'blue', 'Juyoung-Moon-Resume-sidebar-blue.pdf'],
  ['sidebar', 'charcoal', 'Juyoung-Moon-Resume-sidebar-charcoal.pdf'],
];
const only = process.argv[2]; // optional: layout name to build just one variant family
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome-stable',
  headless: true,
  args: process.env.CI ? ['--no-sandbox'] : []
});
try {
  for (const [layout, theme, file] of variants) {
    if (only && layout !== only) continue;
    const page = await browser.newPage();
    await page.goto(`file://${path.join(root, 'index.html')}?layout=${layout}&theme=${theme}`, {waitUntil: 'networkidle0'});
    await page.evaluate(async () => {
      document.querySelectorAll('details').forEach(el => { el.open = true; });
      await document.fonts.ready;
    });
    await page.pdf({
      path: path.join(root, file), format: 'A4',
      preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false
    });
    console.log(`Saved ${file} (${layout}, ${theme}) with all achievements and certifications expanded.`);
    await page.close();
  }
} finally { await browser.close(); }
