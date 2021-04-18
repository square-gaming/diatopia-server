import Surface from "./level/Surface";
import Underground from "./level/Underground";
import Player from "./Player";
import Time from "./Time";
import { collisionTest } from "../algorithm/physics/collision";
import EVENT from "../constants/event";
import Element from "../core/Element";
import DIMENSION from "../constants/dimension";

class World extends Element {
  levels: [Surface, Underground];
  players: Map<string, Player>;
  time: Time;

  constructor() {
    super();
    const time = new Time();

    this.levels = [new Surface(time), new Underground(time)];
    this.players = new Map<string, Player>();
    this.time = time;
  }

  public get surface(): Surface {
    return this.levels[DIMENSION.SURFACE];
  }

  public get underground(): Underground {
    return this.levels[DIMENSION.UNDERGROUND];
  }

  public onPlayersMove(listener: (player: Player) => void) {
    this.on(EVENT.WORLD.PLAYERS.MOVE, listener);
  }

  public onPlayersJoin(listener: (player: Player) => void) {
    this.on(EVENT.WORLD.PLAYERS.JOIN, listener);
  }

  protected create() {
    this.surface.onMobMove((mob) => {
      // TODO: remove console time, it is for performance testing
      console.time("surfaceMoveTime");
      collisionTest(
        mob,
        this.surface.spatialHashGrid
          ? [this.surface.spatialHashGrid.findNear(mob.pos, mob.aspect)]
          : [
              this.surface.blocks,
              this.surface.entities,
              Array.from(this.players.values()).filter(
                (player) => player.dimension === DIMENSION.SURFACE
              ),
            ]
      );
      console.timeEnd("surfaceMoveTime");
    });
    this.onPlayersJoin((player) => {
      player.onMove(() => {
        // TODO: remove console time, it is for performance testing
        console.time("playerMoveTime");
        this.levels[player.layer].spatialHashGrid?.updateClient(player);
        collisionTest(
          player,
          this.surface.spatialHashGrid
            ? [this.surface.spatialHashGrid.findNear(player.pos, player.aspect)]
            : [
                this.levels[player.dimension].blocks,
                this.levels[player.dimension].entities,
                Array.from(this.players.values()).filter(
                  (player) => player.dimension === DIMENSION.SURFACE
                ),
              ]
        );
        console.timeEnd("playerMoveTime");
        this.emit(EVENT.WORLD.PLAYERS.MOVE, player);
      });
    });
  }
}

export default World;
