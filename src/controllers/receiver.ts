import WebSocket from "ws";
import ACTION_TYPE from "../constants/actionType";
import Manager from "../Manager";
import Point from "../basics/Point";
import action from "../constants/action";

const MessageHandle: {
  [actionType: string]: (
    uid: string,
    data: any,
    manager: Manager,
    sender: WebSocket
  ) => void;
} = {
  [ACTION_TYPE.PLAYER.JOIN](
    uid: string,
    data: any,
    manager: Manager,
    sender: WebSocket
  ) {
    manager.addPlayer(uid, data.payload.username).then((player) => {
      manager.actions.push(action.players.join(player));
      sender.send(
        JSON.stringify([
          {
            type: ACTION_TYPE.LEVEL.INIT,
            payload: manager.world.surface,
          },
          {
            type: ACTION_TYPE.PLAYERS.INIT,
            payload: manager.getAllPlayers(),
          },
          {
            type: ACTION_TYPE.PLAYER.INIT,
            payload: uid,
          },
        ])
      );
    });
  },
  [ACTION_TYPE.PLAYER.MOVE](uid: string, data: any, manager: Manager) {
    const source = manager.getPlayer(uid);

    source.accelerate(data.payload.dir, data.payload.motion);
  },
  [ACTION_TYPE.PLAYER.INTERACT](uid: string, data: any, manager: Manager) {
    // Search the structure in front first -- Otherwise adjacent structures.
    const source = manager.getPlayer(uid);
    const ambientTargets = source.adjacentPos
      .sort((a, b) =>
        Point.isEqual(a, source.facingPos) ? -1 : b === source.facingPos ? 1 : 0
      )
      .map((pos) => manager.getBlocks(source.dimension, pos));

    for (const targets of ambientTargets) {
      for (const target of targets) {
        if (target && "interact" in target) {
          target
            .interact(source)
            .then(() =>
              manager.actions.push(action.level.update.structure(target))
            )
            .catch((error) => console.log(error));
          break;
        }
      }
    }
  },
};

export default MessageHandle;
