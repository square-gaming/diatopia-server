import wander from "../../../algorithm/physics/steering/behaviors/wander";
import seek from "../../../algorithm/physics/steering/behaviors/seek";
import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Mob from "./Mob";

class Cow extends Mob {
  targetPos?: Point;
  constructor(pos: Point) {
    super("Cow", pos, 10, 10, []);
  }

  updateTargetPos(pos: Point) {
    this.targetPos = pos;
    console.log(`setPlayerPos: ${JSON.stringify(pos)}`);
  }

  protected update() {
    super.update();

    if (this.lastTime % GLOBAL.TICK_PERIOD === 0) {
      if (this.targetPos) {
        this.seek();
      } else {
        this.wander();
      }
    }
  }

  private seek() {
    if (this.targetPos) {
      this.motion = seek(this.pos, this.targetPos!, this.motion).divide(this.mass);
      
      if (!this.motion.isZero()) {
        console.log(`seek: ${JSON.stringify(this.motion)}`);
        this.move(this.motion.round());
      }
    }
  }

  private wander() {
    this.motion = wander(this.motion).divide(this.mass);

    if (!this.motion.isZero()) {
      console.log(`wander: ${JSON.stringify(this.motion)}`);
      this.move(this.motion.round());
    }
  }
}

export default Cow;
