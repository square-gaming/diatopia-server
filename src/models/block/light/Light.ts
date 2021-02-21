import Point from "../../../basics/Point";
import Block from "../../../core/Block";

abstract class Light extends Block {
  lightLevel: number;

  constructor(name: string, pos: Point, lightLevel: number) {
    super(name, 2, pos);
    this.lightLevel = lightLevel;
  }
}

export default Light;
