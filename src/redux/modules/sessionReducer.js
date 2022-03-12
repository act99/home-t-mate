import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const LEAVE_SESSION = "LEAVE_SESSION";

const leaveSession = createAction(LEAVE_SESSION, (session) => ({ session }));

// initialState
export const initialState = {
  session: null,
};

export default handleActions(
  {
    [LEAVE_SESSION]: (state, action) =>
      produce(state, (draft) => {
        draft.session = action.payload.session;
      }),
  },
  initialState
);

const actionCreators = {
  leaveSession,
};

export { actionCreators };
