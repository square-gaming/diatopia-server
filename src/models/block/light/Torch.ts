import Point from '../../../basics/Point';
import Light from './Light';

class Torch extends Light {
  constructor(pos: Point) {
    super('Torch', pos, 14);
  }
}

export default Torch;
