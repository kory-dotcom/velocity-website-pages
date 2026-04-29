/**
 * Central deployment configuration (DEPLOY_ENV-aware).
 * See README.md for environment variable reference.
 */
require('dotenv').config();
const path = require('path');

/** Use DEPLOY_ENV explicitly: `development` | `staging` | `production` (do not rely on NODE_ENV alone). */
const deployEnv = process.env.DEPLOY_ENV || 'development';

const CONTENT_DIR = process.env.CONTENT_DIR
  ? path.resolve(process.env.CONTENT_DIR)
  : path.join(__dirname, 'content');

const SITE_URL = process.env.SITE_URL || '';
const PRODUCTION_URL = (process.env.PRODUCTION_URL || '').replace(/\/$/, '');
const SYNC_SECRET = process.env.SYNC_SECRET || '';
const STAGING_PASSWORD = process.env.STAGING_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const PORT = parseInt(process.env.PORT || '3000', 10);

const isDevelopment = deployEnv === 'development';
const isStaging = deployEnv === 'staging';
const isProduction = deployEnv === 'production';

/** Public site + API should default to staging content when running the staging stack */
const publicContentEnvDefault = isStaging ? 'staging' : 'production';

/** Save in admin: local dev publishes to local production folder; staging/prod stacks use staging-only save + optional remote sync */
const savePublishesLocally = isDevelopment;

/** Show remote "Publish to Production" (staging → prod sync) */
const showPublishToProduction =
  isStaging && Boolean(PRODUCTION_URL && SYNC_SECRET);

/** Staging banner on public pages */
const showStagingBanner = isStaging;

/** Enforce HTTPS for public deploys (staging + production) */
const enforceHttps = isStaging || isProduction;

module.exports = {
  deployEnv,
  CONTENT_DIR,
  SITE_URL,
  PRODUCTION_URL,
  SYNC_SECRET,
  STAGING_PASSWORD,
  JWT_SECRET,
  PORT,
  isDevelopment,
  isStaging,
  isProduction,
  publicContentEnvDefault,
  savePublishesLocally,
  showPublishToProduction,
  showStagingBanner,
  enforceHttps
};
