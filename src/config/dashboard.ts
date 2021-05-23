import dotenv from "dotenv";
import { ServerOptions } from "ws";

dotenv.config();

const dashboardConfig: ServerOptions = {
  path: process.env.DASHBOARD_PATH,
  noServer: true,
};

export default dashboardConfig;
