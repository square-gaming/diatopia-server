import Entity from "./entity/Entity";
import Point from "../basics/Point";
import type { AbilitiesInfo, Coordinate } from "../types/models";
import type { Dimension } from "../types";
import DIMENSION from "../constants/dimension";
import EVENT from "../constants/event";
import Vector from "../basics/Vector";
import GLOBAL from "../constants/global";

class Player extends Entity {
  spawnPos: Point;
  dimension: Dimension;
  abilities: AbilitiesInfo;
  isMotion: boolean;

  constructor(
    id: string,
    nickName: string,
    pos: Point | Coordinate,
    spawnPos: Point | Coordinate,
    dimension: Dimension = DIMENSION.SURFACE
  ) {
    super(
      "Player",
      pos,
      new Vector(GLOBAL.UNIT_LENGTH, GLOBAL.UNIT_LENGTH),
      id,
      nickName
    );
    this.spawnPos = spawnPos instanceof Point ? spawnPos : new Point(spawnPos);
    this.dimension = dimension;
    this.abilities = {
      acceleration: 4,
      speed: 16,
    };
    this.isMotion = false;
  }

  protected update() {
    super.update();
    if (this.isMotion) {
      this.accelerate();
    } else if (!this.motion.isZero()) {
      this.brake();
    }
    if (!this.motion.isZero()) {
      this.move(this.motion.round());
    }
  }

  public brake() {
    const vec = this.motion
      .clone()
      .normalize()
      .multiply(this.abilities.acceleration);

    if (
      Vector.isEqual(
        this.motion.clone().subtract(vec).normalize().round(),
        this.motion.clone().normalize().round()
      )
    ) {
      this.motion.subtract(vec);
    } else {
      this.motion = new Vector();
      this.move(new Vector());
    }
  }

  public accelerate() {
    const unit = new Vector(Math.cos(this.rotation), -Math.sin(this.rotation));

    if (
      this.motion
        .clone()
        .add(unit.clone().multiply(this.abilities.acceleration)).length >
      this.abilities.speed
    ) {
      this.motion = unit.multiply(this.abilities.speed);
    } else {
      this.motion.add(unit.clone().multiply(this.abilities.acceleration));
    }
  }

  public onMove(listener: (player: Player) => void) {
    this.on(EVENT.PLAYER.MOVE, listener);
  }

  private move(vec: Vector) {
    this.pos.add(vec);
    this.emit(EVENT.PLAYER.MOVE, this);
  }
}

export default Player;
