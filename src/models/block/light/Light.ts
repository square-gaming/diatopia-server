import Point from "../../../basics/Point";
import Block from "../../../core/Block";

abstract class Light extends Block {
  lightLevel: number;

  constructor(id: string, pos: Point, lightLevel: number) {
    super(id, 2, pos);
    this.lightLevel = lightLevel;
  }
}

export default Light;
