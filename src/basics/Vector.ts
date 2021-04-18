class Vector {
  static get up() {
    return new Vector(0, -1);
  }
  static get down() {
    return new Vector(0, 1);
  }
  static get left() {
    return new Vector(-1, 0);
  }
  static get right() {
    return new Vector(1, 0);
  }
  static get upRight() {
    return new Vector(1, -1);
  }
  static get downRight() {
    return new Vector(1, 1);
  }
  static get downLeft() {
    return new Vector(-1, 1);
  }
  static get upLeft() {
    return new Vector(-1, -1);
  }
  static isEqual = function (a: Vector, b: Vector): boolean {
    return a.x === b.x && a.y === b.y;
  };

  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  public isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  public get width(): number {
    return this.x;
  }

  public get height(): number {
    return this.y;
  }

  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set(v: Vector): Vector;
  set(x: number, y: number): Vector;
  set(vOrX: Vector | number, y?: number) {
    if (vOrX instanceof Vector) {
      this.x = vOrX.x;
      this.y = vOrX.y;

      return this;
    }
    if (typeof vOrX === "number" && typeof y === "number") {
      this.x = vOrX;
      this.y = y;

      return this;
    }
    throw Error("Unexpected argument type");
  }

  add(v: Vector): Vector;
  add(x: number, y: number): Vector;
  add(vOrX: Vector | number, y?: number) {
    if (vOrX instanceof Vector) {
      this.x += vOrX.x;
      this.y += vOrX.y;

      return this;
    }
    if (typeof vOrX === "number" && typeof y === "number") {
      this.x += vOrX;
      this.y += y;

      return this;
    }
    throw Error("Unexpected argument type");
  }

  subtract(v: Vector): Vector;
  subtract(x: number, y: number): Vector;
  subtract(vOrX: Vector | number, y?: number) {
    if (vOrX instanceof Vector) {
      this.x -= vOrX.x;
      this.y -= vOrX.y;

      return this;
    }
    if (typeof vOrX === "number" && typeof y === "number") {
      this.x -= vOrX;
      this.y -= y;

      return this;
    }
    throw Error("Unexpected argument type");
  }

  multiply(v: Vector): Vector;
  multiply(x: number): Vector;
  multiply(vOrX: Vector | number) {
    if (vOrX instanceof Vector) {
      this.x *= vOrX.x;
      this.y = this.x * vOrX.y;

      return this;
    }
    if (typeof vOrX === "number") {
      this.x *= vOrX;
      this.y *= vOrX;

      return this;
    }
    throw Error("Unexpected argument type");
  }

  divide(v: Vector): Vector;
  divide(x: number): Vector;
  divide(vOrX: Vector | number) {
    if (vOrX instanceof Vector) {
      this.x /= vOrX.x;
      this.y = this.x / vOrX.y;

      return this;
    }
    if (typeof vOrX === "number") {
      this.x /= vOrX;
      this.y /= vOrX;

      return this;
    }
    throw Error("Unexpected argument type");
  }

  copy(v: Vector) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: Vector) {
    return this.x * v.y - this.y * v.x;
  }

  setLength(length: number) {
    return this.normalize().multiply(length);
  }

  public normalize() {
    return this.divide(this.length || 1);
  }

  public rotate(rad: number) {
    const angle = Math.atan(this.y / this.x);

    this.x = Math.cos(angle + rad) * this.length;
    this.y = Math.sin(angle + rad) * this.length;

    return this;
  }

  public round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
  }
}

export default Vector;
