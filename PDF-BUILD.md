# Resume PDF

The Download PDF button links to a prebuilt PDF matching the color theme and
body font currently selected in the on-page picker. It does not open the
visitor's print dialog.

The picker (color: Blue / Charcoal; font: IBM Plex Sans / Inter / Lato /
Source Sans 3) stores the visitor's choice in `localStorage` and points the
download button at the matching file:

| Color | Font | File |
| --- | --- | --- |
| Blue | IBM Plex Sans (default) | `Juyoung-Moon-Resume.pdf` |
| Charcoal | IBM Plex Sans (default) | `Juyoung-Moon-Resume-original-charcoal.pdf` |
| Blue | Inter | `Juyoung-Moon-Resume-blue-inter.pdf` |
| Charcoal | Inter | `Juyoung-Moon-Resume-charcoal-inter.pdf` |
| Blue | Lato | `Juyoung-Moon-Resume-blue-lato.pdf` |
| Charcoal | Lato | `Juyoung-Moon-Resume-charcoal-lato.pdf` |
| Blue | Source Sans 3 | `Juyoung-Moon-Resume-blue-source.pdf` |
| Charcoal | Source Sans 3 | `Juyoung-Moon-Resume-charcoal-source.pdf` |

All variants render from the same `index.html` content, so text edits
propagate to every theme and font. After editing `index.html`, regenerate
and check all PDFs before committing:

```sh
npm ci
CHROME_BIN=/path/to/chrome npm run build:pdf
```

The default Chrome path is `/usr/bin/google-chrome-stable`. The generator
expands every achievement and certification section, uses A4 pages, retains
backgrounds, and omits browser headers and footers. `npm run build:pdf -- blue`
(or `charcoal`) rebuilds only that theme's PDFs. The build does
not publish, deploy, or change GitHub Pages settings. The PDFs must be rebuilt
when the resume changes; they are not updated automatically.
