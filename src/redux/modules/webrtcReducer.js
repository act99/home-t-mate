import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_RTC = "SET_RTC";
const LEAVE_RTC = "LEAVE_RTC";

const setRtc = createAction(SET_RTC, (rtc) => ({ rtc }));
const leaveRtc = createAction(LEAVE_RTC, (rtc) => ({ rtc }));

export const initialState = {
  mySessionId: "SessionA",
  myUserName: "Participant" + Math.floor(Math.random() * 100),
  session: undefined,
  mainStreamManager: undefined,
  publisher: undefined,
  subscribers: [],
};

export default handleActions(
  {
    [SET_RTC]: (state, action) =>
      produce(state, (draft) => {
        draft = { ...draft, ...action.payload.rtc };
      }),
    [LEAVE_RTC]: (state, action) =>
      produce(state, (draft) => {
        draft = { ...draft, ...action.payload.rtc };
      }),
  },
  initialState
);

const actionCreators = {
  setRtc,
  leaveRtc,
};

export { actionCreators };
