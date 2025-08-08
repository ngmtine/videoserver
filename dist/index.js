import { app } from "./app.js";
import { getPortFromArgs } from "./lib/argv.js";
import { startServer } from "./server.js";
// ポート取得
const initialPort = getPortFromArgs();
// サーバー起動
startServer(app, initialPort);
