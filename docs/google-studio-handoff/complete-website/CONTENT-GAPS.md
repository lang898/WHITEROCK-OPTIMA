# WHITEROCK Content Gap Log

Updated: 2026-07-07

## Generated This Round

- Added two generated editorial news images under `assets/news/`.
- Wired News cards to display article images.
- Replaced public `[confirm]` and `TODO` factory/compliance wording with professional pending-verification copy.
- Set WhatsApp temporarily to the current Vietnam mobile number in `data/site.config.json`.
- Removed public TODO strings from social links and Web3Forms config by leaving those fields empty until the owner provides real account data.

## Still Required From Owner

- Web3Forms access key for live form submission.
- GitHub repository name and Cloudflare Worker OAuth URL for `/admin` login.
- Social media profile URLs, if WHITEROCK wants them shown.
- Postal code, if required for structured data.
- Verified certificates, current test reports, and exact certification claims.
- Factory staff count, production line count, export-market count, on-time delivery percentage, equipment model/count details, AQL plan, and full measuring-tool list.
- China supporting company tax code and full factory address, if they should be published.
- Real owner-approved product photos, project photos, and any missing real machine photos. Current generated visuals remain illustrative or supporting editorial imagery.

## Intentional Empty Fields

- `data/factory.json` equipment `media` fields stay empty where no real owner-supplied machine photo exists; line drawings are shown instead.
- `data/locales.json` empty default-language paths are normal and should not be filled.
- Empty social links prevent unverified social URLs from appearing.
- Empty Web3Forms key keeps forms in email-fallback mode until the owner provides the real key.
