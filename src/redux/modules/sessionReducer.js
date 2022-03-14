import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LEAVE_SESSION_FUNC = "LEAVE_SESSION_FUNC";

const leaveSessionFunc = createAction(LEAVE_SESSION_FUNC, (leaveSession) => ({
  leaveSession,
}));

// initialState
export const initialState = {
  leaveSession: null,
};

export default handleActions(
  {
    [LEAVE_SESSION_FUNC]: (state, action) =>
      produce(state, (draft) => {
        draft.leaveSession = action.payload.leaveSession;
      }),
  },
  initialState
);

const actionCreators = {
  leaveSessionFunc,
};

export { actionCreators };
