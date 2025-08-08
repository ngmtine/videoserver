import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { cors } from "hono/cors";
import path from "path";

const app = new Hono();

// 動画ファイルをダウンロードさせるためのエンドポイント
app.get(
    cors({ origin: "*" }), // 全てのオリジンを許可
    async (c, next) => {
        // リクエストされたURLからファイル名を取得
        const url = new URL(c.req.url);
        const fileName = path.basename(url.pathname);

        // Content-Dispositionヘッダーを設定（ブラウザにダウンロードさせるための指示）
        c.header("Content-Disposition", `attachment; filename="${fileName}"`);

        await next();
    },

    // 静的ファイルを配信するためのミドルウェア（パスを変更してリポジトリ内のvideosディレクトリに誘導する）
    serveStatic({
        root: "./",
        rewriteRequestPath: (path) => path.replace(/^\/download/, "/videos/"),
    })
);

export const downloadRoute = app;
