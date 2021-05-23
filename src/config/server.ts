import dotenv from "dotenv";
import { ServerOptions } from "ws";

dotenv.config();

const options: ServerOptions = {
  port: Number.parseInt(process.env.WSS_PORT || "443", 10),
  path: process.env.WSS_PATH,
  noServer: true,
};

export default options;
