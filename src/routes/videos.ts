import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// 動画ファイルを配信するためのエンドポイント
app.get(
    cors({ origin: "*" }), // 全てのオリジンを許可
    serveStatic({ root: "./" }) // 静的ファイルを配信するためのミドルウェア
);

export const videoRoute = app;
