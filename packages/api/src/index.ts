import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for embed widgets on external sites
app.use("*", cors({
  origin: "*", // Will be restricted to site domains in production
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
}));

app.get("/health", (c) => {
  return c.json({ status: "ok", service: "nyuzi-api", timestamp: new Date().toISOString() });
});

// Phase 1 endpoints will attach here
export default app;
