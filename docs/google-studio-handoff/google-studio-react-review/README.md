# WHITEROCK Google Studio Review Build

This project is a cleaned, photo-pending version of the WHITEROCK React/Vite website exported from Google AI Studio. It keeps the Studio visual direction and product interaction model while removing unverified commercial, certification, customs, facility, capacity, and social-media claims.

## Run locally

```bash
npm install
npm run lint
npm run build
npm run dev
```

Vite writes the production site to `dist/`. The app uses hash navigation and `base: './'`, so the built files can be hosted from a subfolder on GitHub Pages, GoDaddy, or another static host without a server.

## Edit content

- Company and contact information: `data/site.config.json`
- Product catalog and future photo paths: `data/products.json`
- Digital color directions: `data/colors.json`
- Materials, finishes, edges, applications, process, resources, and FAQ: `data/content.json`

The public navigation contains six top-level groups. The previous localStorage admin prototype is not published or represented as a real CMS.

## Forms

Forms use Web3Forms directly from the browser. Add the owner’s key to `web3FormsAccessKey` in `data/site.config.json`. When the key is blank, the interface shows a configuration notice and does not simulate a successful submission.

## Photos

This version does not bundle or request photographs. See `PHOTO-SLOTS.md` for the replacement list. Do not publish a generated factory, equipment, product, or project image as real. Only owner-supplied or properly licensed media should replace these slots, with accurate captions and alt text.

## Owner confirmation gate

Before production launch, review the `reviewRequired` list in `data/site.config.json`. Do not publish fixed claims about duties, origin, certifications, test results, facility statistics, equipment precision, MOQ, or lead time without current supporting records and owner approval.
