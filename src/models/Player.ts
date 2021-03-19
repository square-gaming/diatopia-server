import Entity from "./entity/Entity";
import Point from "../basics/Point";
import type { AbilitiesInfo, Coordinate } from "../types/models";
import type { Dimension } from "../types";
import DIMENSION from "../constants/dimension";
import EVENT from "../constants/event";
import Vector from "../basics/Vector";

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
    super("Player", pos, new Vector(100, 100), id, nickName);
    this.spawnPos = spawnPos instanceof Point ? spawnPos : new Point(spawnPos);
    this.dimension = dimension;
    this.abilities = {
      acceleration: 2,
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
    const unit = new Vector(Math.cos(this.rotation), -Math.sin(this.rotation));

    if (
      Vector.isEqual(
        this.motion
          .clone()
          .subtract(unit.clone().multiply(this.abilities.acceleration))
          .normalize()
          .round(),
        unit.clone().round()
      )
    ) {
      this.motion.subtract(unit.multiply(this.abilities.acceleration));
    } else {
      this.motion = new Vector();
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
