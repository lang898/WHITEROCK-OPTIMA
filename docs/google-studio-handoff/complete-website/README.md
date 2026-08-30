# WHITEROCK Completed Website Snapshot

This folder contains the completed WHITEROCK static website snapshot prepared by Codex for Google Studio / Claude review.

Included:
- Public HTML pages, CSS, JavaScript, sitemap, robots, and localized `zh/` and `vi/` outputs.
- Source templates under `src/`, shared data under `data/`, CMS config under `admin/`, build scripts under `scripts/`, deployment workflow under `.github/`, and local assets under `assets/`.
- Built static output under `dist/`.

Excluded:
- Historical zip packages.
- Backup/export folders.
- `node_modules`.
- Local Git folders and the nested GitHub clone.

Recommended review path:
1. Read `MIGRATION.md`, `WEBSITE-NOTES.md`, and `REVIEW-FOR-CLAUDE.md`.
2. Review data files under `data/`.
3. Review source templates under `src/pages/` and `src/partials/`.
4. Use `npm install` and `npm run build` from this folder if rebuilding locally.
