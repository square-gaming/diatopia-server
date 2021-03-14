import ACTION_TYPE from "./actionType";
import Player from "../models/Player";
import type { StructuresType } from "../types";
import Mob from "../models/entity/mobs/Mob";

const action = {
  level: {
    update: {
      lightLevel: (lightLevel: number) => ({
        type: ACTION_TYPE.LEVEL.UPDATE.LIGHTLEVEL,
        payload: lightLevel,
      }),
      structure: (target: StructuresType) => ({
        type: ACTION_TYPE.LEVEL.UPDATE.STRUCTURE,
        payload: target,
      }),
    },
  },
  entity: {
    mob: {
      move: (mob: Mob) => ({
        type: ACTION_TYPE.ENTITY.MOB.MOVE,
        payload: mob,
      }),
    },
  },
  players: {
    join: (player: Player) => ({
      type: ACTION_TYPE.PLAYERS.JOIN,
      payload: player,
    }),
    move: (player: Player) => ({
      type: ACTION_TYPE.PLAYERS.MOVE,
      payload: {
        uid: player.id,
        pos: player.pos,
        motion: player.motion,
        rotation: player.rotation,
        isMotion: player.isMotion,
      },
    }),
    leave: (uid: string) => ({
      type: ACTION_TYPE.PLAYERS.LEAVE,
      payload: uid,
    }),
  },
};

export default action;
