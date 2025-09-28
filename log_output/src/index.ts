import { serve } from "@hono/node-server";
import { fork } from "child_process";
import { Hono } from "hono";

const randomString = crypto.randomUUID();

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Start logger child process
const loggerProcess = fork(
  new URL("./logger.js", import.meta.url),
  [randomString],
  {
    stdio: "inherit",
  }
);

const app = new Hono();

app.get("/", (c) => {
  return c.text(new Date().toISOString() + " : " + randomString);
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

// Optional: handle exit
process.on("SIGINT", () => {
  loggerProcess.kill();
  process.exit();
});
