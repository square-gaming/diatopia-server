import dotenv from "dotenv";
import { ServerOptions } from "ws";

dotenv.config();

const options: ServerOptions = {
  path: process.env.WSS_PATH,
  noServer: true,
};

export default options;
