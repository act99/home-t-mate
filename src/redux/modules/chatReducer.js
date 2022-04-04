import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import moment from "moment";

// actions
const GET_CHAT = "GET_CHAT";
const SEND_CHAT = "SEND_CHAT";
// action creators

const getChat = createAction(GET_CHAT, (chat) => ({ chat }));

// initialState
export const initialState = {
  list: [],
};
// middleware actions

export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        const nowaTime = moment().format("hh:mm");
        draft.list.push({ ...action.payload.chat, time: nowaTime });
      }),
    [SEND_CHAT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.chat);
      }),
  },
  initialState
);

const actionCreators = {
  getChat,
};

export { actionCreators };
