import http from "http";
import WebSocket from "ws";
import {
  events,
  isPlayerJoinEvent,
  isPlayerLeaveEvent,
} from "./constants/dashboardEvents";
import { Action } from "./types";
import { Observer } from "./types/observable";

class DashboardServer implements Observer {
  wss: WebSocket.Server;
  currentPlayerIds: string[] = [];

  constructor(options?: WebSocket.ServerOptions) {
    this.wss = new WebSocket.Server(options);
  }

  public listen() {
    console.log(
      `Dashboard listening on ws://${this.wss.options.host}:${this.wss.options.port}`
    );
    this.wss.on("connection", (ws: WebSocket, req: http.IncomingMessage) => {
      const ip = req.socket.remoteAddress;
      console.log(`${ip} is connected to dashboard`);
      ws.send(JSON.stringify(events.client.connect(this.currentPlayerIds)));

      ws.on("close", () => {
        console.log(`${ip} is disconnected from dashboard`);
      });

      ws.on("error", function (e: Error) {
        console.error("error", e);
      });
    });
  }

  public handle(event: Action) {
    if (isPlayerJoinEvent(event) || isPlayerLeaveEvent(event)) {
      this.wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(event));
        }
      });
    }

    if (isPlayerJoinEvent(event)) {
      this.currentPlayerIds.push(event.payload);
    }

    if (isPlayerLeaveEvent(event)) {
      this.currentPlayerIds = this.currentPlayerIds.filter(
        (uid) => uid !== event.payload
      );
    }
  }
}

export default DashboardServer;
