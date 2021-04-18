import wander from "../../../algorithm/physics/steering/behaviors/wander";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Mob from "./Mob";

class Pig extends Mob {
  constructor(pos: Point) {
    super("Pig", pos, 10, 10, []);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      this.wander();
    }
  }

  protected wander() {
    this.motion = wander(this.motion).divide(this.mass);

    if (!this.motion.isZero()) {
      this.move(this.motion.round());
    }
  }
}

export default Pig;
