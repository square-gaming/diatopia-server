import http from "http";
import path from "path";
import { setInterval } from "timers";
import { app, BrowserWindow } from "electron";
import WebSocket from "ws";
import { nanoid } from "nanoid";
import Manager from "./Manager";
import MessageHandle from "./controllers/receiver";
import type { Action } from "./types";
import action from "./constants/action";
import GLOBAL from "./constants/global";
import IPC_CHANNEL from "./constants/ipcChannel";

class Server {
  wss: WebSocket.Server;

  win: BrowserWindow | undefined;

  manager: Manager;

  pushTimer: NodeJS.Timeout | undefined;

  constructor(options?: WebSocket.ServerOptions) {
    this.wss = new WebSocket.Server(options);
    this.manager = new Manager();
    this.pushTimer = setInterval(this.push.bind(this), GLOBAL.TICK_PERIOD);

    app.whenReady().then(this.createWindow.bind(this));
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
  }

  public broadcast(data: Action[]): void;

  public broadcast(data: Action[], sender: WebSocket, dataToSender: any): void;

  public broadcast(data: Action[], sender?: WebSocket, dataToSender?: any) {
    this.wss.clients.forEach(function (this: WebSocket, client: WebSocket) {
      if (client.readyState === WebSocket.OPEN) {
        if (client === sender) {
          client.send(JSON.stringify(dataToSender));
        } else {
          client.send(JSON.stringify(data));
        }
      }
    });
  }

  public listen() {
    console.log(
      `WebSocket listening on ws://${this.wss.options.host}:${this.wss.options.port}`
    );
    this.wss.addListener(
      "connection",
      function connection(
        this: Server,
        ws: WebSocket,
        req: http.IncomingMessage
      ) {
        const uid = nanoid();

        req.headers.cookie = `uid=${uid};`;
        this.win?.webContents.send(IPC_CHANNEL.CLIENT.CONNECT, uid);
        this.websocketSetup(ws, req);
      }.bind(this)
    );
  }

  private createWindow() {
    this.win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });
    this.win.loadFile(path.join(__dirname, "gui.html"));
  }

  private push() {
    const actions = this.manager.transfer();
    if (actions.length > 0) {
      this.broadcast(actions);
    }
  }

  private websocketSetup(ws: WebSocket, req: http.IncomingMessage) {
    const uid = req.headers.cookie
      ? req.headers.cookie.split("=")[1].slice(0, -1)
      : "";

    console.log(`Player ${uid} connects`);

    ws.on(
      "message",
      function (this: Server, message: string) {
        const data: { type: string; payload: any } = JSON.parse(message);

        if (uid) {
          MessageHandle[data.type](uid, data, this.manager, ws);
        } else {
          console.error("Someone sending message without cookie.");
        }
      }.bind(this)
    );

    ws.on(
      "close",
      function (this: Server) {
        console.log(`Player ${uid} disconnects`);
        this.manager.removePlayer(uid);
        this.manager.actions.push(action.players.leave(uid));
        this.win?.webContents.send(IPC_CHANNEL.CLIENT.DISCONNECT, uid);
      }.bind(this)
    );

    ws.on("error", function (e: Error) {
      console.error("error", e);
    });
  }
}

export default Server;
