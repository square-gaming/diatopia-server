import {Coordinate} from '../types/models';
import Vector from './Vector';

class Point {
  static isEqual(a: Point, b: Point): boolean {
    return a.x === b.x && a.y === b.y;
  }

  public x: number;
  public y: number;

  constructor(value: Coordinate);
  constructor(x: number, y: number);
  constructor(xOrValue: number | Coordinate, y?: number) {
    if (y === undefined) {
      if (typeof xOrValue !== 'number') {
        this.x = xOrValue.x;
        this.y = xOrValue.y;
      } else {
        throw Error('Unexpected type of argument');
      }
    } else {
      if (typeof xOrValue === 'number' && typeof y === 'number') {
        this.x = xOrValue;
        this.y = y;
      } else {
        throw Error('Unexpected type of argument');
      }
    }
  }

  public round(threshold: number) {
    return new Point(
      Math.round(this.x / threshold) * threshold,
      Math.round(this.y / threshold) * threshold
    );
  }

  public floor(threshold: number) {
    return new Point(
      Math.floor(this.x / threshold) * threshold,
      Math.floor(this.y / threshold) * threshold
    );
  }

  public ceil(threshold: number) {
    return new Point(
      Math.ceil(this.x / threshold) * threshold,
      Math.ceil(this.y / threshold) * threshold
    );
  }

  public add(vec: Vector) {
    this.x += vec.x;
    this.y += vec.y;

    return this;
  }

  public clone() {
    return new Point(this.x, this.y);
  }
}

export default Point;
