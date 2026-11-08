# Resume PDF

`Juyoung-Moon-Resume.pdf` is the single prebuilt PDF matching the default appearance (Navy color, Source Sans 3 font). Visitors can also use the on-page Print / Save PDF button after picking any color and font, which prints exactly what they see.

The page reads optional `?theme=` (blue, charcoal) and `?font=` (source, plex, inter, lato) URL parameters, which the build uses to render the PDF:

    npm ci
    CHROME_BIN=/path/to/chrome npm run build:pdf

After editing `index.html`, regenerate the PDF and check it before committing.
