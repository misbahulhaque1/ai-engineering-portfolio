# Misbah Ul Haque · AI Engineering Portfolio

Portfolio, public project case studies, and interactive experiments in model evaluation, neural networks, research workflows, and business intelligence.

## Development

Run with Node.js 22 or later. The site has no package dependencies.

```sh
npm test
npm run build
npm run dev
```

The build writes static pages and assets to `dist/`. Vercel uses `npm run build` and serves that directory. Set `SITE_URL` when building for any other production domain.

## Browser checks

```sh
python -m pip install playwright
python -m playwright install chromium
npm run build
python tests/browser.py
```

Set `BASE_URL` to use a deployed build, or `CHROMIUM_PATH` to use an installed Chromium binary. The tests cover every page, internal links, responsive sizing, keyboard search, reduced motion, theme storage, project-assistant answers, lab controls, and the PDF download.

## Content and experiments

- `src/content.js` contains professional details and project sources.
- `src/logic.js` contains the lab calculations and the local retrieval index.
- The assistant returns sourced excerpts. The research workflow uses deterministic steps. Both run locally without a hosted model.
- The lab datasets are synthetic. The downloadable notebook reproduces threshold metrics.
