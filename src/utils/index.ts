import Floor from '../models/block/Floor';
import Structure from '../models/block/structure/Structure';
import Vector from '../basics/Vector';
import Wall from '../models/block/structure/Wall';
import Door from '../models/block/structure/Door';
import {TOWARD} from '../constants/toward';
import {setInterval, clearInterval} from 'timers';
import {BlocksType, EntitiesType} from '../types';
import Torch from '../models/block/light/Torch';
import Point from '../basics/Point';
import Cow from '../models/entity/mobs/Cow';

export const TimeoutHelper = (() => {
  let counter = 0;
  const timeouts = new Map();

  return {
    setInterval(
      callback: (...args: any[]) => void,
      ms: number,
      ...args: any[]
    ): number {
      const timer = setInterval(callback, ms, ...args);
      timeouts.set(++counter, timer);

      return counter;
    },
    clearInterval(id: number) {
      const timer = timeouts.get(id);
      clearInterval(timer);

      return timeouts.delete(id);
    },
  };
})();

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
        structure = new Wall({x: j * size, y: i * size}, 3);
      }
      if (i === height - 10 && j === 10) {
        structure = new Door(
          {x: j * size, y: i * size},
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
  blocks.push(new Torch(new Point(1100, 1000)));
  blocks.push(new Torch(new Point(1200, 1000)));
  blocks.push(new Torch(new Point(1200, 900)));
  blocks.push(new Torch(new Point(1100, 900)));

  return blocks;
}

export function generateEntities() {
  const entites: EntitiesType[] = [];

  entites.push(new Cow(new Point(500, 500)));

  return entites;
}

export const direction2Vector = [
  Vector.up,
  Vector.upRight,
  Vector.right,
  Vector.downRight,
  Vector.down,
  Vector.downLeft,
  Vector.left,
  Vector.upLeft,
];

export function getRandom(min: number, max: number, isMaxInclusive = true) {
  return Math.random() * (max - min + (isMaxInclusive ? 1 : 0)) + min;
}
