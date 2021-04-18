// Ref: https://github.com/simondevyoutube/Tutorial_SpatialHashGrid/blob/main/src/spatial-grid.js
import Point from "../basics/Point";
import Vector from "../basics/Vector";
import Block from "../core/Block";

class SpatialHashGrid {
  private cells = new Map<string, Set<Block>>();
  private dimensions: number[];
  private bounds: Point[];
  private clientGridRange = new Map<string, number[][]>();

  constructor(bounds: Point[], dimensions: number[]) {
    this.dimensions = dimensions;
    this.bounds = bounds;

    const i1 = this.getCellIndex(bounds[0]);
    const i2 = this.getCellIndex(bounds[1]);

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this.key(x, y);
        this.cells.set(k, new Set());
      }
    }
  }

  private getCellIndex(position: Point): number[] {
    const x =
      (position.x - this.bounds[0].x) / (this.bounds[1].x - this.bounds[0].x);
    const y =
      (position.y - this.bounds[0].y) / (this.bounds[1].y - this.bounds[0].y);
    const xIndex = Math.floor(x * (this.dimensions[0] - 1));
    const yIndex = Math.floor(y * (this.dimensions[1] - 1));

    return [xIndex, yIndex];
  }

  private key(xIndex: number, yIndex: number): string {
    return `${xIndex}.${yIndex}`;
  }

  updateClient(client: Block) {
    this.remove(client);
    this.insert(client);
  }

  findNear(position: Point, bounds: Vector) {
    const { x, y } = position;
    const { width: w, height: h } = bounds;

    const i1 = this.getCellIndex(new Point(x, y));
    const i2 = this.getCellIndex(new Point(x + w, y + h));
    const clients = new Set<Block>();

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this.key(x, y);

        for (const v of this.cells.get(k) as Set<Block>) {
          clients.add(v);
        }
      }
    }

    return Array.from(clients);
  }

  private insert(client: Block) {
    const { x, y } = client.pos;
    const { width: w, height: h } = client.aspect;

    const i1 = this.getCellIndex(new Point(x, y));
    const i2 = this.getCellIndex(new Point(x + w, y + h));

    this.clientGridRange.set(client.id, [i1, i2]);

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this.key(x, y);
        this.cells.get(k)?.add(client);
      }
    }
  }

  remove(client: Block): void {
    if (!this.clientGridRange.has(client.id)) {
      return;
    }

    const [i1, i2] = this.clientGridRange.get(client.id) as number[][];

    for (let x = i1[0], xn = i2[0]; x <= xn; ++x) {
      for (let y = i1[1], yn = i2[1]; y <= yn; ++y) {
        const k = this.key(x, y);
        this.cells.get(k)?.delete(client);
      }
    }
  }
}

export default SpatialHashGrid;
