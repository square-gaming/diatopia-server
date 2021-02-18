import Point from '../../basics/Point';
import Vector from '../../basics/Vector';
import {UndergroundInterface} from '../../types/models';
import Time from '../Time';
import Level from './Level';

class Underground extends Level implements UndergroundInterface {
  constructor(time: Time) {
    const spawnPos = new Point(100, 100);
    super(time, 11, spawnPos, [], [], new Vector(2000, 2000));
  }
}

export default Underground;
