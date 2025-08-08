import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { readdir } from "fs/promises";
import { Hono } from "hono";
import { parseArgs } from "node:util";
import path from "path";
const app = new Hono();
// videosディレクトリの静的ファイルを /videos パスで提供する
app.use("/videos/*", serveStatic({ root: "./" }));
// 配信可能な動画ファイルをリスト表示する
app.get("/", async (c) => {
    try {
        const videoDir = "./videos";
        const files = await readdir(videoDir);
        const videoFiles = files.filter((file) => path.extname(file).toLowerCase() === ".mp4");
        if (videoFiles.length === 0) {
            return c.html('<h1>No videos found</h1><p>Please add .mp4 files to the "videos" directory.</p>');
        }
        const list = videoFiles.map((file) => `<li><a href="/videos/${file}">${file}</a></li>`).join("");
        return c.html(`<h1>Available Videos</h1><ul>${list}</ul>`);
    }
    catch (error) {
        console.error("Error reading video directory:", error);
        return c.html("<h1>Error</h1><p>Could not read video directory.</p>", 500);
    }
});
let server = null;
const startServer = (port) => {
    server = serve({
        fetch: app.fetch,
        port: port,
    }, (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    });
    server.on("error", (e) => {
        if (e.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use, trying next port...`);
            server?.close(() => {
                startServer(port + 1);
            });
        }
        else {
            console.error("Failed to start server:", e);
        }
    });
};
// コマンドライン引数をパースしてポート番号を取得する関数
const getPortFromArgs = () => {
    try {
        const { values } = parseArgs({
            options: {
                port: {
                    type: "string",
                    short: "p",
                },
            },
        });
        if (values.port) {
            const port = parseInt(values.port, 10);
            if (isNaN(port)) {
                console.error(`Invalid port number provided: ${values.port}`);
                process.exit(1);
            }
            return port;
        }
    }
    catch (e) {
        console.error(`Error parsing arguments: ${e.message}`);
        process.exit(1);
    }
    return 3000; // Default port
};
const initialPort = getPortFromArgs();
startServer(initialPort);
