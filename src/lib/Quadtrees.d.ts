declare namespace Quadtree {
  type Quadrant = 0 | 1 | 2 | 3;
  type Rect = Point & Plane;
  interface Point {
    x: number;
    y: number;
  }
  interface Plane {
    width: number;
    height: number;
  }
}
