import dotenv from "dotenv";
import { ServerOptions } from "ws";

dotenv.config();

const dashboardConfig: ServerOptions = {
  port: Number.parseInt(process.env.DASHBOARD_PORT || "443", 10),
  path: process.env.DASHBOARD_PATH,
  noServer: true,
};

export default dashboardConfig;
