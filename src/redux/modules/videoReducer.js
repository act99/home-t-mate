import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_VIDEO = "SET_VIDEO";

const setVideo = createAction(SET_VIDEO, (video) => ({ video }));

// initialState
export const initialState = {
  video: { video: true, audio: true },
};

export default handleActions(
  {
    [SET_VIDEO]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.video);
        draft.video = action.payload.video;
      }),
  },
  initialState
);

const actionCreators = {
  setVideo,
};

export { actionCreators };
