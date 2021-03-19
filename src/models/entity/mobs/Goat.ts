import wander from "../../../algorithm/physics/steering/behaviors/wander";
import flee from "../../../algorithm/physics/steering/behaviors/flee";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import Mob from "./Mob";

class Goat extends Mob {
  constructor(pos: Point) {
    super("Goat", pos, 10, 10, []);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      if (this.targetPos) {
        this.flee();
      } else {
        this.wander();
      }
    }
  }

  private flee() {
    if (this.targetPos) {
      this.motion = flee(this.pos, this.targetPos!, this.motion).divide(
        this.mass
      );

      if (!this.motion.isZero()) {
        this.move(this.motion.round());
      }
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

export default Goat;
