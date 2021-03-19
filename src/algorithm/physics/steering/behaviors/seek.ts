import Point from "../../../../basics/Point";
import Vector from "../../../../basics/Vector";
import { getRandom } from "../../../../utils";

interface Options {
  circleRadius?: number;
  circleDistance?: number;
}

const seek = (mobPos: Point, targetPos: Point, lastVelocity?: Vector) => {

  const velocity = new Vector(targetPos.x - mobPos.x, 
    targetPos.y - mobPos.y)

  var seekForce = velocity
  if (lastVelocity) {
    seekForce = velocity.add(lastVelocity)
  }
  return seekForce;
};

export default seek;
