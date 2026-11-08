import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const variants = [
  ['blue', 'source', 'Juyoung-Moon-Resume.pdf'],
];
const only = process.argv[2]; // optional: theme name to build just one theme's PDFs
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome-stable',
  headless: true,
  args: process.env.CI ? ['--no-sandbox'] : ['--no-sandbox']
});
try {
  for (const [theme, font, file] of variants) {
    if (only && theme !== only) continue;
    const page = await browser.newPage();
    await page.goto(`file://${path.join(root, 'index.html')}?theme=${theme}&font=${font}`, {waitUntil: 'networkidle0'});
    await page.evaluate(async () => {
      document.querySelectorAll('details').forEach(el => { el.open = true; });
      await document.fonts.ready;
    });
    await page.pdf({
      path: path.join(root, file), format: 'A4',
      preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false
    });
    console.log(`Saved ${file} (${theme}, ${font}) with all achievements and certifications expanded.`);
    await page.close();
  }
} finally { await browser.close(); }
