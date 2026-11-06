import express from "express";
import { createApp } from "./app";
import { setupVite, log } from "./vite";

// Local / long-running server. On Vercel the API runs through api/index.ts instead.
(async () => {
  const { app, server } = await createApp();

  if (process.env.NODE_ENV !== 'production') {
    await setupVite(app, server);
    log('Vite middleware initialized in development mode');
  } else {
    app.use(express.static('dist/public'));
    app.get('*', (_req, res) => res.sendFile('index.html', { root: 'dist/public' }));
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}`))
    .on('error', (error: Error) => {
      console.log('Failed to start server:', error.message);
      process.exit(1);
    });
})();
