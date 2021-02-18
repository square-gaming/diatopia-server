import Point from '../basics/Point';
import {GLOBAL} from '../constants/global';
import {Coordinate} from '../types/models';
import Element from './Element';
import Vector from '../basics/Vector';

abstract class Block extends Element {
  name: string;
  layer: number;
  pos: Point;
  aspect: Vector;
  isConcrete: boolean;

  constructor(
    name: string,
    layer = 0,
    pos: Point | Coordinate = new Point(0, 0),
    aspect: Vector = new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH),
    isConcrete = false
  ) {
    super();
    this.name = name;
    this.layer = layer;
    this.pos = pos instanceof Point ? pos : new Point(pos);
    this.aspect = aspect;
    this.isConcrete = isConcrete;
  }

  public get width(): number {
    return this.aspect.width;
  }

  public get height(): number {
    return this.aspect.height;
  }

  public get borderPos(): [Point, Point] {
    return [
      this.pos.clone(),
      this.pos.clone().add(new Vector(this.width - 1, this.height - 1)),
    ];
  }

  public get adjacentPos(): Point[] {
    return [
      this.pos
        .clone()
        .add(new Vector(this.width / 2, 0))
        .add(Vector.up.multiply(GLOBAL.UNIT_LENGTH - 1)),
      this.pos
        .clone()
        .add(new Vector(this.width, this.height / 2))
        .add(Vector.right.multiply(GLOBAL.UNIT_LENGTH - 1)),
      this.pos
        .clone()
        .add(new Vector(this.width / 2, this.height))
        .add(Vector.down.multiply(GLOBAL.UNIT_LENGTH - 1)),
      this.pos
        .clone()
        .add(new Vector(0, this.height / 2))
        .add(Vector.left.multiply(GLOBAL.UNIT_LENGTH - 1)),
    ];
  }
}

export default Block;
