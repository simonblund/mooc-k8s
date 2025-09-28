import { serve } from "@hono/node-server";
import { fork } from "child_process";
import { existsSync, readFileSync, write, writeFileSync } from "fs";
import { Hono } from "hono";

let poncCount = 0;

const app = new Hono();

function pingpong() {
  if (!existsSync("./data/pingpong.txt")) {
    writeFileSync("./data/pingpong.txt", "0", "utf-8");
  }
  const existing = readFileSync("./data/pingpong.txt", "utf-8");
  const newValue = Number(existing) + 1;
  writeFileSync("./data/pingpong.txt", String(newValue), "utf-8");
  return existing;
}

app.get("/pingpong", (c) => {
  return c.text("pong " + pingpong());
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
