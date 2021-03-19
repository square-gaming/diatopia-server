import EVENT from "../../../constants/event";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import Entity from "../Entity";

abstract class Mob extends Entity {
  mass: number;
  health: number;
  attributes: any[];

  targetPos?: Point;
  targetMotion?: Vector;

  constructor(
    name: string,
    pos: Point,
    mass: number,
    health: number,
    attributes: any[]
  ) {
    super(name, pos);
    this.mass = mass;
    this.health = health;
    this.attributes = attributes;
  }

  public updateTarget(pos: Point, motion: Vector) {
    this.targetPos = pos;
    this.targetMotion = motion;
    // console.log(`setPlayer: ${JSON.stringify(pos)} / ${JSON.stringify(motion)}`);
  }

  protected move(vec: Vector) {
    this.pos.add(vec);
    this.emit(EVENT.MOB.MOVE, this);
  }

  public onMove(listener: (mob: Mob) => void) {
    this.on(EVENT.MOB.MOVE, listener);
  }
}

export default Mob;
