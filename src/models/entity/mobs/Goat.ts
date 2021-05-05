import GLOBAL from "../../../constants/global";
import Point from "../../../basics/Point";
import Mob from "./Mob";

class Goat extends Mob {
  constructor(pos: Point) {
    super("diatopia:goat", pos, 10, 10, []);
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
}

export default Goat;
