import EVENT from "../../../constants/event";
import Point from "../../../basics/Point";
import Vector from "../../../basics/Vector";
import Entity from "../Entity";
import wander from "../../../algorithm/physics/steering/behaviors/wander";
import flee from "../../../algorithm/physics/steering/behaviors/flee";
import pursuit from "../../../algorithm/physics/steering/behaviors/pursuit";

abstract class Mob extends Entity {
  mass: number;
  health: number;
  attributes: any[];

  targetPos?: Point;
  targetMotion?: Vector;

  constructor(
    id: string,
    pos: Point,
    mass: number,
    health: number,
    attributes: any[]
  ) {
    super(id, pos);
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

  protected flee() {
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

  protected pursuit() {
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

  protected wander() {
    this.motion = wander(this.motion).divide(this.mass);

    if (!this.motion.isZero()) {
      // console.log(`wander: ${JSON.stringify(this.motion)}`);
      this.move(this.motion.round());
    }
  }

  public onMove(listener: (mob: Mob) => void) {
    this.on(EVENT.MOB.MOVE, listener);
  }
}

export default Mob;
