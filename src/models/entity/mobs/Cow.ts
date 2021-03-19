import wander from "../../../algorithm/physics/steering/behaviors/wander";
import seek from "../../../algorithm/physics/steering/behaviors/seek";
import flee from "../../../algorithm/physics/steering/behaviors/flee";
import pursuit from "../../../algorithm/physics/steering/behaviors/pursuit";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Mob from "./Mob";

class Cow extends Mob {
  constructor(pos: Point) {
    super("Cow", pos, 10, 10, []);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      if (this.targetPos) {
        this.pursuit();
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
        // console.log(`flee: ${JSON.stringify(this.motion)}`);
        this.move(this.motion.round());
      }
    }
  }

  private pursuit() {
    if (this.targetPos && this.targetMotion) {
      this.motion = pursuit(
        this.pos,
        this.targetPos!,
        this.targetMotion!,
        this.motion
      ).divide(this.mass);

      if (!this.motion.isZero()) {
        // console.log(`pursuit: ${JSON.stringify(this.motion)}`);
        this.move(this.motion.round());
      }
    }
  }

  private wander() {
    this.motion = wander(this.motion).divide(this.mass);

    if (!this.motion.isZero()) {
      // console.log(`wander: ${JSON.stringify(this.motion)}`);
      this.move(this.motion.round());
    }
  }
}

export default Cow;
