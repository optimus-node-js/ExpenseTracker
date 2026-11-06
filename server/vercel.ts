import type { IncomingMessage, ServerResponse } from "http";
import { createApp } from "./app";

// Bundled by esbuild into dist/server/vercel.mjs and served through api/index.mjs.
let appPromise: ReturnType<typeof createApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!appPromise) appPromise = createApp().catch((err) => { appPromise = null; throw err; });
  const { app } = await appPromise;
  return app(req as any, res as any);
}
