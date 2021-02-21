import Structure from "./Structure";
import type { Coordinate, DoorInterface } from "../../../types/models";
import type { Toward } from "../../../types";
import Vector from "../../../basics/Vector";
import { isCollision } from "../../../algorithm/physics/collision";
import Entity from "../../entity/Entity";
import Segment from "../../../basics/Segment";
import Point from "../../../basics/Point";

class Door extends Structure implements DoorInterface {
  static TYPE = {
    WOOD: 0,
    STONE: 1,
  };
  static PATTERNS = {
    NORTH_SOUTH: 0,
    EAST_WEST: 1,
  };

  toward: Toward;
  isOpen: boolean;

  constructor(
    pos: Point | Coordinate,
    type: number,
    toward: Toward,
    isOpen: boolean
  ) {
    super("Door", pos, type, !isOpen);
    this.toward = toward;
    this.isOpen = isOpen;
  }

  public interact(entity: Entity) {
    return new Promise<Door>((resolve, reject) => {
      try {
        if (!isCollision(entity, this)) {
          if (!this.isOpen) {
            this.frames = [];
          } else if (this.toward === Door.PATTERNS.NORTH_SOUTH) {
            this.frames = [
              new Segment(
                this.pos,
                this.pos.clone().add(new Vector(this.width, 0))
              ),
            ];
          } else if (this.toward === Door.PATTERNS.EAST_WEST) {
            this.frames = [
              new Segment(
                this.pos.clone().add(new Vector(this.width / 2, 0)),
                this.pos.clone().add(new Vector(this.width / 2, this.height))
              ),
            ];
          } else {
            throw Error("Unexpected door pattern");
          }
          this.isOpen = !this.isOpen;
          this.isConcrete = !this.isConcrete;
          resolve(this);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default Door;
