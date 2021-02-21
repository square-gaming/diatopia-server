interface Point {
  x: number;
  y: number;
}
interface Plane {
  width: number;
  height: number;
}
type Quadrant = 0 | 1 | 2 | 3;
type Rect = Point & Plane;

class Quadtree<T extends Rect> {
  public static readonly NODE_ELEMENTS_CAPACITY = 4;

  public static readonly FIRST_QUADRANT: Quadrant = 0;

  public static readonly SECOND_QUADRANT: Quadrant = 1;

  public static readonly THIRD_QUADRANT: Quadrant = 2;

  public static readonly FOURTH_QUADRANT: Quadrant = 3;

  bounds: Rect;

  maxCapacity: number;

  depth: number;

  container: T[];

  childNodes: never[] | [Quadtree<T>, Quadtree<T>, Quadtree<T>, Quadtree<T>];

  parentNode: Quadtree<T> | null;

  constructor(
    bounds: Rect,
    maxCapacity = 10,
    depth = 0,
    parentNode: Quadtree<T> | null = null
  ) {
    this.bounds = bounds;
    this.maxCapacity = maxCapacity;
    this.depth = depth;
    this.container = [];
    this.childNodes = [];
    this.parentNode = parentNode;
  }

  public get isRoot(): boolean {
    return !this.parentNode;
  }

  public get isLeaf(): boolean {
    return !this.childNodes.length;
  }

  public insert(value: T): void {
    if (!this.isLeaf) {
      this.childNodes[this.getQuadrant(value)].insert(value);
    } else {
      this.container.push(value);

      if (this.container.length > this.maxCapacity) {
        if (this.isLeaf) {
          this.subdivide();
        }

        for (let i = 0; i < this.container.length; i++) {
          const val = this.container[i];

          this.childNodes[this.getQuadrant(val)].insert(val);
        }

        this.container = [];
      }
    }
  }

  public find<K extends Point>(value: K) {
    const found = this.container.find(
      (item) => item.x === value.x && item.y === value.y
    );

    if (!found) {
      if (!this.isLeaf) {
        for (let i = 0; i < Quadtree.FOURTH_QUADRANT; i++) {
          this.childNodes[i].delete(value);
        }
      }
    } else {
      return found;
    }

    return undefined;
  }

  public delete<K extends Point>(value: K) {
    const found = this.container.findIndex(
      (item) => item.x === value.x && item.y === value.y
    );

    if (found) {
      this.container.splice(found, 1);
    } else if (!this.isLeaf) {
      for (let i = 0; i < Quadtree.FOURTH_QUADRANT; i++) {
        this.childNodes[i].delete(value);
      }
    }
  }

  public enumerate() {
    let { container } = this;

    if (!this.isLeaf) {
      for (let i = 0; i < Quadtree.FOURTH_QUADRANT; i++) {
        container = container.concat(this.childNodes[i].enumerate());
      }
    }

    return container;
  }

  public retrieve(value: T): T[] {
    let { container } = this;

    if (!this.isLeaf) {
      container = container.concat(
        this.childNodes[this.getQuadrant(value)].retrieve(value)
      );
    }

    container = container.filter((val, i) => container.indexOf(val) >= i);

    return container;
  }

  public clear(): void {
    this.container = [];

    for (let i = 0; i < this.childNodes.length; i++) {
      if (!this.isLeaf) {
        this.childNodes[i].clear();
      }
    }
  }

  private getQuadrant(value: T): Quadrant {
    const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
    const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

    const isUpperHalf = value.y < horizontalMidpoint;
    const isLeftHalf = value.x < verticalMidpoint;
    const isRightHalf = value.x + value.width > verticalMidpoint;
    const isLowerHalf = value.y + value.height > horizontalMidpoint;

    if (isUpperHalf && isRightHalf) {
      return Quadtree.FIRST_QUADRANT;
    }
    if (isUpperHalf && isLeftHalf) {
      return Quadtree.SECOND_QUADRANT;
    }
    if (isLowerHalf && isLeftHalf) {
      return Quadtree.THIRD_QUADRANT;
    }
    return Quadtree.FOURTH_QUADRANT;
  }

  private subdivide(): void {
    const depth = this.depth + 1;
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;
    const { x } = this.bounds;
    const { y } = this.bounds;

    this.childNodes = [
      new Quadtree(
        {
          x: x + subWidth,
          y,
          width: subWidth,
          height: subWidth,
        },
        this.maxCapacity,
        depth,
        this
      ),
      new Quadtree(
        {
          x,
          y,
          width: subWidth,
          height: subWidth,
        },
        this.maxCapacity,
        depth,
        this
      ),
      new Quadtree(
        {
          x,
          y: y + subHeight,
          width: subWidth,
          height: subWidth,
        },
        this.maxCapacity,
        depth,
        this
      ),
      new Quadtree(
        {
          x: x + subWidth,
          y: y + subHeight,
          width: subWidth,
          height: subWidth,
        },
        this.maxCapacity,
        depth,
        this
      ),
    ];
  }
}

export default Quadtree;
