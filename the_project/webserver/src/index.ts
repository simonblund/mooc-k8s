import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";

const app = new Hono();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

import { promises as fs } from "fs";

let last_image_timestamp = Date.now();

async function getNewImage(previous_timestamp?: number) {
  const new_image = await fetch("https://picsum.photos/400");
  const new_image_buffer = await new_image.arrayBuffer();
  const timestamp = Date.now();
  if (previous_timestamp) {
    await fs.unlink(`./data/${previous_timestamp}.png`).catch(() => {});
  }
  console.log("New image fetched at", new Date().toISOString());
  await fs.writeFile(`./data/${timestamp}.png`, Buffer.from(new_image_buffer));
  return timestamp;
}

app.get("/image", async (c) => {
  const files = await fs.readdir("./data");
  const imageFiles = files.filter((file) => file.endsWith(".png"));
  let timestamp_of_current_image = 0;
  if (imageFiles.length === 0) {
    timestamp_of_current_image = await getNewImage();
  } else {
    timestamp_of_current_image = Number(imageFiles[0].split(".")[0]);
    console.log("Current image timestamp:", timestamp_of_current_image);
  }

  if (Date.now() - Number(timestamp_of_current_image) > 600000) {
    await getNewImage(timestamp_of_current_image);
  }

  const imageBuffer = await fs.readFile(
    `./data/${timestamp_of_current_image}.png`
  );
  const uint8Array = new Uint8Array(
    imageBuffer.buffer,
    imageBuffer.byteOffset,
    imageBuffer.byteLength
  );

  // @ts-ignore
  return c.body(uint8Array, {
    headers: { "Content-Type": "image/png" },
  });
});
app.use("*", serveStatic({ root: "./dist/static" }));

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Server started on port ${port}`);
  }
);
