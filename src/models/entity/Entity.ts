import { nanoid } from "nanoid";
import FACING from "../../constants/facing";
import type { Facing } from "../../types";
import type { EntityInterface, Coordinate } from "../../types/models";
import Point from "../../basics/Point";
import Block from "../../core/Block";
import Vector from "../../basics/Vector";
import GLOBAL from "../../constants/global";

abstract class Entity extends Block implements EntityInterface {
  nickName: string;
  rotation: number;
  motion: Vector;

  constructor(
    name: string,
    pos: Point | Coordinate = new Point(0, 0),
    aspect: Vector = new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH),
    id: string = nanoid(),
    nickName = "anonymous",
    isConcrete = true,
    rotation: number = 0,
    motion: Vector = new Vector()
  ) {
    super(name, 1, pos, aspect, isConcrete, id);
    this.nickName = nickName;
    this.rotation = rotation;
    this.motion = motion;
  }

  public get facing(): Facing {
    const rotation = this.rotation % (2 * Math.PI);

    if (rotation >= 0 && rotation <= 2 * Math.PI) {
      if (this.rotation >= Math.PI / 4 && this.rotation < (Math.PI * 3) / 4) {
        return FACING.UP;
      } else if (
        this.rotation >= (Math.PI * 3) / 4 &&
        this.rotation < (Math.PI * 5) / 4
      ) {
        return FACING.LEFT;
      } else if (
        this.rotation >= (Math.PI * 5) / 4 &&
        this.rotation < (Math.PI * 7) / 4
      ) {
        return FACING.DOWN;
      } else {
        return FACING.RIGHT;
      }
    } else if (rotation < 0 && rotation >= -2 * Math.PI) {
      if (this.rotation <= -Math.PI / 4 && this.rotation > (-Math.PI * 3) / 4) {
        return FACING.DOWN;
      } else if (
        this.rotation <= (-Math.PI * 3) / 4 &&
        this.rotation > (-Math.PI * 5) / 4
      ) {
        return FACING.LEFT;
      } else if (
        this.rotation <= (-Math.PI * 5) / 4 &&
        this.rotation > (-Math.PI * 7) / 4
      ) {
        return FACING.UP;
      } else {
        return FACING.RIGHT;
      }
    } else {
      throw new RangeError();
    }
  }

  public get facingPos(): Point {
    return this.adjacentPos[this.facing];
  }
}

export default Entity;
