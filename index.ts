import Server from "./src/Server";
import serverConfig from "./src/config/server";

// Create a WebSocket server completely detached from the HTTP server.
const wss = new Server(serverConfig);

wss.listen();
