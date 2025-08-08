import { parseArgs } from "node:util";

// コマンドライン引数をパースしてポート番号を取得する関数
export const getPortFromArgs = (): number => {
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
    } catch (e: any) {
        console.error(`Error parsing arguments: ${e.message}`);
        process.exit(1);
    }
    return 3000; // Default port
};
