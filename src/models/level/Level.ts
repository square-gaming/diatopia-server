import type { LevelInterface } from "../../types/models";
import Time from "../Time";
import Point from "../../basics/Point";
import {
  patternReconfigure,
  configureRule,
} from "../../algorithm/patternReconfiguration";
import GLOBAL from "../../constants/global";
import Element from "../../core/Element";
import Vector from "../../basics/Vector";
import type { BlocksType, EntitiesType } from "../../types";
import SpatialHashGrid from "../../lib/SpatialHashGrid";

abstract class Level extends Element implements LevelInterface {
  time: Time;
  spawnPos: Point;
  blocks: BlocksType[];
  entities: EntitiesType[];
  lightLevel: number;
  border: Vector;
  spatialHashGrid?: SpatialHashGrid;

  constructor(
    time: Time,
    lightLevel = 0,
    spawnPos: Point = new Point(0, 0),
    blocks: BlocksType[] = [],
    entities: EntitiesType[] = [],
    border: Vector = new Vector(0, 0)
  ) {
    super();
    this.time = time;
    this.spawnPos = spawnPos instanceof Point ? spawnPos : new Point(spawnPos);
    this.border = border;
    this.blocks = patternReconfigure(blocks, configureRule);
    this.entities = entities;
    this.lightLevel = lightLevel;
  }

  public getBlock(type: string, pos: Point) {
    return this.blocks.find((block) => {
      if (
        block.name === type &&
        Math.floor(pos.x / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH ===
          block.pos.x &&
        Math.floor(pos.y / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH ===
          block.pos.y
      ) {
        return block;
      }
      throw Error();
    });
  }

  public getBlocks(pos: Point) {
    return this.blocks.filter(
      (block) =>
        Math.floor(pos.x / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH ===
          block.pos.x &&
        Math.floor(pos.y / GLOBAL.UNIT_LENGTH) * GLOBAL.UNIT_LENGTH ===
          block.pos.y
    );
  }
}

export default Level;
