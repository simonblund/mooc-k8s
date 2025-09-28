import { serve } from "@hono/node-server";
import { read, readFileSync } from "fs";
import { Hono } from "hono";

const app = new Hono();

app.get("*", (c) => {
  const fileContents = readFileSync("./data/log.txt", "utf-8");
  const lines = fileContents.trim().split("\n");
  const lastLine = lines[lines.length - 1];

  const pingpongCount = readFileSync("./data/pingpong.txt", "utf-8");

  const response = `${lastLine}.\n\nPing / Pongs:\n${pingpongCount}`;
  return c.text(response);
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
