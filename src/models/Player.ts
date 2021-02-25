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
    } else {
      this.brake();
    }
    if (this.speed > 0) {
      const step = new Vector(Math.cos(this.rotation), -Math.sin(this.rotation))
        .multiply(this.speed)
        .round();

      this.move(step);
    }
  }

  public brake() {
    this.speed -= this.abilities.acceleration;
    if (this.speed < 0) {
      this.speed = 0;
      this.isMotion = false;
    }
  }

  public accelerate() {
    this.speed += this.abilities.acceleration;
    if (this.speed > this.abilities.speed) {
      this.speed = this.abilities.speed;
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
