import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

const todos: string[] = [];

const port = process.env.PORT || "3000";

app.get("/todos", (c) => {
  return c.json(todos);
});

app.post("/todos", async (c) => {
  const { text } = await c.req.json();
  console.log("Adding todo:", text);
  todos.push(text);
  return c.json({ message: "Todo added", todos });
});

serve(
  {
    fetch: app.fetch,
    port: Number(port),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
