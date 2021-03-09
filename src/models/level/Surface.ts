import type { SurfaceInterface } from "../../types/models";
import Level from "./Level";
import { generateBlocks } from "../../utils";
import Point from "../../basics/Point";
import GLOBAL from "../../constants/global";
import EVENT from "../../constants/event";
import {
  patternReconfigure,
  configureRule,
} from "../../algorithm/patternReconfiguration";
import Mob from "../entity/mobs/Mob";
import Cow from "../entity/mobs/Cow";
import Sheep from "../entity/mobs/Sheep";
import Time from "../Time";


class Surface extends Level implements SurfaceInterface {
  constructor(time: Time) {
    super(time);
  }

  public onDaylightCycle(listener: (lightLevel: number) => void) {
    this.on(EVENT.SURFACE.DAYLIGHT_CYCLE, listener);
  }

  public onMobMove(listener: (mob: Mob) => void) {
    this.on(EVENT.SURFACE.MOB.MOVE, listener);
  }

  protected create() {
    super.create();

    const entites = [new Cow(new Point(500, 500)), new Sheep(new Point(500, 500))];
    entites.forEach((entity) => {
      entity.onMove((mob) => {
        this.emit(EVENT.SURFACE.MOB.MOVE, mob);
      });
    });
    this.lightLevel = 11;
    this.blocks = patternReconfigure(
      generateBlocks(20, 20, GLOBAL.UNIT_LENGTH),
      configureRule
    );
    this.entities = entites;
    this.spawnPos = new Point(200, 200);
  }

  protected update() {
    super.update();

    if (this.lastTime % 160 === 0) {
      this.updateLight();
    }
  }

  private updateLight() {
    if (this.time.dayTime >= 22800 || this.time.dayTime < 1200) {
      this.lightLevel += 1;
      this.emit(EVENT.SURFACE.DAYLIGHT_CYCLE, this.lightLevel);
    } else if (this.time.dayTime >= 10800 && this.time.dayTime < 13200) {
      this.lightLevel -= 1;
      this.emit(EVENT.SURFACE.DAYLIGHT_CYCLE, this.lightLevel);
    }
  }
}

export default Surface;
