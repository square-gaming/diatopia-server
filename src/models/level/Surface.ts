import {SurfaceInterface} from '../../types/models';
import Time from '../Time';
import Level from './Level';
import {generateBlocks, generateEntities} from '../../utils';
import Point from '../../basics/Point';
import {GLOBAL} from '../../constants/global';
import EVENT from '../../constants/event';
import {
  PatternReconfigure,
  configureRule,
} from '../../algorithm/patternReconfiguration';
import Mob from '../entity/mobs/Mob';

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

    const entites = generateEntities();
    entites.forEach(entity => {
      entity.onMove(mob => {
        this.emit(EVENT.SURFACE.MOB.MOVE, mob);
      });
    });
    this.lightLevel = 11;
    this.blocks = PatternReconfigure(
      generateBlocks(20, 20, GLOBAL.UNIT_LENGTH),
      configureRule
    );
    this.entities = entites;
    this.spawnPos = new Point(200, 200);
  }

  protected update() {
    super.update();

    if (this.lastTime % 160 === 0) {
      this._updateLight();
    }
  }

  private _updateLight() {
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
