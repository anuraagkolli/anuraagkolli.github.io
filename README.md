# anuraagkolli.github.io

Personal site. Next.js static export, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
npm run lint
```

All copy lives in `lib/content.ts`; the components only lay it out.

The previous version of this site is archived on the `archive-2024-portfolio`
branch.

Note: characters above U+07FF break the SWC build when they appear directly in
JSX text, so such strings belong in `lib/content.ts` instead.
