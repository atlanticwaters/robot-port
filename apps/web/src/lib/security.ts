export const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' https://plausible.io https://cdn.usefathom.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.prismic.io; connect-src 'self' https://plausible.io; font-src 'self' data:; frame-ancestors 'none';",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};
