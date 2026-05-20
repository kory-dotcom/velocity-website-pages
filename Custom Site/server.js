const express = require('express');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

const {
  deployEnv,
  CONTENT_DIR,
  SITE_URL,
  PRODUCTION_URL,
  SYNC_SECRET,
  STAGING_PASSWORD,
  JWT_SECRET,
  PORT,
  isStaging,
  isProduction,
  publicContentEnvDefault,
  savePublishesLocally,
  showPublishToProduction,
  showStagingBanner,
  enforceHttps
} = require('./config');

const app = express();
const USERS_FILE = path.join(__dirname, '.cms-users.json');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------------------------
// Simple cookie parser (no dependency needed -- just parse Cookie header)
// ---------------------------------------------------------------------------
app.use((req, _res, next) => {
  req.cookies = {};
  const hdr = req.headers.cookie;
  if (hdr) {
    hdr.split(';').forEach(pair => {
      const [k, ...v] = pair.trim().split('=');
      if (k) req.cookies[k.trim()] = decodeURIComponent(v.join('='));
    });
  }
  next();
});

// ---------------------------------------------------------------------------
// HTTPS (staging + production behind Railway / reverse proxies)
// ---------------------------------------------------------------------------
if (enforceHttps) {
  app.use((req, res, next) => {
    const proto = req.headers['x-forwarded-proto'];
    if (proto && proto !== 'https') {
      return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    }
    next();
  });
}

// ---------------------------------------------------------------------------
// Staging preview password gate (public site only; API/admin stay reachable)
// ---------------------------------------------------------------------------
const STAGING_COOKIE = 'vsl_staging_pass';
const STAGING_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function isProbablyStaticAsset(p) {
  return /\.(css|js|mjs|map|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|mp4|webm|pdf|json)$/i.test(p);
}

function stagingGateExcludedPath(p) {
  if (isProbablyStaticAsset(p)) return true;
  if (p.startsWith('/api')) return true;
  if (p.startsWith('/admin')) return true;
  if (p.startsWith('/uploads')) return true;
  if (p.startsWith('/cms')) return true;
  if (p.startsWith('/navbar-assets')) return true;
  if (p.startsWith('/pages/shared')) return true;
  if (p === '/staging-unlock' || p === '/favicon.ico') return true;
  // Replica / Elementor asset folders
  if (p.includes('/_files/') || p.includes('_files/')) return true;
  return false;
}

