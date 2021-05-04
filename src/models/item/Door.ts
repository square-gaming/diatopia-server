import Item from "./Item";

class Door extends Item {
  constructor(count: number, slot?: number) {
    super("diatopia:door", count, slot);
  }
}

export default Door;
