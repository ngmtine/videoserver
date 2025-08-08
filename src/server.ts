import { serve } from "@hono/node-server";
import type { Hono } from "hono";

type ServerType = ReturnType<typeof serve>;

let server: ServerType | null = null;

export const startServer = (app: Hono<any>, port: number) => {
    server = serve(
        {
            fetch: app.fetch,
            port: port,
        },
        (info) => {
            console.log(`Server is running on http://localhost:${info.port}`);
        }
    );

    server.on("error", (e: any) => {
        if (e.code === "EADDRINUSE") {
            console.log(`Port ${port} is in use, trying next port...`);
            // ポートが使用中の場合、インクリメントして再試行
            server?.close(() => {
                startServer(app, port + 1);
            });
        } else {
            console.error("Failed to start server:", e);
        }
    });
};
