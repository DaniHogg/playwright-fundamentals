const SITE_BASE_PATH = (process.env.SITE_BASE_PATH || '').replace(/\/+$/, '');

function toSitePath(pathname = '/') {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_BASE_PATH}${path}`;
}

module.exports = { toSitePath };
