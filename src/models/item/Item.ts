abstract class Item {
  count: number;
  slot: number | undefined;
  id: string;

  constructor(id: string, count: number, slot?: number) {
    this.id = id;
    this.count = count;
    this.slot = slot;
  }
}

export default Item;
