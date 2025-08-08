import { readdir } from "fs/promises";
import { Hono } from "hono";
import path from "path";
const app = new Hono();
// 配信可能な動画ファイルをリスト表示するhtmlを返すルートエンドポイント
app.get(async (c) => {
    try {
        const videoDir = "./videos";
        const files = await readdir(videoDir);
        const videoFiles = files.filter((file) => path.extname(file).toLowerCase() === ".mp4");
        if (videoFiles.length === 0) {
            return c.html('<h1>No videos found</h1><p>Please add .mp4 files to the "videos" directory.</p>');
        }
        const list = videoFiles.map((file) => `<li><a href="/videos/${file}">${file}</a> <a href="/download/${file}">(Download)</a></li>`).join("");
        return c.html(`<h1>Available Videos</h1><ul>${list}</ul>`);
    }
    catch (error) {
        console.error("Error reading video directory:", error);
        return c.html("<h1>Error</h1><p>Could not read video directory.</p>", 500);
    }
});
export const indexRoute = app;
