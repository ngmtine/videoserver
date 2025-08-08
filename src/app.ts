import { Hono } from "hono";
import { downloadRoute } from "./routes/download.js";
import { indexRoute } from "./routes/index.js";
import { videoRoute } from "./routes/videos.js";

const app = new Hono();

app.route("/", indexRoute);
app.route("/videos/*", videoRoute);
app.route("/download/*", downloadRoute);

export { app };
