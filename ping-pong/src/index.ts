import { serve } from "@hono/node-server";
import { fork } from "child_process";
import { Hono } from "hono";

let poncCount = 0;

const app = new Hono();

app.get("/pingpong", (c) => {
  return c.text("pong " + poncCount++);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
