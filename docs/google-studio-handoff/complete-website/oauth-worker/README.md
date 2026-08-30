# WHITEROCK Decap OAuth Worker

This Cloudflare Worker handles the GitHub OAuth popup used by Decap CMS. It stores no content and has no database.

1. Create a GitHub OAuth App with callback `https://YOUR-WORKER.workers.dev/callback`.
2. Run `npm install` in this directory.
3. Run `npx wrangler login`.
4. Add secrets with `npx wrangler secret put OAUTH_CLIENT_ID` and `npx wrangler secret put OAUTH_CLIENT_SECRET`.
5. Run `npm run deploy`.
6. Copy the Worker origin into `admin/config.yml` as `base_url`.

Set `GITHUB_REPO_PRIVATE` to `0` in `wrangler.toml` only when the website repository is public. Never commit `.dev.vars` or OAuth secrets.
