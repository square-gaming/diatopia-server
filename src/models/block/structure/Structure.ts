import GLOBAL from "../../../constants/global";
import Block from "../../../core/Block";
import Point from "../../../basics/Point";
import Segment from "../../../basics/Segment";
import Vector from "../../../basics/Vector";
import type { StructureInterface, Coordinate } from "../../../types/models";

abstract class Structure extends Block implements StructureInterface {
  pos: Point;
  type: number;
  pattern: number;
  isConcrete: boolean;
  frames: Segment[];

  constructor(
    name: string,
    pos: Point | Coordinate,
    type: number,
    isConcrete: boolean,
    frames: Segment[] = [new Segment(new Point(0, 0), new Point(0, 0))]
  ) {
    super(
      name,
      1,
      pos,
      new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH),
      isConcrete
    );
    this.pos = pos instanceof Point ? pos : new Point(pos);
    this.type = type;
    this.pattern = 0;
    this.isConcrete = isConcrete;
    this.frames = frames;
  }
}

export default Structure;
