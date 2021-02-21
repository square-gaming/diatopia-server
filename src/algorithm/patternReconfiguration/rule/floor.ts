import DIRECTION from "../../../constants/direction";
import Floor from "../../../models/block/Floor";

const floor = (adjacents: Floor[], source: Floor) => {
  if (
    !adjacents[DIRECTION.NORTH_EAST] &&
    !adjacents[DIRECTION.SOUTH_EAST] &&
    !adjacents[DIRECTION.SOUTH_WEST] &&
    !adjacents[DIRECTION.NORTH_WEST] &&
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.EAST] &&
    adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST]
  ) {
    source.pattern = Floor.PATTERNS.INTERSECTION;
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.EAST] &&
    !adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST]
  ) {
    source.pattern = Floor.PATTERNS.INDIVIDUAL;
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Floor.PATTERNS.HORIZONTAL.LEFT;
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    !adjacents[DIRECTION.EAST] &&
    adjacents[DIRECTION.WEST]
  ) {
    source.pattern = Floor.PATTERNS.HORIZONTAL.RIGHT;
  } else if (
    !adjacents[DIRECTION.EAST] &&
    !adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH]
  ) {
    source.pattern = Floor.PATTERNS.VERTICAL.TOP;
  } else if (
    !adjacents[DIRECTION.EAST] &&
    !adjacents[DIRECTION.WEST] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.NORTH]
  ) {
    source.pattern = Floor.PATTERNS.VERTICAL.BOTTOM;
  } else if (
    !adjacents[DIRECTION.NORTH] &&
    !adjacents[DIRECTION.SOUTH] &&
    adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.EAST]
  ) {
    source.pattern = Floor.PATTERNS.HORIZONTAL.MIDDLE;
  } else if (
    !adjacents[DIRECTION.EAST] &&
    !adjacents[DIRECTION.WEST] &&
    adjacents[DIRECTION.NORTH] &&
    adjacents[DIRECTION.SOUTH]
  ) {
    source.pattern = Floor.PATTERNS.VERTICAL.MIDDLE;
  } else if (!adjacents[DIRECTION.NORTH] && !adjacents[DIRECTION.EAST]) {
    source.pattern = Floor.PATTERNS.GRID.TOP_RIGHT;
  } else if (!adjacents[DIRECTION.SOUTH] && !adjacents[DIRECTION.EAST]) {
    source.pattern = Floor.PATTERNS.GRID.BOTTOM_RIGHT;
  } else if (!adjacents[DIRECTION.SOUTH] && !adjacents[DIRECTION.WEST]) {
    source.pattern = Floor.PATTERNS.GRID.BOTTOM_LEFT;
  } else if (!adjacents[DIRECTION.NORTH] && !adjacents[DIRECTION.WEST]) {
    source.pattern = Floor.PATTERNS.GRID.TOP_LEFT;
  } else if (!adjacents[DIRECTION.NORTH]) {
    source.pattern = Floor.PATTERNS.GRID.TOP_CENTER;
  } else if (!adjacents[DIRECTION.EAST]) {
    source.pattern = Floor.PATTERNS.GRID.MIDDLE_RIGHT;
  } else if (!adjacents[DIRECTION.SOUTH]) {
    source.pattern = Floor.PATTERNS.GRID.BOTTOM_CENTER;
  } else if (!adjacents[DIRECTION.WEST]) {
    source.pattern = Floor.PATTERNS.GRID.MIDDLE_LEFT;
  } else {
    source.pattern = Floor.PATTERNS.GRID.MIDDLE_CENTER;
  }

  return source;
};

export default floor;
