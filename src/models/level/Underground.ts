import Point from "../../basics/Point";
import Vector from "../../basics/Vector";
import GLOBAL from "../../constants/global";
import type { UndergroundInterface } from "../../types/models";
import Time from "../Time";
import Level from "./Level";

class Underground extends Level implements UndergroundInterface {
  constructor(time: Time) {
    const spawnPos = new Point(1 * GLOBAL.UNIT_LENGTH, 1 * GLOBAL.UNIT_LENGTH);
    super(time, 11, spawnPos, [], [], new Vector(20 * GLOBAL.UNIT_LENGTH, 20 * GLOBAL.UNIT_LENGTH));
  }
}

export default Underground;
