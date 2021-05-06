import Point from "../../basics/Point";
import Block from "../../core/Block";

export function isOverlap(source: Block, target: Block): boolean {
  const collisionX: boolean =
    source.borderPos[1].x >= target.borderPos[0].x &&
    target.borderPos[1].x >= source.borderPos[0].x;
  const collisionY: boolean =
    source.borderPos[1].y >= target.borderPos[0].y &&
    target.borderPos[1].y >= source.borderPos[0].y;

  return collisionX && collisionY;
}

export function isCollision(
  source: Block,
  target: Block,
  shiftPos: Point = new Point(0, 0)
): boolean {
  if (source === target || !target.isConcrete) {
    return false;
  }
  const collisionX: boolean =
    source.borderPos[1].x + shiftPos.x >= target.borderPos[0].x &&
    target.borderPos[1].x >= source.borderPos[0].x + shiftPos.x;
  const collisionY: boolean =
    source.borderPos[1].y + shiftPos.y >= target.borderPos[0].y &&
    target.borderPos[1].y >= source.borderPos[0].y + shiftPos.y;

  return collisionX && collisionY && source.isConcrete && target.isConcrete;
}

export function collisionResponse(source: Block, target: Block) {
  if (isCollision(source, target)) {
    const isSourceRight = target.pos.x < source.pos.x;
    const isSourceBelow = target.pos.y < source.pos.y;
    const collisionXLength = isSourceRight
      ? target.borderPos[1].x - source.borderPos[0].x + 1
      : source.borderPos[1].x - target.borderPos[0].x + 1;
    const collisionYLength = isSourceBelow
      ? target.borderPos[1].y - source.borderPos[0].y + 1
      : source.borderPos[1].y - target.borderPos[0].y + 1;

    // collision does not happen once, first one probably is special case
    if (collisionXLength !== collisionYLength) {
      source.pos = new Point({
        x:
          collisionYLength < collisionXLength
            ? source.pos.x
            : isSourceRight
            ? source.pos.x + collisionXLength
            : source.pos.x - collisionXLength,
        y:
          collisionXLength < collisionYLength
            ? source.pos.y
            : isSourceBelow
            ? source.pos.y + collisionYLength
            : source.pos.y - collisionYLength,
      });
    }
  }
}

export function collisionTest(source: Block, groups: Block[][]) {
  groups.forEach((group) => {
    group.forEach((target) => {
      collisionResponse(source, target);
    });
  });
}
