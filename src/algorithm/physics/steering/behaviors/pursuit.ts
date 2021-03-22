import Point from "../../../../basics/Point";
import Vector from "../../../../basics/Vector";
import GLOBAL from "../../../../constants/global";
import seek from "./seek";

const pursuit = (
  mobPos: Point,
  targetPos: Point,
  targetMotion: Vector,
  lastVelocity?: Vector
) => {
  const distance = targetPos.distance(mobPos) / GLOBAL.UNIT_LENGTH;
  const t = Math.min(distance, 5);
  const predictPos = targetPos.clone().add(targetMotion.clone().multiply(t));

  return seek(mobPos, predictPos, lastVelocity);
};

export default pursuit;
