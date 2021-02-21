import { nanoid } from "nanoid";
import FACING from "../../constants/facing";
import type { Facing } from "../../types";
import type { EntityInterface, Coordinate } from "../../types/models";
import Point from "../../basics/Point";
import Block from "../../core/Block";
import Vector from "../../basics/Vector";
import GLOBAL from "../../constants/global";

abstract class Entity extends Block implements EntityInterface {
  id: string;
  nickName: string;
  facing: Facing;
  motion: Vector;

  constructor(
    name: string,
    pos: Point | Coordinate = new Point(0, 0),
    aspect: Vector = new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH),
    id: string = nanoid(),
    nickName = "anonymous",
    facing: Facing = FACING.DOWN,
    motion: Vector = new Vector(),
    isConcrete = true
  ) {
    super(name, 1, pos, aspect, isConcrete);
    this.id = id;
    this.nickName = nickName;
    this.facing = facing;
    this.motion = motion;
  }

  public get facingPos(): Point {
    return this.adjacentPos[this.facing];
  }
}

export default Entity;
