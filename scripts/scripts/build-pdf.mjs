import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome-stable',
  headless: true,
  args: process.env.CI ? ['--no-sandbox'] : []
});
try {
  const page = await browser.newPage();
  await page.goto(`file://${path.join(root, 'index.html')}`, {waitUntil: 'networkidle0'});
  await page.evaluate(async () => {
    document.querySelectorAll('details').forEach(el => { el.open = true; });
    await document.fonts.ready;
  });
  await page.pdf({
    path: path.join(root, 'Juyoung-Moon-Resume.pdf'), format: 'A4',
    preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false
  });
  console.log('Saved Juyoung-Moon-Resume.pdf with all achievements and certifications expanded.');
} finally { await browser.close(); }
