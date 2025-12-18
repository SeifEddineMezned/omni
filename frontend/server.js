import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Render will provide PORT
const PORT = process.env.PORT || 3000;

// Your backend URL (Render service URL)
const BACKEND_URL = process.env.BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("BACKEND_URL env var is required (e.g. https://omnibackend-0oc7.onrender.com)");
}

/**
 * Proxy everything under /api -> backend /api
 * - changeOrigin helps with host header
 * - cookieDomainRewrite makes cookies belong to the frontend domain
 */
app.use(
  "/api",
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    secure: true,
    xfwd: true,
    cookieDomainRewrite: "", // make cookie domain = current host
  })
);

// Serve CRA build
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend server running on port ${PORT}`);
});
