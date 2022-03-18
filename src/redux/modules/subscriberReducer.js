import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { apis } from "../../shared/api";
// import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
// actions
const GET_SUBSCRIBERS = "GET_SUBSCRIBERS";
const LEAVE_SUBSCRIBERS = "LEAVE_SUBSCRIBERS";
// action creators

const getSubscribers = createAction(GET_SUBSCRIBERS, (subscriber) => ({
  subscriber,
}));
const leaveSubscribers = createAction(LEAVE_SUBSCRIBERS, (subscriber) => ({
  subscriber,
}));

// initialState
export const initialState = {
  subscribers: [],
};
// middleware actions

export default handleActions(
  {
    [GET_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.subscribers.push(
          action.payload.subscriber.message.split("님")[0]
        );
      }),
    [LEAVE_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        let dummyIndex = draft.subscribers.findIndex(
          (item) => item === action.payload
        );
        draft.subscribers.splice(dummyIndex, 1);
      }),
  },
  initialState
);

const actionCreators = {
  getSubscribers,
  leaveSubscribers,
};

export { actionCreators };
