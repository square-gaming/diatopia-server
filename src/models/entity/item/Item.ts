import { nanoid } from "nanoid";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import GLOBAL from "../../../constants/global";
import { Coordinate } from "../../../types/models";
import Entity from "../Entity";

abstract class Item extends Entity {
  age: number;
  health: number;

  constructor(
    id: string,
    pos: Point | Coordinate,
    age: number = 0,
    health: number = 5
  ) {
    super(
      id,
      pos,
      new Vector(0.5 * GLOBAL.UNIT_LENGTH, 0.5 * GLOBAL.UNIT_LENGTH),
      nanoid(),
      "anonymous",
      false
    );
    this.age = age;
    this.health = health;
  }
}

export default Item;
