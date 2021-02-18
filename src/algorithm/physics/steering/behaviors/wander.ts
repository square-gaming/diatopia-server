import Vector from '../../../../basics/Vector';
import {getRandom} from '../../../../utils';

interface Options {
  circleRadius?: number;
  circleDistance?: number;
}

const wander = (velocity: Vector, options?: Options) => {
  const circleRadius = options?.circleRadius || 100;
  const circleDistance = options?.circleDistance || 100;
  const circleCenter = velocity.clone().normalize().multiply(circleDistance);
  const displacement = Vector.up
    .multiply(circleRadius)
    .rotate(getRandom(-Math.PI, Math.PI));
  const wanderForce = circleCenter.add(displacement);

  return wanderForce;
};

export default wander;