function sendStagingGatePage(res) {
  res.status(401).send(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Staging — Velocity</title>
<style>
body{font-family:system-ui,sans-serif;background:#0a0a12;color:#eee;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;}
.card{background:#16162a;padding:2rem;border-radius:12px;max-width:420px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,.4);}
h1{font-size:1.1rem;margin:0 0 .5rem;color:#EE265F;}
p{color:#aaa;font-size:.9rem;margin:0 0 1.25rem;}
input{width:100%;padding:.65rem .9rem;border-radius:8px;border:1px solid #333;background:#0b0b14;color:#fff;font-size:1rem;box-sizing:border-box;}
button{margin-top:1rem;width:100%;padding:.75rem;border-radius:8px;border:none;background:#EE265F;color:#fff;font-weight:600;cursor:pointer;font-size:1rem;}
.err{color:#f66;font-size:.85rem;margin-top:.5rem;}
</style></head><body>
<div class="card"><h1>Staging environment</h1><p>Enter the preview password to continue.</p>
<form method="post" action="/staging-unlock">
<input type="password" name="password" placeholder="Password" autocomplete="current-password" required autofocus/>
<button type="submit">Continue</button>
${''}</form></div></body></html>`);
}

if (isStaging && STAGING_PASSWORD) {
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (stagingGateExcludedPath(req.path)) return next();
    if (req.cookies[STAGING_COOKIE] === STAGING_PASSWORD) return next();
    return sendStagingGatePage(res);
  });
}

app.post('/staging-unlock', (req, res) => {
  if (!isStaging || !STAGING_PASSWORD) return res.redirect('/');
  const pwd = req.body && req.body.password;
  if (pwd !== STAGING_PASSWORD) {
    return res.status(401).send(`<!DOCTYPE html><html><body style="font-family:sans-serif;padding:2rem;text-align:center;">
<p>Wrong password.</p><p><a href="/">Try again</a></p></body></html>`);
  }
  res.cookie(STAGING_COOKIE, STAGING_PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: STAGING_COOKIE_MAX_AGE_MS,
    path: '/'
  });
  const nextUrl = typeof req.query.next === 'string' && req.query.next.startsWith('/') ? req.query.next : '/';
  res.redirect(302, nextUrl);
});

// ---------------------------------------------------------------------------
// Ensure required directories exist
// ---------------------------------------------------------------------------
const ensureDirs = [
  'schemas', 'staging', 'production',
  'uploads', 'forms', 'form-submissions'
];
ensureDirs.forEach(d => {
  const full = path.join(CONTENT_DIR, d);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function readJSON(filepath, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch { return fallback; }
}

function writeJSON(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

function getSchemaPageIds() {
  const schemasDir = path.join(CONTENT_DIR, 'schemas');
  if (!fs.existsSync(schemasDir)) return [];
  return fs.readdirSync(schemasDir).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
}

function readFormsMap() {
  const formsDir = path.join(CONTENT_DIR, 'forms');
  if (!fs.existsSync(formsDir)) return {};
  const out = {};
  for (const f of fs.readdirSync(formsDir).filter(x => x.endsWith('.json'))) {
    const id = f.replace('.json', '');
    out[id] = readJSON(path.join(formsDir, f), null);
  }
  return out;
}

function injectDeployScript(html) {
  const payload = JSON.stringify({
    env: publicContentEnvDefault,
    banner: showStagingBanner,
    siteUrl: SITE_URL || '',
    deployEnv
  });
  const script = `<script>window.__VSL_DEPLOY__=${payload};</script>`;
  if (html.includes('</head>')) return html.replace('</head>', `${script}</head>`);
  return script + html;
}

function sendHtmlWithDeployMeta(res, filePath) {
  try {
    const html = fs.readFileSync(filePath, 'utf8');
    res.type('html').send(injectDeployScript(html));
  } catch {
    res.status(500).send('Error loading page');
  }
}

function getUsers() {
  return readJSON(USERS_FILE, []);
}

// ---------------------------------------------------------------------------
// Auth middleware
// ---------------------------------------------------------------------------
function requireAuth(req, res, next) {
  const token = req.cookies?.cms_token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Optional auth -- sets req.user if token present, but doesn't block
function optionalAuth(req, _res, next) {
  const token = req.cookies?.cms_token;
  if (token) {
    try { req.user = jwt.verify(token, JWT_SECRET); } catch {}
  }
  next();
}

// ---------------------------------------------------------------------------
// Health + client config
// ---------------------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: deployEnv, time: new Date().toISOString() });
});

app.get('/api/config', optionalAuth, (_req, res) => {
  res.json({
    deployEnv,
    siteUrl: SITE_URL || null,
    savePublishesLocally,
    showPublishToProduction,
    showStagingBanner,
    publicContentEnvDefault,
    productionUrl: PRODUCTION_URL || null
  });
});

// ---------------------------------------------------------------------------
// Auth routes
// ---------------------------------------------------------------------------
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });

  const users = getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.hash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '24h' });
  res.cookie('cms_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
    path: '/'
  });
  res.json({ ok: true, username: user.username });
});

app.post('/api/logout', (_req, res) => {
  res.clearCookie('cms_token', { path: '/' });
  res.json({ ok: true });
});

app.get('/api/me', requireAuth, (req, res) => {
  res.json({ username: req.user.username });
});

// ---------------------------------------------------------------------------
// Locations API
// ---------------------------------------------------------------------------
function getLocations() {
  return readJSON(path.join(CONTENT_DIR, 'locations.json'), ['houston', 'dallas']);
}

app.get('/api/locations', (_req, res) => {
  res.json(getLocations());
});

app.post('/api/locations', requireAuth, (req, res) => {
  const { location } = req.body;
  if (!location) return res.status(400).json({ error: 'Location name required' });
  const locs = getLocations();
  const slug = location.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (locs.includes(slug)) return res.status(409).json({ error: 'Location already exists' });
  locs.push(slug);
  writeJSON(path.join(CONTENT_DIR, 'locations.json'), locs);
  res.json({ ok: true, locations: locs });
});

app.delete('/api/locations/:slug', requireAuth, (req, res) => {
  let locs = getLocations();
  locs = locs.filter(l => l !== req.params.slug);
  writeJSON(path.join(CONTENT_DIR, 'locations.json'), locs);
  res.json({ ok: true, locations: locs });
});

// ---------------------------------------------------------------------------
// Schemas / Pages API
// ---------------------------------------------------------------------------
app.get('/api/pages', (_req, res) => {
  const schemasDir = path.join(CONTENT_DIR, 'schemas');
  const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));
  const pages = files.map(f => {
    const schema = readJSON(path.join(schemasDir, f));
    return { id: f.replace('.json', ''), ...schema };
  });
  res.json(pages);
});

app.get('/api/schemas/:page', (req, res) => {
  const file = path.join(CONTENT_DIR, 'schemas', `${req.params.page}.json`);
  const schema = readJSON(file);
  if (!schema) return res.status(404).json({ error: 'Schema not found' });
  res.json(schema);
});

// ---------------------------------------------------------------------------
// Content API (with staging / production + scheduling + location filtering)
// ---------------------------------------------------------------------------
app.get('/api/content/:page', optionalAuth, (req, res) => {
  let env;
  if (req.query.env === 'staging') env = 'staging';
  else if (req.query.env === 'production') env = 'production';
  else env = publicContentEnvDefault;
  const loc = req.query.loc || null;
  const raw = req.query.raw === 'true';
  const file = path.join(CONTENT_DIR, env, `${req.params.page}.json`);
  let content = readJSON(file);
  if (!content) return res.status(404).json({ error: 'Content not found' });

  // Raw mode returns unprocessed content (used by admin editor)
  if (raw) return res.json(content);

  // Load pricing to resolve price references
  const pricing = readJSON(path.join(CONTENT_DIR, 'pricing.json'), {});

  // Process content: filter scheduled items, resolve locations & pricing
  content = processContent(content, loc, pricing);
  res.json(content);
});

app.put('/api/content/:page', requireAuth, (req, res) => {
  const file = path.join(CONTENT_DIR, 'staging', `${req.params.page}.json`);
  writeJSON(file, req.body);
  res.json({ ok: true, env: 'staging' });
});

app.post('/api/publish/:page', requireAuth, (req, res) => {
  if (!savePublishesLocally) {
    return res.status(400).json({
      error: 'Local publish is disabled in this environment. Use Publish to Production (staging sync) or run a development server.'
    });
  }
  const stagingFile = path.join(CONTENT_DIR, 'staging', `${req.params.page}.json`);
  const prodFile = path.join(CONTENT_DIR, 'production', `${req.params.page}.json`);
  const backupFile = path.join(CONTENT_DIR, 'production', `${req.params.page}.backup.json`);

  const staging = readJSON(stagingFile);
  if (!staging) return res.status(404).json({ error: 'No staging content to publish' });

  // Back up current production
  const currentProd = readJSON(prodFile);
  if (currentProd) writeJSON(backupFile, currentProd);

  writeJSON(prodFile, staging);
  res.json({ ok: true, message: 'Published to production' });
});

app.post('/api/revert/:page', requireAuth, (req, res) => {
  const prodFile = path.join(CONTENT_DIR, 'production', `${req.params.page}.json`);
  const stagingFile = path.join(CONTENT_DIR, 'staging', `${req.params.page}.json`);
  const backupFile = path.join(CONTENT_DIR, 'production', `${req.params.page}.backup.json`);

  const backup = readJSON(backupFile);
  if (!backup) return res.status(404).json({ error: 'No backup to revert to' });

  writeJSON(prodFile, backup);
  writeJSON(stagingFile, backup);
  res.json({ ok: true, message: 'Reverted to previous version' });
});

app.get('/api/status/:page', requireAuth, (req, res) => {
  const stagingFile = path.join(CONTENT_DIR, 'staging', `${req.params.page}.json`);
  const prodFile = path.join(CONTENT_DIR, 'production', `${req.params.page}.json`);

  const staging = readJSON(stagingFile);
  const production = readJSON(prodFile);
  const hasBackup = fs.existsSync(path.join(CONTENT_DIR, 'production', `${req.params.page}.backup.json`));

  let hasUnpublished = false;
  if (staging && production) {
    hasUnpublished = JSON.stringify(staging) !== JSON.stringify(production);
  } else if (staging && !production) {
    hasUnpublished = true;
  }

  res.json({ hasUnpublished, hasBackup, hasStaging: !!staging, hasProduction: !!production });
});

function requireSyncSecret(req, res, next) {
  const h = req.headers['x-sync-secret'];
  if (!SYNC_SECRET || h !== SYNC_SECRET) {
    return res.status(401).json({ error: 'Invalid or missing sync secret' });
  }
  next();
}

const allowSyncReceive = isProduction || process.env.ALLOW_SYNC_RECEIVE === 'true';

// ---------------------------------------------------------------------------
// Content sync (staging -> production over HTTPS)
// ---------------------------------------------------------------------------
app.post('/api/sync/to-production', requireAuth, async (req, res) => {
  if (!isStaging || !PRODUCTION_URL || !SYNC_SECRET) {
    return res.status(403).json({ error: 'Sync to production is not configured for this server' });
  }
  const { pages } = req.body || {};
  const ids = pages === 'all' ? getSchemaPageIds() : (Array.isArray(pages) ? pages : []);
  if (!ids.length) return res.status(400).json({ error: 'Provide pages: ["home", ...] or "all"' });

  const bundle = { pages: {} };
  for (const id of ids) {
    const stagingFile = path.join(CONTENT_DIR, 'staging', `${id}.json`);
    const data = readJSON(stagingFile);
    if (data) bundle.pages[id] = data;
  }
  if (!Object.keys(bundle.pages).length) {
    return res.status(400).json({ error: 'No staging content found for requested pages' });
  }

  bundle.pricing = readJSON(path.join(CONTENT_DIR, 'pricing.json'), {});
  bundle.banners = readJSON(path.join(CONTENT_DIR, 'banners.json'), []);
  bundle.locations = readJSON(path.join(CONTENT_DIR, 'locations.json'), ['houston', 'dallas']);
  bundle.forms = readFormsMap();

  const meta = {
    from: SITE_URL || PRODUCTION_URL,
    by: req.user.username,
    at: new Date().toISOString()
  };

  try {
    const url = `${PRODUCTION_URL}/api/sync/receive`;
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Sync-Secret': SYNC_SECRET
      },
      body: JSON.stringify({ bundle, meta })
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) return res.status(r.status).json(body);

    for (const id of Object.keys(bundle.pages)) {
      const s = readJSON(path.join(CONTENT_DIR, 'staging', `${id}.json`));
      if (s) writeJSON(path.join(CONTENT_DIR, 'production', `${id}.json`), s);
    }
    writeJSON(path.join(CONTENT_DIR, 'sync-meta.json'), {
      lastRemoteSyncAt: meta.at,
      lastRemoteSyncBy: meta.by,
      lastRemoteSyncTarget: PRODUCTION_URL,
      syncedPages: Object.keys(bundle.pages)
    });

    res.json({ ok: true, ...body });
  } catch (e) {
    res.status(502).json({ error: 'Sync request failed', detail: String(e.message) });
  }
});

app.post('/api/sync/receive', requireSyncSecret, (req, res) => {
  if (!allowSyncReceive) {
    return res.status(403).json({ error: 'Sync receive is only enabled on production (set ALLOW_SYNC_RECEIVE=true to test locally)' });
  }
  const { bundle, meta } = req.body || {};
  if (!bundle || !bundle.pages || typeof bundle.pages !== 'object') {
    return res.status(400).json({ error: 'Invalid bundle' });
  }

  const backupRoot = path.join(CONTENT_DIR, 'backups');
  if (!fs.existsSync(backupRoot)) fs.mkdirSync(backupRoot, { recursive: true });
  const backupDir = path.join(backupRoot, `sync-${Date.now()}`);
  fs.mkdirSync(backupDir, { recursive: true });

  const synced = [];

  for (const [pageId, content] of Object.entries(bundle.pages)) {
    const prodFile = path.join(CONTENT_DIR, 'production', `${pageId}.json`);
    const current = readJSON(prodFile);
    if (current) writeJSON(path.join(backupDir, `${pageId}.json`), current);
    writeJSON(prodFile, content);
    synced.push(pageId);
  }

  if (bundle.pricing && typeof bundle.pricing === 'object') {
    const pf = path.join(CONTENT_DIR, 'pricing.json');
    writeJSON(path.join(backupDir, 'pricing.json'), readJSON(pf, {}));
    writeJSON(pf, bundle.pricing);
  }
  if (bundle.banners) {
    const bf = path.join(CONTENT_DIR, 'banners.json');
    writeJSON(path.join(backupDir, 'banners.json'), readJSON(bf, []));
    writeJSON(bf, bundle.banners);
  }
  if (bundle.locations) {
    const lf = path.join(CONTENT_DIR, 'locations.json');
    writeJSON(path.join(backupDir, 'locations.json'), readJSON(lf, []));
    writeJSON(lf, bundle.locations);
  }
  if (bundle.forms && typeof bundle.forms === 'object') {
    const formsDir = path.join(CONTENT_DIR, 'forms');
    if (!fs.existsSync(formsDir)) fs.mkdirSync(formsDir, { recursive: true });
    for (const [fid, formDef] of Object.entries(bundle.forms)) {
      if (!formDef) continue;
      const fp = path.join(formsDir, `${fid}.json`);
      const cur = readJSON(fp);
      if (cur) writeJSON(path.join(backupDir, `form-${fid}.json`), cur);
      writeJSON(fp, formDef);
    }
  }

  const syncLog = {
    lastSyncAt: meta && meta.at ? meta.at : new Date().toISOString(),
    lastSyncBy: meta && meta.by ? meta.by : 'unknown',
    lastSyncFrom: meta && meta.from ? meta.from : ''
  };
  writeJSON(path.join(CONTENT_DIR, 'sync-meta.json'), syncLog);

  res.json({ ok: true, synced, meta: syncLog });
});

app.get('/api/sync/status', requireAuth, (_req, res) => {
  const ids = getSchemaPageIds();
  const pendingPages = [];
  for (const id of ids) {
    const s = readJSON(path.join(CONTENT_DIR, 'staging', `${id}.json`));
    const p = readJSON(path.join(CONTENT_DIR, 'production', `${id}.json`));
    if (JSON.stringify(s) !== JSON.stringify(p)) pendingPages.push(id);
  }

  const pricingStaging = readJSON(path.join(CONTENT_DIR, 'pricing.json'), {});
  const globalsNote = 'Pricing, banners, and forms use shared files; compare staging vs production volumes per environment.';

  res.json({
    pendingPages,
    lastSync: readJSON(path.join(CONTENT_DIR, 'sync-meta.json'), null),
    globalsNote
  });
});

// ---------------------------------------------------------------------------
// Content processing (scheduling, location, pricing)
// ---------------------------------------------------------------------------
function processContent(content, location, pricing) {
  if (!content || typeof content !== 'object') return content;

  if (Array.isArray(content)) {
    return content
      .filter(item => isScheduleActive(item))
      .filter(item => matchesLocation(item, location))
      .map(item => resolveItem(item, location, pricing));
  }

  const result = {};
  for (const [key, value] of Object.entries(content)) {
    if (Array.isArray(value)) {
      result[key] = value
        .filter(item => isScheduleActive(item))
        .filter(item => matchesLocation(item, location))
        .map(item => resolveItem(item, location, pricing));
    } else if (typeof value === 'object' && value !== null) {
      result[key] = resolveItem(value, location, pricing);
    } else {
      result[key] = resolvePriceRef(value, pricing, location);
    }
  }
  return result;
}

function isScheduleActive(item) {
  if (!item || typeof item !== 'object') return true;
  if (item.active === false) return false;

  const now = new Date();
  if (item.startDate && new Date(item.startDate) > now) return false;
  if (item.endDate && new Date(item.endDate) < now) return false;

  if (item.recurringDays && Array.isArray(item.recurringDays)) {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = dayNames[now.getDay()];
    if (!item.recurringDays.includes(today)) return false;
  }

  return true;
}

function matchesLocation(item, location) {
  if (!location || !item || typeof item !== 'object') return true;
  if (!item.locations) return true;
  if (Array.isArray(item.locations) && item.locations.length > 0) {
    return item.locations.includes(location);
  }
  return true;
}

function resolveItem(item, location, pricing) {
  if (!item || typeof item !== 'object') return item;
  const result = {};
  for (const [key, value] of Object.entries(item)) {
    if (key === 'startDate' || key === 'endDate' || key === 'recurringDays' || key === 'active' || key === 'locations') {
      continue; // Strip scheduling/location metadata from output
    }
    if (typeof value === 'object' && value !== null && value._perLocation && location) {
      result[key] = value[location] || value._default || value[Object.keys(value).find(k => k !== '_perLocation' && k !== '_default')] || '';
    } else if (typeof value === 'string') {
      result[key] = resolvePriceRef(value, pricing, location);
    } else if (Array.isArray(value)) {
      result[key] = value
        .filter(v => isScheduleActive(v))
        .filter(v => matchesLocation(v, location))
        .map(v => resolveItem(v, location, pricing));
    } else if (typeof value === 'object' && value !== null) {
      result[key] = resolveItem(value, location, pricing);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function resolvePriceRef(value, pricing, location) {
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{price:([^}]+)\}\}/g, (_match, key) => {
    const locKey = location ? `${key}.${location}` : null;
    if (locKey && pricing[locKey]) return pricing[locKey];
    return pricing[key] || `{{price:${key}}}`;
  });
}

// ---------------------------------------------------------------------------
// Pricing API
// ---------------------------------------------------------------------------
app.get('/api/pricing', (_req, res) => {
  const pricing = readJSON(path.join(CONTENT_DIR, 'pricing.json'), {});
  res.json(pricing);
});

app.put('/api/pricing', requireAuth, (req, res) => {
  writeJSON(path.join(CONTENT_DIR, 'pricing.json'), req.body);
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// Banners API
// ---------------------------------------------------------------------------
function getActiveBanners(location) {
  const banners = readJSON(path.join(CONTENT_DIR, 'banners.json'), []);
  const now = new Date();
  return banners
    .filter(b => {
      if (b.active === false) return false;
      if (b.startDate && new Date(b.startDate) > now) return false;
      if (b.endDate && new Date(b.endDate) < now) return false;
      if (location && b.locations && b.locations.length > 0 && !b.locations.includes(location)) return false;
      return true;
    })
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

app.get('/api/banners', (req, res) => {
  res.json(getActiveBanners(req.query.loc || null));
});

app.get('/api/banners/all', requireAuth, (_req, res) => {
  const banners = readJSON(path.join(CONTENT_DIR, 'banners.json'), []);
  res.json(banners);
});

app.put('/api/banners', requireAuth, (req, res) => {
  writeJSON(path.join(CONTENT_DIR, 'banners.json'), req.body);
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// Forms API
// ---------------------------------------------------------------------------
app.get('/api/forms', (_req, res) => {
  const formsDir = path.join(CONTENT_DIR, 'forms');
  const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.json'));
  const forms = files.map(f => readJSON(path.join(formsDir, f)));
  res.json(forms);
});

app.get('/api/forms/:formId', (req, res) => {
  const file = path.join(CONTENT_DIR, 'forms', `${req.params.formId}.json`);
  const form = readJSON(file);
  if (!form) return res.status(404).json({ error: 'Form not found' });
  res.json(form);
});

app.put('/api/forms/:formId', requireAuth, (req, res) => {
  const file = path.join(CONTENT_DIR, 'forms', `${req.params.formId}.json`);
  writeJSON(file, req.body);
  res.json({ ok: true });
});

app.post('/api/forms/:formId/submit', async (req, res) => {
  const formFile = path.join(CONTENT_DIR, 'forms', `${req.params.formId}.json`);
  const formDef = readJSON(formFile);
  if (!formDef) return res.status(404).json({ error: 'Form not found' });

  // Validate required fields
  const errors = [];
  for (const field of formDef.fields || []) {
    if (field.required && (!req.body[field.name] || String(req.body[field.name]).trim() === '')) {
      errors.push(`${field.label || field.name} is required`);
    }
  }
  if (errors.length > 0) return res.status(400).json({ errors });

  const submission = {
    id: crypto.randomUUID(),
    formId: req.params.formId,
    data: req.body,
    submittedAt: new Date().toISOString(),
    ip: req.ip
  };

  const subsDir = path.join(CONTENT_DIR, 'form-submissions');
  const subsFile = path.join(subsDir, `${req.params.formId}.json`);
  const existing = readJSON(subsFile, []);
  existing.push(submission);
  writeJSON(subsFile, existing);

  res.json({ ok: true, message: formDef.successMessage || 'Form submitted successfully' });
});

app.get('/api/forms/:formId/submissions', requireAuth, (req, res) => {
  const file = path.join(CONTENT_DIR, 'form-submissions', `${req.params.formId}.json`);
  const subs = readJSON(file, []);
  res.json(subs);
});

app.delete('/api/forms/:formId/submissions/:subId', requireAuth, (req, res) => {
  const file = path.join(CONTENT_DIR, 'form-submissions', `${req.params.formId}.json`);
  let subs = readJSON(file, []);
  subs = subs.filter(s => s.id !== req.params.subId);
  writeJSON(file, subs);
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// Media API
// ---------------------------------------------------------------------------
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    cb(null, allowed.includes(file.mimetype));
  }
});

app.post('/api/upload', requireAuth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file provided' });

  const id = crypto.randomUUID().slice(0, 8);
  const ext = req.file.originalname.split('.').pop().toLowerCase();
  const baseName = `${id}.${ext}`;
  const uploadsDir = path.join(CONTENT_DIR, 'uploads');

  if (req.file.mimetype === 'image/svg+xml') {
    fs.writeFileSync(path.join(uploadsDir, baseName), req.file.buffer);
    return res.json({
      original: `/uploads/${baseName}`,
      thumb: `/uploads/${baseName}`,
      medium: `/uploads/${baseName}`,
      filename: req.file.originalname
    });
  }

  const image = sharp(req.file.buffer);
  const meta = await image.metadata();

  // Save original (optimized)
  await sharp(req.file.buffer)
    .resize({ width: Math.min(meta.width, 1920), withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(path.join(uploadsDir, `${id}-full.jpg`));

  // Medium
  await sharp(req.file.buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toFile(path.join(uploadsDir, `${id}-medium.jpg`));

  // Thumbnail
  await sharp(req.file.buffer)
    .resize({ width: 300, height: 300, fit: 'cover' })
    .jpeg({ quality: 70 })
    .toFile(path.join(uploadsDir, `${id}-thumb.jpg`));

  res.json({
    original: `/uploads/${id}-full.jpg`,
    medium: `/uploads/${id}-medium.jpg`,
    thumb: `/uploads/${id}-thumb.jpg`,
    filename: req.file.originalname,
    width: meta.width,
    height: meta.height
  });
});

app.get('/api/media', requireAuth, (_req, res) => {
  const uploadsDir = path.join(CONTENT_DIR, 'uploads');
  if (!fs.existsSync(uploadsDir)) return res.json([]);
  const files = fs.readdirSync(uploadsDir)
    .filter(f => f.includes('-full.') || (f.includes('.svg')))
    .map(f => {
      const id = f.replace(/-full\.\w+$/, '').replace(/\.\w+$/, '');
      const stat = fs.statSync(path.join(uploadsDir, f));
      return {
        id,
        original: `/uploads/${f}`,
        medium: f.endsWith('.svg') ? `/uploads/${f}` : `/uploads/${id}-medium.jpg`,
        thumb: f.endsWith('.svg') ? `/uploads/${f}` : `/uploads/${id}-thumb.jpg`,
        uploadedAt: stat.mtime.toISOString(),
        size: stat.size
      };
    })
    .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  res.json(files);
});

app.delete('/api/media/:id', requireAuth, (req, res) => {
  const uploadsDir = path.join(CONTENT_DIR, 'uploads');
  const files = fs.readdirSync(uploadsDir).filter(f => f.startsWith(req.params.id));
  files.forEach(f => fs.unlinkSync(path.join(uploadsDir, f)));
  res.json({ ok: true, deleted: files.length });
});

// ---------------------------------------------------------------------------
// SEO API
// ---------------------------------------------------------------------------
app.get('/api/seo/:page', (req, res) => {
  const file = path.join(CONTENT_DIR, 'production', `${req.params.page}.json`);
  const content = readJSON(file);
  if (!content || !content._seo) return res.json({});
  res.json(content._seo);
});

// ---------------------------------------------------------------------------
// Static file serving
// ---------------------------------------------------------------------------
const PAGES_ROOT = path.join(__dirname, 'pages');

app.use('/uploads', express.static(path.join(CONTENT_DIR, 'uploads')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Serve CMS hydration script at a known path
app.use('/cms', express.static(path.join(__dirname, 'site')));

// Serve pages and their shared assets
app.use(express.static(PAGES_ROOT));

// Also serve the replica's navbar-assets/ and page folders (for images referenced in HTML)
const REPLICA_ROOT = path.join(__dirname, 'replica');
app.use('/navbar-assets', express.static(path.join(REPLICA_ROOT, 'navbar-assets')));
app.use(express.static(REPLICA_ROOT));

// Legacy slug → Father's Day page
app.get('/spring-bundles', (_req, res) => res.redirect(301, '/fathers-day'));
app.get('/spring-bundles/', (_req, res) => res.redirect(301, '/fathers-day'));

// Page routes: /page-name -> pages/page-name.html
getSchemaPageIds().forEach(key => {
  app.get(`/${key}`, (_req, res) => {
    const file = path.join(PAGES_ROOT, `${key}.html`);
    if (fs.existsSync(file)) {
      sendHtmlWithDeployMeta(res, file);
    } else {
      res.status(404).send(`Page "${key}" not built yet.`);
    }
  });
});

// Root serves the home page
app.get('/', (_req, res) => {
  const home = path.join(PAGES_ROOT, 'home.html');
  if (fs.existsSync(home)) {
    sendHtmlWithDeployMeta(res, home);
  } else {
    res.send('<h1>Velocity CMS</h1><p>Pages not yet built. Visit <a href="/admin">/admin</a> to manage content.</p>');
  }
});

// Admin SPA fallback
app.get('/admin/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n  Velocity CMS running:`);
  console.log(`  Site:    http://localhost:${PORT}`);
  console.log(`  Admin:   http://localhost:${PORT}/admin`);
  console.log(`  Staging: http://localhost:${PORT}/?env=staging\n`);

  // Check if any users exist
  const users = getUsers();
  if (users.length === 0) {
    console.log('  No users found. Create one with:');
    console.log('  npm run add-user -- <username> <password>\n');
  }
});
