import Vector from './Vector';

class Ray {
  origin: Vector;
  direction: Vector;

  constructor(origin = new Vector(0, 0), direction = new Vector(1, 0)) {
    this.origin = origin;
    if (direction.length === 1) {
      this.direction = direction;
    } else {
      throw Error('Direction Vector should be normalized.');
    }
  }

  at(t: number, target: Vector = new Vector()) {
    return target.copy(this.direction).multiply(t).add(this.origin);
  }

  copy(ray: Ray) {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);

    return this;
  }
}

export default Ray;
