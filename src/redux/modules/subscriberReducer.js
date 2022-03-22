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
        if (Array.isArray(action.payload.subscriber)) {
          draft.subscribers = [...action.payload.subscriber];
        } else if (typeof action.payload.subscriber === "object") {
          const check = draft.subscribers.filter(
            (item) =>
              item.nickname ===
              action.payload.subscriber.message.split("님이")[0]
          );
          if (check.length <= 0) {
            draft.subscribers.push({
              nickname: action.payload.subscriber.message.split("님이")[0],
              profileImg: action.payload.subscriber.profileImg,
            });
          }
        }
      }),
    [LEAVE_SUBSCRIBERS]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        // let dummyIndex = draft.subscribers.findIndex(
        //   (item) => item === action.payload
        // );
        // draft.subscribers.splice(dummyIndex, 1);
      }),
  },
  initialState
);

const actionCreators = {
  getSubscribers,
  leaveSubscribers,
};

export { actionCreators };
