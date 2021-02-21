import Point from "./Point";

class Segment {
  start: Point;
  end: Point;

  constructor(value: [Point, Point]);
  constructor(start: Point, end: Point);
  constructor(startOrValue: Point | [Point, Point], end?: Point) {
    if (end) {
      if (startOrValue instanceof Point && end instanceof Point) {
        this.start = startOrValue;
        this.end = end;
      } else {
        throw Error("Unexpected type of argument");
      }
    } else if (Array.isArray(startOrValue) && startOrValue.length === 2) {
      const [a, b] = startOrValue;

      this.start = a;
      this.end = b;
    } else {
      throw Error("Unexpected type of argument");
    }
  }
}

export default Segment;
