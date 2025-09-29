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
let count = 0;

app.get("/pingpong", (c) => {
  const existing = String(count);
  count++;
  return c.text("pong " + existing);
});
app.get("/pings", (c) => {
  return c.text(String(count));
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
