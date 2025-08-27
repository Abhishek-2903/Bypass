//server.js
const path = require('path');
const { createServer } = require('http');
const next = require('next');

process.on('uncaughtException', (e) => console.error('[uncaughtException]', e));
process.on('unhandledRejection', (e) => console.error('[unhandledRejection]', e));

const port = process.env.PORT || 3000;
const dev = false; // packaged/desktop use

// In pkg/nexe this points to exe folder; in Electron we set cwd to app dir
const baseDir = process.cwd();
console.log('[boot] baseDir =', baseDir);

const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = createServer((req, res) => handle(req, res));

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Is the app already running?`);
        process.exit(1);
      } else {
        console.error('[Server error]', err);
        process.exit(1);
      }
    });

    server.listen(port, () => {
      console.log(`> Sci-Fi Simulator ready at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error('Next prepare failed:', e);
    process.exit(1);
  });
