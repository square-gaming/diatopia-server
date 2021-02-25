import Point from "../../basics/Point";
import Vector from "../../basics/Vector";
import { Toward, Facing, Dimension, BlocksType } from "..";
import Player from "../../models/Player";
import Door from "../../models/block/structure/Door";
import Surface from "../../models/level/Surface";
import Underground from "../../models/level/Underground";
import Time from "../../models/Time";

export interface Coordinate {
  x: number;
  y: number;
}
export interface AbilitiesInfo {
  acceleration: number;
  speed: number;
}
export interface WorldInterface {
  levels: [Surface, Underground];
  players: Map<string, Player>;
  time: Time;
  surface: Surface;
  underground: Underground;
  onPlayersMove: (listener: (player: Player) => void) => void;
  onPlayersJoin: (listener: (player: Player) => void) => void;
  _observe: () => void;
}
export interface LevelInterface {
  time: Time;
  spawnPos: Point;
  blocks: BlocksType[];
  lightLevel: number;
}
export interface SurfaceInterface {}
export interface UndergroundInterface {}
export interface FloorInfo {
  type: number;
  pattern: number;
}
export interface EntityInterface {
  id: string;
  name: string;
  width: number;
  height: number;
  pos: Point;
  facing: Facing;
  isConcrete: boolean;
  borderPos: [Point, Point];
  adjacentPos: Point[];
  facingPos: Point;
}
export interface PlayerInterface extends EntityInterface {
  spawnPos: Point;
  dimension: Dimension;
  abilities: AbilitiesInfo;
  move(vector: Vector): void;
}
export interface StructureInterface {
  pos: Point;
  type: number;
  pattern: number;
  borderPos: [Point, Point];
}
export type WallInterface = StructureInterface;
export interface DoorInterface extends StructureInterface {
  toward: Toward;
  isOpen: boolean;
  interact: (player: Player) => Promise<Door>;
}
