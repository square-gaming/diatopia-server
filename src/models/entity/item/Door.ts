import Item from "./Item";
import DoorItem from "../../item/Door";
import Point from "../../../basics/Point";
import { Coordinate } from "../../../types/models";

class Door extends Item {
  item: DoorItem;

  constructor(pos: Point | Coordinate) {
    super("diatopia:item", pos);
    this.item = new DoorItem(1);
  }
}

export default Door;
