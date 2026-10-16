# Resume PDF

The Download PDF button links to `Juyoung-Moon-Resume.pdf`. It does not open the visitor's print dialog.

After editing `index.html`, regenerate and check the PDF before committing both files:

```sh
npm ci
CHROME_BIN=/path/to/chrome npm run build:pdf
```

The default Chrome path is `/usr/bin/google-chrome-stable`. The generator expands every achievement and certification section, uses A4 pages, retains backgrounds, and omits browser headers and footers. It does not publish, deploy, or change GitHub Pages settings. The PDF must be rebuilt when the resume changes; it is not updated automatically.
