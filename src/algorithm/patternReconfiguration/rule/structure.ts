import {DIRECTION} from '../../../constants/direction';
import Segment from '../../../basics/Segment';
import Vector from '../../../basics/Vector';
import Door from '../../../models/block/structure/Door';
import Wall from '../../../models/block/structure/Wall';
import {StructuresType} from '../../../types';

export const door = (adjacents: StructuresType[], source: Door) => {
  if (
    adjacents[DIRECTION.NORTH] instanceof Wall &&
    adjacents[DIRECTION.SOUTH] instanceof Wall &&
    !adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Door.PATTERNS.EAST_WEST;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] instanceof Wall &&
    adjacents[DIRECTION.EAST] instanceof Wall
  ) {
    source.pattern = Door.PATTERNS.NORTH_SOUTH;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
    ];
  }

  return source;
};

export const wall = (adjacents: StructuresType[], source: Wall) => {
  if (
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.INTERSECTION;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(0, source.height / 2)),
        source.pos.clone().add(new Vector(source.width, source.height / 2))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.INDIVIDUAL;
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.T;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.T_90_DEG;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width / 2, 0))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.T_180_DEG;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.T_270_DEG;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.EAST_WEST;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.NORTH_SOUTH;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.TOP_RIGHT;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width / 2, 0))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.BOTTOM_RIGHT;
    source.frames = [
      new Segment(
        source.pos.clone(),
        source.pos.clone().add(new Vector(source.width / 2, 0))
      ),
    ];
  } else if (
    adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.BOTTOM_LEFT;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
    ];
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Wall.PATTERNS.TOP_LEFT;
    source.frames = [
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width, 0))
      ),
      new Segment(
        source.pos.clone().add(new Vector(source.width / 2, 0)),
        source.pos.clone().add(new Vector(source.width / 2, source.height))
      ),
    ];
  } else {
    source.pattern = Wall.PATTERNS.SURFACE;
  }

  return source;
};
