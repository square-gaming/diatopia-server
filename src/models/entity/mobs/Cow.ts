import wander from "../../../algorithm/physics/steering/behaviors/wander";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import Mob from "./Mob";

class Cow extends Mob {
  constructor(pos: Point) {
    super("Cow", pos, 10, 10, []);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      this.wander();
    }
  }

  private wander() {
    const velocity = new Vector(
      Math.cos(this.rotation),
      -Math.sin(this.rotation)
    ).multiply(this.speed);
    const step = wander(velocity).divide(this.mass).round();

    this.rotation = Math.atan2(-step.y, step.x);
    this.speed = step.length;

    if (this.speed > 0) {
      this.move(step);
    }
  }
}

export default Cow;
