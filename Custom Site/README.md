# Velocity Custom CMS

Express-based headless CMS with JSON file storage, JWT admin auth, Elementor-derived static pages (`data-cms` hydration), and deployment support for **Railway** (staging + production).

## Requirements

- Node.js **20+** (see `.nvmrc`)
- npm

## Local development

```bash
cd "Custom Site"
npm install
npm run seed          # optional: initial content/schemas (first-time)
npm run build         # rebuild pages/*.html from Elementor modules
npm run add-user -- admin yourpassword
npm run dev           # http://localhost:3000 — admin at /admin
```

- **Site**: `http://localhost:3000/` (generated pages)
- **Admin**: `http://localhost:3000/admin`
- **Health**: `GET /api/health`

By default `DEPLOY_ENV` is `development`: **Save** in the CMS writes to staging and **publishes** to the local `content/production/` folder so the public site updates immediately.

### Local Replica only (no Express CMS)

From `Custom Site/replica`, the **`cms`** symlink points at **`site/`**, so **`/cms/selector-map.js`** loads while you use plain static hosting:

```bash
cd "Custom Site/replica"
python3 -m http.server 8890
```

Example: **`http://localhost:8890/Local%20Replica/index.html?p=home`** (add **`?env=staging`** to mirror staging chrome in the replica shell).

## Environment variables

| Variable | Purpose |
|----------|---------|
| `DEPLOY_ENV` | **`development`** \| **`staging`** \| **`production`** — controls behavior (see below). Defaults to `development`. Set explicitly on Railway; do not rely on `NODE_ENV` alone. |
| `PORT` | HTTP port (Railway sets automatically). |
| `CONTENT_DIR` | Absolute path to the `content` directory. Default: `./content` under the app root. On Railway, point this at a **persistent volume** (e.g. `/data/content`). |
| `JWT_SECRET` | Secret for CMS session JWT cookies. **Required in production.** |
| `SITE_URL` | Canonical public URL of **this** deployment (e.g. `https://staging.velocitysimlounge.com`). Injected into pages for staging UI. |
| `PRODUCTION_URL` | Production site origin (e.g. `https://velocitysimlounge.com`). Used **only** on **staging** for `POST /api/sync/to-production`. |
| `SYNC_SECRET` | Shared secret for staging → production content sync (`X-Sync-Secret` header). Must match on both sides. |
| `STAGING_PASSWORD` | Optional. When set on **staging**, visitors must enter this password once (cookie ~7 days) before viewing public pages. Admin and `/api/*` are not blocked. |
| `ALLOW_SYNC_RECEIVE` | Set to `true` **only** for local testing of `POST /api/sync/receive` when `DEPLOY_ENV` is not `production`. |

### Behavior by `DEPLOY_ENV`

| | `development` | `staging` | `production` |
|--|---------------|-----------|----------------|
| HTTPS redirect | no | yes (behind proxy) | yes |
| Public content default | `production` | `staging` | `production` |
| Staging banner on site | no | yes | no |
| CMS **Save** | writes staging + **local publish** | staging only | staging only |
| **Publish to Production** button | hidden | shown if `PRODUCTION_URL` + `SYNC_SECRET` | hidden |
| `POST /api/sync/receive` | disabled (unless `ALLOW_SYNC_RECEIVE`) | disabled | enabled |

## Git / deploy flow (Railway)

1. **`main`** branch → auto-deploy **staging** (e.g. `staging.velocitysimlounge.com`).
2. **`production`** branch → auto-deploy **production** (e.g. `velocitysimlounge.com`).
3. Merge **main → production** when application code is ready to ship to the live site.

Content is **not** in git (see `.gitignore`). Editors work on **staging**; use **Publish to Production** in the admin to push content to the production server.

## Publishing content (staging → production)

1. Edit in **staging** admin (`DEPLOY_ENV=staging`, `SITE_URL`, `PRODUCTION_URL`, `SYNC_SECRET` set).
2. Click **Publish to Production** (syncs **all** page JSONs, pricing, banners, locations, forms).
3. Production receives `POST /api/sync/receive` with `X-Sync-Secret`, writes files under `CONTENT_DIR`, with backups under `content/backups/sync-<timestamp>/`.

## API: sync endpoints

| Method | Path | Auth |
|--------|------|------|
| `POST` | `/api/sync/to-production` | JWT (staging only). Body: `{ "pages": "all" }` or `{ "pages": ["home","about"] }`. |
| `POST` | `/api/sync/receive` | Header `X-Sync-Secret: <SYNC_SECRET>` |
| `GET` | `/api/sync/status` | JWT — lists pages where staging ≠ production JSON. |
| `GET` | `/api/config` | Optional — deploy flags for the admin UI. |

## Adding a location

1. Admin → **Locations** → add slug (e.g. `austin`).
2. `content/locations.json` updated (or edit manually on the server volume).
3. Per-location fields in schemas (`perLocation: true`) show the new location in the editor.

## Adding a new page (code)

1. Add the Elementor HTML module under `replica/` (or your source folder).
2. Register the page in `scripts/build-pages.js` (selector rules / `data-cms` mapping).
3. Add `content/schemas/<page-key>.json` (field definitions).
4. Run `npm run build` and commit **schema + build script**; **not** generated `pages/*.html` if gitignored.
5. Seed or create initial `content/staging/<page-key>.json` and `content/production/<page-key>.json` (via admin or `seed-content.js`).

## Backups

- **Local publish** creates `content/production/<page>.backup.json` per page.
- **Sync receive** writes timestamped folders under `content/backups/sync-<timestamp>/`.
- **Railway**: attach a **persistent volume** to `CONTENT_DIR` and snapshot or export that volume for disaster recovery.

## Project layout (high level)

- `server.js` — API, static pages, auth, sync, staging gate.
- `config.js` — environment resolution.
- `content/` — runtime JSON (many paths gitignored).
- `pages/` — generated HTML (`npm run build`).
- `pages/shared/site.js` — client hydration + staging banner.
- `admin/` — CMS UI.
- `scripts/build-pages.js` — Elementor → `data-cms` pages.

### Suggested Railway settings

- **Staging service**: `DEPLOY_ENV=staging`, `SITE_URL=https://staging...`, `PRODUCTION_URL=https://velocitysimlounge.com`, `SYNC_SECRET=...`, `JWT_SECRET=...`, optional `STAGING_PASSWORD`, volume mount → `CONTENT_DIR`.
- **Production service**: `DEPLOY_ENV=production`, `SITE_URL=https://velocitysimlounge.com`, same `SYNC_SECRET` as used by staging for signing, `JWT_SECRET=...`, volume mount → `CONTENT_DIR`.
