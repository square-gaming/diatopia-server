const PLAYER_JOIN = "playerJoin";
const PLAYER_LEAVE = "playerLeave";
const CLIENT_CONNECT = "clientConnect";

export type PLAYER_JOIN_EVENT = {
  type: typeof PLAYER_JOIN;
  payload: string; // player.uid
};

export type PLAYER_LEAVE_EVENT = {
  type: typeof PLAYER_LEAVE;
  payload: string; // player.uid
};

export type CLIENT_CONNECT_EVENT = {
  type: typeof CLIENT_CONNECT;
  payload: string[]; // player.uids
};

export const events = {
  client: {
    connect: (uids: string[]) => ({
      type: CLIENT_CONNECT,
      payload: uids,
    }),
  },
  player: {
    join: (uid: string): PLAYER_JOIN_EVENT => ({
      type: PLAYER_JOIN,
      payload: uid,
    }),
    leave: (uid: string): PLAYER_LEAVE_EVENT => ({
      type: PLAYER_LEAVE,
      payload: uid,
    }),
  },
};

export const isPlayerJoinEvent = (
  event: unknown
): event is PLAYER_JOIN_EVENT => {
  // @ts-ignore: Object is of type 'unknown'
  return event?.type === PLAYER_JOIN && typeof event?.payload === "string";
};

export const isPlayerLeaveEvent = (
  event: unknown
): event is PLAYER_LEAVE_EVENT => {
  // @ts-ignore: Object is of type 'unknown'
  return event?.type === PLAYER_LEAVE && typeof event?.payload === "string";
};
