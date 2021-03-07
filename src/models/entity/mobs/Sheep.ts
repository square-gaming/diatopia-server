import wander from "../../../algorithm/physics/steering/behaviors/wander";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import Mob from "./Mob";

class Sheep extends Mob {
  constructor(pos: Point) {
    super("Sheep", pos, 10, 10, []);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      this.wander();
    }
  }

  private wander() {
    this.motion = wander(this.motion).divide(this.mass);

    if (!this.motion.isZero()) {
      this.move(
        new Vector(Math.round(this.motion.x), Math.round(this.motion.y))
      );
    }
  }
}

export default Sheep;
