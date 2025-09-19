/**
 * Express entrypoint.
 * - Wires up routes and logging.
 * - Exposes default-exported `app` so Jest can import without starting the server.
 * - Starts the HTTP server on port 8080 in non-test environments.
 */
import express from "express";
import morgan from "morgan";
import routes from "./routes.js";
import { initKeys } from "./keys.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "test" ? "tiny" : "dev"));
app.use(routes);

// 405 if wrong HTTP method
app.all("/auth", (req, res) =>
  req.method === "POST" ? res.end() : res.status(405).end()
);
app.all("/.well-known/jwks.json", (req, res) =>
  req.method === "GET" ? res.end() : res.status(405).end()
);

// wait for keys before start
await initKeys();

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log(`JWKS server running at http://localhost:${PORT}`)
  );
}

export default app;
