import http from "http";
import WebSocket from "ws";
import Wall from "../models/block/structure/Wall";
import Door from "../models/block/structure/Door";
import Surface from "../models/level/Surface";
import Underground from "../models/level/Underground";
import World from "../models/World";
import Player from "../models/Player";
import Floor from "../models/block/Floor";
import Point from "../basics/Point";
import Manager from "../Manager";
import Torch from "../models/block/light/Torch";
import Cow from "../models/entity/mobs/Cow";
import Sheep from "../models/entity/mobs/Sheep";
import Goat from "../models/entity/mobs/Goat";
import Pig from "../models/entity/mobs/Pig";
import DoorItem from "../models/entity/item/Door";

export type Dimension = 0 | 1;
export type LightLevel = 0;
export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Facing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Toward = 0 | 1;
export type Level = Surface | Underground;
export type StructuresType = Wall | Door;
export type BlocksType = Floor | Wall | Door | Torch;
export type EntitiesType = MobsType | ItemsType;
export type MobsType = Cow | Sheep | Goat | Pig;
export type ItemsType = DoorItem;

export interface Action {
  type: string;
  payload?: any;
}
export interface ManagerInterface {
  world: World;
  actions: Action[];
  observe: () => void;
  transfer: () => Action[];
  getAllPlayers: () => Player[];
  getPlayer: (uid: string) => Player;
  addPlayer: (uid: string, name: string) => Promise<Player>;
  removePlayer: (uid: string) => void;
  getBlocks: (dimension: Dimension, pos: Point) => BlocksType[];
}
export interface ServerInterface {
  wss: WebSocket.Server;
  manager: Manager;
  pushTimer: NodeJS.Timeout | undefined;
  broadcast: (data: Action[], sender?: WebSocket, dataToSender?: any) => void;
  listen: () => void;
  _push: () => void;
  _websocketSetup: (ws: WebSocket, req: http.IncomingMessage) => void;
}
