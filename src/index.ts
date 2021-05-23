import http from "http";
import url from "url";

import DiatopiaServer from "./Server";
import serverConfig from "./config/server";
import dashboardConfig from "./config/dashboard";
import DashboardServer from "./DashboardServer";

const ds = new DiatopiaServer(serverConfig);
const dashboard = new DashboardServer(dashboardConfig);

ds.add(dashboard);
ds.listen();
dashboard.listen();

const server = http.createServer();

server.on("upgrade", (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  switch (pathname) {
    case serverConfig.path:
      ds.wss.handleUpgrade(request, socket, head, (ws) => {
        ds.wss.emit("connection", ws, request);
      });
      break;
    case dashboardConfig.path:
      dashboard.wss.handleUpgrade(request, socket, head, (ws) => {
        dashboard.wss.emit("connection", ws, request);
      });
      break;
  }
});

server.listen(process.env.PORT);
