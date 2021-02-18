import Structure from './Structure';
import {Coordinate, WallInterface} from '../../../types/models';
import Point from '../../../basics/Point';

class Wall extends Structure implements WallInterface {
  static PATTERNS = {
    INDIVIDUAL: 0,
    SURFACE: 1,
    INTERSECTION: 2,
    NORTH_SOUTH: 3,
    EAST_WEST: 4,
    T: 5,
    T_90_DEG: 6,
    T_180_DEG: 7,
    T_270_DEG: 8,
    TOP_LEFT: 9,
    TOP_RIGHT: 10,
    BOTTOM_LEFT: 11,
    BOTTOM_RIGHT: 12,
  };

  constructor(pos: Point | Coordinate, type: number) {
    super('Wall', pos, type, true);
  }
}

export default Wall;
