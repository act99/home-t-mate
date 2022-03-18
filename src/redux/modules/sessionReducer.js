import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const BRING_SESSION = "BRING_SESSION";

const bringSession = createAction(BRING_SESSION, (session) => ({
  session,
}));

// initialState
export const initialState = {
  session: {},
};

export default handleActions(
  {
    [BRING_SESSION]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.session = { ...action.payload.session };
      }),
  },
  initialState
);

const actionCreators = {
  bringSession,
};

export { actionCreators };
