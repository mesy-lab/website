# MESY Lab Website

Official website source for **MESY Lab, Hanyang University**.

## Technology

- React 19
- Vite 6
- JavaScript / CSS

## Local development

Requirements: Node.js (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Then open the local address shown by Vite in a browser.

## Production build

```bash
npm run build
```

The production files are generated in `dist/`.

## Repository policy

Do not commit generated or machine-specific files such as:

- `node_modules/`
- `dist/`
- `.env*`

These are excluded by `.gitignore`.

## Deployment

Deployment configuration will be added after the source is verified in GitHub. The intended production domain is `mesy.hanyang.ac.kr`.
