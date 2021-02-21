import GLOBAL from "../../constants/global";
import Point from "../../basics/Point";
import Floor from "../../models/block/Floor";
import Door from "../../models/block/structure/Door";
import Structure from "../../models/block/structure/Structure";
import Wall from "../../models/block/structure/Wall";
import type { BlocksType, StructuresType } from "../../types";
import { direction2Vector } from "../../utils";
import floor from "./rule/floor";
import { wall, door } from "./rule/structure";

export function patternReconfigure<T extends BlocksType>(
  array: T[],
  rulefn: (adjacents: (T | null)[], source: T) => T
): T[] {
  return array.map((source, _i, all) => {
    const adjacents = direction2Vector.reduce((result: (T | null)[], vec) => {
      const found = all.find((target) => {
        if (source instanceof Structure && target instanceof Structure) {
          return Point.isEqual(
            source.pos.clone().add(vec.clone().multiply(GLOBAL.UNIT_LENGTH)),
            target.pos
          );
        }
        if (
          source instanceof Floor &&
          target instanceof Floor &&
          source.type === target.type
        ) {
          return Point.isEqual(
            source.pos.clone().add(vec.clone().multiply(GLOBAL.UNIT_LENGTH)),
            target.pos
          );
        }
        return false;
      });

      if (found) {
        result.push(found);
      } else {
        result.push(null);
      }

      return result;
    }, []);
    return rulefn(adjacents, source);
  });
}

export function configureRule(
  adjacents: (BlocksType | null)[],
  source: BlocksType
) {
  function isStructures(
    blocks: (BlocksType | null)[]
  ): blocks is StructuresType[] {
    return blocks.every(
      (block) => block instanceof Structure || block === null
    );
  }
  function isFloors(blocks: (BlocksType | null)[]): blocks is Floor[] {
    return blocks.every((block) => block instanceof Floor || block === null);
  }
  if (isStructures(adjacents) && source instanceof Wall) {
    return wall(adjacents, source);
  }
  if (isStructures(adjacents) && source instanceof Door) {
    return door(adjacents, source);
  }
  if (isFloors(adjacents) && source instanceof Floor) {
    return floor(adjacents, source);
  }
  return source;
}
