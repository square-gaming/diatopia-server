import Point from "./basics/Point";
import Player from "./models/Player";
import type { Dimension, Action } from "./types";
import World from "./models/World";
import DIMENSION from "./constants/dimension";
import EVENT from "./constants/event";
import action from "./constants/action";
import Mob from "./models/entity/mobs/Mob";

class Manager {
  world: World;

  actions: Action[];

  constructor() {
    this.world = new World();
    this.actions = [];
    this.initialize();
  }

  private initialize() {
    this.world.surface.onDaylightCycle((lightLevel: number) => {
      this.actions.push(action.level.update.lightLevel(lightLevel));
    });
    this.world.onPlayersMove((player: Player) => { 

      this.world.surface.updateTargetPos(player.pos)
      this.actions.push(action.players.move(player));
    });
    this.world.surface.onMobMove((mob: Mob) => {


      console.log(mob)
      this.actions.push(action.entity.mob.move(mob));
    });
  }

  public transfer(): Action[] {
    return this.actions.splice(0, this.actions.length);
  }

  public getAllPlayers(): Player[] {
    return Array.from(this.world.players, ([, player]) => player);
  }

  public getPlayer(uid: string): Player {
    const player = this.world.players.get(uid);

    if (player) {
      return player;
    }
    throw Error(`Player ${uid} could NOT be found.`);
  }

  public addPlayer(uid: string, name: string): Promise<Player> {
    return new Promise((resolve, reject) => {
      try {
        const player = this.world.players
          .set(
            uid,
            new Player(
              uid,
              name,
              { ...this.world.surface.spawnPos },
              { ...this.world.surface.spawnPos }
            )
          )
          .get(uid);

        this.world.emit(EVENT.WORLD.PLAYERS.JOIN, player);
        resolve(player as Player);
      } catch (error) {
        reject(error);
      }
    });
  }

  public removePlayer(uid: string) {
    const player = this.world.players.get(uid);

    if (player) {
      player.destroy();
      this.world.players.delete(uid);
    } else {
      console.error(`Player ${uid} doesn't exist, which cannot be deleted`);
    }
  }

  public getBlocks(dimension: Dimension, pos: Point) {
    switch (dimension) {
      case DIMENSION.SURFACE:
        return this.world.surface.getBlocks(pos);
      case DIMENSION.UNDERGROUND:
        return this.world.underground.getBlocks(pos);
      default:
        throw Error("Unexpected dimension constant.");
    }
  }
}

export default Manager;
