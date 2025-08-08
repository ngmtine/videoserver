import { serve } from "@hono/node-server";
let server = null;
export const startServer = (app, port) => {
    server = serve({
        fetch: app.fetch,
        port: port,
    }, (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    });
    server.on("error", (e) => {
        if (e.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use, trying next port...`);
            // ポートが使用中の場合、インクリメントして再試行
            server?.close(() => {
                startServer(app, port + 1);
            });
        }
        else {
            console.error("Failed to start server:", e);
        }
    });
};
