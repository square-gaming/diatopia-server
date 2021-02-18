import Entity from './entity/Entity';
import Point from '../basics/Point';
import {AbilitiesInfo, Coordinate} from '../types/models';
import {Dimension, Direction} from '../types';
import {DIMENSION} from '../constants/dimension';
import {DIRECTION} from '../constants/direction';
import {FACING} from '../constants/facing';
import EVENT from '../constants/event';
import Vector from '../basics/Vector';

class Player extends Entity {
  spawnPos: Point;
  dimension: Dimension;
  abilities: AbilitiesInfo;

  constructor(
    id: string,
    nickName: string,
    pos: Point | Coordinate,
    spawnPos: Point | Coordinate,
    dimension: Dimension = DIMENSION.SURFACE
  ) {
    super('Player', pos, new Vector(100, 100), id, nickName);
    this.spawnPos = spawnPos instanceof Point ? spawnPos : new Point(spawnPos);
    this.dimension = dimension;
    this.abilities = {
      speed: 8,
    };
  }

  protected update() {
    super.update();
    if (!this.motion.isZero()) {
      this._move(this.motion);
    }
  }

  public accelerate(dir: Direction, isMotion: boolean) {
    switch (dir) {
      case DIRECTION.NORTH:
        this.motion.add(
          isMotion
            ? Vector.up.multiply(this.abilities.speed)
            : Vector.down.multiply(this.abilities.speed)
        );
        this.facing = FACING.UP;
        break;
      case DIRECTION.SOUTH:
        this.motion.add(
          isMotion
            ? Vector.down.multiply(this.abilities.speed)
            : Vector.up.multiply(this.abilities.speed)
        );
        this.facing = FACING.DOWN;
        break;
      case DIRECTION.WEST:
        this.motion.add(
          isMotion
            ? Vector.left.multiply(this.abilities.speed)
            : Vector.right.multiply(this.abilities.speed)
        );
        this.facing = FACING.LEFT;
        break;
      case DIRECTION.EAST:
        this.motion.add(
          isMotion
            ? Vector.right.multiply(this.abilities.speed)
            : Vector.left.multiply(this.abilities.speed)
        );
        this.facing = FACING.RIGHT;
        break;
      default:
        console.error('Unexpected move direction.');
        break;
    }
  }

  public onMove(listener: (player: Player) => void) {
    this.on(EVENT.PLAYER.MOVE, listener);
  }

  private _move(vec: Vector) {
    this.pos.add(vec);
    this.emit(EVENT.PLAYER.MOVE, this);
  }
}

export default Player;
