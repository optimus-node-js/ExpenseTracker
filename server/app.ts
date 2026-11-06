import 'dotenv/config';
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import type { Server } from "http";
import { registerRoutes } from "./routes";
import { connectToMongoDB } from "./db/mongodb";

/**
 * Builds the Express app (API only). Used by the local server (server/index.ts)
 * and by the Vercel serverless function (api/index.ts).
 */
export async function createApp(): Promise<{ app: Express; server: Server }> {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

  app.set('trust proxy', 1);
  app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: false }));

  await connectToMongoDB();

  // Sessions live in MongoDB so they survive across serverless invocations and restarts.
  const mongoUrl = process.env.MONGODB_URI;
  app.use(
    session({
      genid: () => uuidv4(),
      secret: process.env.SESSION_SECRET || 'dev-only-secret-change-me',
      resave: false,
      saveUninitialized: false,
      store: mongoUrl ? MongoStore.create({ mongoUrl, collectionName: 'sessions', ttl: 7 * 24 * 60 * 60 }) : undefined,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: isProd,
        sameSite: 'lax',
        httpOnly: true,
      },
    })
  );

  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      if (req.path.startsWith("/api")) console.log(`${req.method} ${req.path} ${res.statusCode} in ${Date.now() - start}ms`);
    });
    next();
  });

  const server = await registerRoutes(app);

  app.use('/api/*', (req, res) => {
    res.status(404).json({ message: `API endpoint not found: ${req.originalUrl}` });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  return { app, server };
}
