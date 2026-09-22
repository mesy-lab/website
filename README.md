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

GitHub Actions deploys `main` to GitHub Pages and imports published Drive content on scheduled runs. The production domain is `mesy.hanyang.ac.kr`. The build uses `actions/configure-pages`'s `base_path` output so assets and navigation use `/` on the custom domain and `/website/` on the default repository URL.

## Graduate recruitment

The home page displays the graduate recruitment notice on the first visit in each browser tab. Closing it (including Escape) or following Learn More & Apply dismisses it for the current tab session. The Recruit navigation item and home-page recruitment links always open `/recruit`. The notice uses a native modal dialog, with independently scrollable content and visible close/application controls on small screens.

Edit recruitment copy and the KIMM School URL in `src/components/Recruitment.jsx`, and its layout in `src/components/recruitment.css`. Contact MESY Lab opens the existing Contact page; the application section also provides the lab email for supporting documents. The `/recruit` entry is included in `scripts/generate-pages.mjs` for direct access on GitHub Pages.

## Contact inquiries

The Contact page opens the published [MESY Lab inquiry form](https://docs.google.com/forms/d/e/1FAIpQLSeICPekTOkJBqLmp2Tqi10eQHwXk2O-hrvT6CEIma0xC6M4pA/viewform). Visitors enter their email, name, and message without signing in to Google.

Sign in with the lab Google account and open the [form editor](https://docs.google.com/forms/d/1NH6Aoyrf55JTAYUVqlpU3JAGErdLR5sVDJNwRc1zehA/edit#responses) to view inquiries in the Responses tab. New-response email notifications are enabled for that account. Responses and response summaries are not shared with visitors.

Editing the existing Google Form does not require a website deployment. If the form is replaced, update `inquiryFormUrl` in `src/App.jsx`. Keep responder access open to anyone with the link, response acceptance enabled, email collection set to responder input, and the sign-in requirement and response summaries off.

The Contact map uses the lab's Google Maps place embed. The visiting address in Contact and the site footer is Room 218, Engineering Building V.
