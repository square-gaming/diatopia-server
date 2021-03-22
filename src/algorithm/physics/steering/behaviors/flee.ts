import Point from "../../../../basics/Point";
import Vector from "../../../../basics/Vector";

const flee = (mobPos: Point, targetPos: Point, lastVelocity?: Vector) => {
  const velocity = new Vector(targetPos.x - mobPos.x, targetPos.y - mobPos.y);

  let fleeForce = velocity;
  if (lastVelocity) {
    fleeForce = lastVelocity.subtract(velocity);
  }
  return fleeForce;
};

export default flee;
