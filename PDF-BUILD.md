# Resume PDF

The Download PDF button links to a prebuilt PDF matching the layout and color
theme currently selected in the on-page picker. It does not open the visitor's
print dialog.

The picker (layout: Original / Sidebar Timeline; color:
Blue / Charcoal) stores the visitor's choice in `localStorage` and points the
download button at the matching file:

| Layout | Color | File |
| --- | --- | --- |
| Original | Blue | `Juyoung-Moon-Resume.pdf` |
| Original | Charcoal | `Juyoung-Moon-Resume-original-charcoal.pdf` |
| Sidebar Timeline | Blue | `Juyoung-Moon-Resume-sidebar-blue.pdf` |
| Sidebar Timeline | Charcoal | `Juyoung-Moon-Resume-sidebar-charcoal.pdf` |

All variants render from the same `index.html` content, so text edits
propagate to every layout and theme. After editing `index.html`, regenerate
and check all PDFs before committing:

```sh
npm ci
CHROME_BIN=/path/to/chrome npm run build:pdf
```

The default Chrome path is `/usr/bin/google-chrome-stable`. The generator
expands every achievement and certification section, uses A4 pages, retains
backgrounds, and omits browser headers and footers. `npm run build:pdf -- sidebar`
(or `original`) rebuilds only that layout's two PDFs. The build does
not publish, deploy, or change GitHub Pages settings. The PDFs must be rebuilt
when the resume changes; they are not updated automatically.
