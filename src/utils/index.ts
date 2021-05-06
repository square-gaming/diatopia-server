import Floor from "../models/block/Floor";
import Vector from "../basics/Vector";
import Wall from "../models/block/structure/Wall";
import Door from "../models/block/structure/Door";
import TOWARD from "../constants/toward";
import type { BlocksType, MobsType, ItemsType } from "../types";
import Torch from "../models/block/light/Torch";
import Point from "../basics/Point";
import GLOBAL from "../constants/global";
import Mob from "../models/entity/mobs/Mob";
import Item from "../models/entity/item/Item";

export function generateBlocks(width: number, height: number, size: number) {
  const blocks: BlocksType[] = [];

  for (let i = 0; i < height; ++i) {
    for (let j = 0; j < width; ++j) {
      const floor = new Floor(Math.round(Math.random()) * 8 + 1, {
        x: j * size,
        y: i * size,
      });
      let structure = null;

      if (
        i === height - 1 ||
        i === 0 ||
        j === 0 ||
        j === width - 1 ||
        j === 10
      ) {
        structure = new Wall({ x: j * size, y: i * size }, 3);
      }
      if (i === height - 10 && j === 10) {
        structure = new Door(
          { x: j * size, y: i * size },
          Door.TYPE.STONE,
          TOWARD.EAST_WEST,
          false
        );
      }
      if (structure) {
        blocks.push(structure);
      }
      blocks.push(floor);
    }
  }
  blocks.push(
    new Torch(new Point(11 * GLOBAL.UNIT_LENGTH, 10 * GLOBAL.UNIT_LENGTH))
  );
  blocks.push(
    new Torch(new Point(12 * GLOBAL.UNIT_LENGTH, 10 * GLOBAL.UNIT_LENGTH))
  );
  blocks.push(
    new Torch(new Point(12 * GLOBAL.UNIT_LENGTH, 9 * GLOBAL.UNIT_LENGTH))
  );
  blocks.push(
    new Torch(new Point(11 * GLOBAL.UNIT_LENGTH, 9 * GLOBAL.UNIT_LENGTH))
  );

  return blocks;
}

export const direction2Vector = [
  Vector.right,
  Vector.upRight,
  Vector.up,
  Vector.upLeft,
  Vector.left,
  Vector.downLeft,
  Vector.down,
  Vector.downRight,
];

export function getRandom(min: number, max: number, isMaxInclusive = true) {
  return Math.random() * (max - min + (isMaxInclusive ? 1 : 0)) + min;
}

export const isMob = (data: any): data is MobsType => {
  return data instanceof Mob;
};

export const areMobs = (datas: any[]): datas is MobsType[] => {
  return datas.every((data) => isMob(data));
};

export const isItem = (data: any): data is ItemsType => {
  return data instanceof Item;
};
