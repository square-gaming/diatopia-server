import DiatopiaServer from "./Server";
import serverConfig from "./config/server";

const ds = new DiatopiaServer(serverConfig);

ds.listen();
