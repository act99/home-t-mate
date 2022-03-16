import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LEAVE_SESSION_FUNC = "LEAVE_SESSION_FUNC";
const BRING_MY_SESSIONID = "BRING_MY_SESSIONID";

const leaveSessionFunc = createAction(LEAVE_SESSION_FUNC, (leaveSession) => ({
  leaveSession,
}));

const bringMySessionId = createAction(BRING_MY_SESSIONID, (mySessionId) => ({
  mySessionId,
}));

// initialState
export const initialState = {
  leaveSession: null,
  mySessionId: null,
};

export default handleActions(
  {
    [LEAVE_SESSION_FUNC]: (state, action) =>
      produce(state, (draft) => {
        draft.leaveSession = action.payload.leaveSession;
      }),
    [BRING_MY_SESSIONID]: (state, action) =>
      produce(state, (draft) => {
        draft.mySessionId = action.payload.mySessionId;
      }),
  },
  initialState
);

const actionCreators = {
  leaveSessionFunc,
  bringMySessionId,
};

export { actionCreators };
