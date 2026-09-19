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

## Contact inquiries

The Contact page opens the published [MESY Lab inquiry form](https://docs.google.com/forms/d/e/1FAIpQLSeICPekTOkJBqLmp2Tqi10eQHwXk2O-hrvT6CEIma0xC6M4pA/viewform). Visitors enter their email, name, and message without signing in to Google.

Sign in with the lab Google account and open the [form editor](https://docs.google.com/forms/d/1NH6Aoyrf55JTAYUVqlpU3JAGErdLR5sVDJNwRc1zehA/edit#responses) to view inquiries in the Responses tab. New-response email notifications are enabled for that account. Responses and response summaries are not shared with visitors.

Editing the existing Google Form does not require a website deployment. If the form is replaced, update `inquiryFormUrl` in `src/App.jsx`. Keep responder access open to anyone with the link, response acceptance enabled, email collection set to responder input, and the sign-in requirement and response summaries off.

The Contact map uses the lab's Google Maps place embed. The visiting address in Contact and the site footer is Room 218, Engineering Building V.
