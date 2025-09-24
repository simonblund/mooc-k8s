import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
const app = new Hono();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.use("*", serveStatic({ root: "./static" }));
serve({
    fetch: app.fetch,
    port: port,
}, (info) => {
    console.log(`Server started on port ${port}`);
});
