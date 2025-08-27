/* eslint-disable no-console */
/** @type {import('next').NextConfig} */

const path = require('path');

// ---- 1) Safe defaults if ./config is missing ----
let WS_CONFIG = {
  BASE_URL: 'ws://localhost',
  HTTP_BASE_URL: 'http://localhost',
  RTM_PORTS: { SOLDIER_DATA: 8001, KILL_FEED: 8002, STATS: 8003 },
  AAR_PORTS: { SOLDIER_DATA: 8765, KILL_FEED: 8766, STATS: 8767 },
  API_PORTS: { REPLAY_INIT: 8000 }
};
try {
  const maybe = require('./config');
  if (maybe && maybe.WS_CONFIG) WS_CONFIG = { ...WS_CONFIG, ...maybe.WS_CONFIG };
} catch (_) {
  // no local config file; using defaults above
}

// ---- 2) Derived endpoints (no .env needed) ----
const isProd = process.env.NODE_ENV === 'production';

// Where the Next server itself will be reachable (Electron/pkg will hit this)
// In dev it's usually http://localhost:3000; adjust if you run on a different port.
const NEXT_SERVER_ORIGIN = process.env.NEXT_SERVER_ORIGIN || 'http://localhost:3000';

// Explicit WS endpoints (for CSP/connect-src)
const WS_URLS = [
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.RTM_PORTS.SOLDIER_DATA}/ws`.replace('http://', ''),
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.RTM_PORTS.KILL_FEED}/ws`.replace('http://', ''),
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.RTM_PORTS.STATS}/ws`.replace('http://', ''),
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.AAR_PORTS.SOLDIER_DATA}/ws`.replace('http://', ''),
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.AAR_PORTS.KILL_FEED}/ws`.replace('http://', ''),
  `ws://${WS_CONFIG.HTTP_BASE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')}:${WS_CONFIG.AAR_PORTS.STATS}/ws`.replace('http://', '')
];

// Also allow the literal IPs you're already using:
const STATIC_WS_URLS = [
  'ws://localhost:8001/ws',
  'ws://localhost:8002/ws',
  'ws://localhost:8003/ws',
  'ws://localhost:8765/ws',
  'ws://localhost:8766/ws',
  'ws://localhost:8767/ws'
];

// HTTP backends to permit in CSP (APIs)
const HTTP_API_URLS = [
  `${WS_CONFIG.HTTP_BASE_URL.replace(/\/$/, '')}:8000`,
  'http://localhost:8000',
  'http://localhost:8000',
  'http://localhost:8001'
];

// Log everything at build time (handy for CI and packaging)
console.log('Real-Time Monitoring WebSocket URLs:', {
  soldier: STATIC_WS_URLS[0],
  killFeed: STATIC_WS_URLS[1],
  stats: STATIC_WS_URLS[2],
});
console.log('After Action Review WebSocket URLs:', {
  soldier: STATIC_WS_URLS[3],
  killFeed: STATIC_WS_URLS[4],
  stats: STATIC_WS_URLS[5],
});
console.log('HTTP API URLs:', { replayInit: `${WS_CONFIG.HTTP_BASE_URL.replace(/\/$/, '')}:${WS_CONFIG.API_PORTS.REPLAY_INIT}/initialize-replay` });
console.log('All WebSocket URLs for CSP:', [...new Set([...WS_URLS, ...STATIC_WS_URLS])]);

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // REMOVED: output: 'standalone' - this was causing the issue
  // For Electron, we want the regular Next.js build

  // Skip blocking lint in CI/packaging
  eslint: { ignoreDuringBuilds: true },

  // If you fetch external images/tiles, add domains here
  images: {
    remotePatterns: [
      // { protocol: 'https', hostname: 'your-tile-server.example.com' }
    ]
  },

  async rewrites() {
    // Keep your two proxy routes
    return [
      { source: '/api/:path*',    destination: 'http://localhost:8000/api/:path*' },
      { source: '/aar-api/:path*', destination: 'http://localhost:8001/api/:path*' },
    ];
  },

  webpack: (config, { isServer }) => {
    // Keep WASM for sql.js; keep layers for Next 15
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Helpful for packaging: ensure __dirname resolves inside pkg/electron
    config.plugins = config.plugins || [];
    config.node = config.node || {};
    // No polyfills added; keep bundle lean.

    return config;
  },

  async headers() {
    const wsList = [...new Set([...WS_URLS, ...STATIC_WS_URLS])].join(' ');
    const httpList = [...new Set(HTTP_API_URLS)].join(' ');

    // NOTE: Electron needs 'unsafe-eval' sometimes due to Chromium/Next internals.
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: ${NEXT_SERVER_ORIGIN};
      font-src 'self' data:;
      connect-src 'self' ${NEXT_SERVER_ORIGIN} ${wsList} ${httpList} ws: wss: data: blob:;
      worker-src 'self' blob:;
      media-src 'self' data: blob:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ],
      },
    ];
  },

  // Expose config to both server and client without .env
  env: {
    // server-side usage
    WS_BASE_URL: WS_CONFIG.BASE_URL,
    HTTP_BASE_URL: WS_CONFIG.HTTP_BASE_URL,
    RTM_SOLDIER_PORT: String(WS_CONFIG.RTM_PORTS.SOLDIER_DATA),
    RTM_KILL_FEED_PORT: String(WS_CONFIG.RTM_PORTS.KILL_FEED),
    RTM_STATS_PORT: String(WS_CONFIG.RTM_PORTS.STATS),
    AAR_SOLDIER_PORT: String(WS_CONFIG.AAR_PORTS.SOLDIER_DATA),
    AAR_KILL_FEED_PORT: String(WS_CONFIG.AAR_PORTS.KILL_FEED),
    AAR_STATS_PORT: String(WS_CONFIG.AAR_PORTS.STATS),
    REPLAY_INIT_PORT: String(WS_CONFIG.API_PORTS.REPLAY_INIT),

    // client-side friendly (NEXT_PUBLIC_*) — optional but handy
    NEXT_PUBLIC_WS_BASE_URL: WS_CONFIG.BASE_URL,
    NEXT_PUBLIC_HTTP_BASE_URL: WS_CONFIG.HTTP_BASE_URL,
    NEXT_PUBLIC_RTM_SOLDIER_PORT: String(WS_CONFIG.RTM_PORTS.SOLDIER_DATA),
    NEXT_PUBLIC_RTM_KILL_FEED_PORT: String(WS_CONFIG.RTM_PORTS.KILL_FEED),
    NEXT_PUBLIC_RTM_STATS_PORT: String(WS_CONFIG.RTM_PORTS.STATS),
    NEXT_PUBLIC_AAR_SOLDIER_PORT: String(WS_CONFIG.AAR_PORTS.SOLDIER_DATA),
    NEXT_PUBLIC_AAR_KILL_FEED_PORT: String(WS_CONFIG.AAR_PORTS.KILL_FEED),
    NEXT_PUBLIC_AAR_STATS_PORT: String(WS_CONFIG.AAR_PORTS.STATS),
    NEXT_PUBLIC_REPLAY_INIT_PORT: String(WS_CONFIG.API_PORTS.REPLAY_INIT),

    NEXT_SERVER_ORIGIN // used by CSP
  },
};

module.exports = nextConfig;