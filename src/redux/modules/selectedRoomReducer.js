import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_ROOM = "SET_ROOM";

const setRoom = createAction(SET_ROOM, (room) => ({ room }));

// initialState
export const initialState = {
  room: null,
};

export default handleActions(
  {
    [SET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.room;
      }),
  },
  initialState
);

const actionCreators = {
  setRoom,
};

export { actionCreators };
