import DiatopiaServer from "./Server";
import serverConfig from "./config/server";
import dashboardConfig from "./config/dashboard";
import DashboardServer from "./DashboardServer";

const ds = new DiatopiaServer(serverConfig);
const dashboard = new DashboardServer(dashboardConfig);

ds.add(dashboard);

// TODO: refactor, ws can share the same server instance and listen the same port with different path
ds.listen();
dashboard.listen();
