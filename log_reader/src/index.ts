import { serve } from "@hono/node-server";
import { read, readFileSync } from "fs";
import { Hono } from "hono";

const app = new Hono();

app.get("*", async (c) => {
  const fileContents = readFileSync("./data/log.txt", "utf-8");
  const lines = fileContents.trim().split("\n");
  const lastLine = lines[lines.length - 1];

  const pingpongCount = await fetch(process.env.PINGPONG_SVC_URL + "/pings").then(
    (res) => res.text()
  );

  const message = process.env.MESSAGE || "No message found in env";

  const filecontents = readFileSync("/var/configs/information.txt", "utf-8");

  const response = `Message ENV var:\n${message}\n\nFile Contents:\n${filecontents}\n\n ${lastLine}.\n\nPing / Pongs:\n${pingpongCount}`;
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
