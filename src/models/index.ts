import Entity from './entity/Entity';
import Floor from './block/Floor';
import Player from './Player';
import Structure from './block/structure/Structure';
import Door from './block/structure/Door';
import Wall from './block/structure/Wall';

const constructors = {
  Floor: Floor,
  Entity: Entity,
  Player: Player,
  Structure: Structure,
  Door: Door,
  Wall: Wall,
};

export default constructors;
