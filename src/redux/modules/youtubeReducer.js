import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const YOUTUBE_ON = "SET_VIDEO";
const YOUTUBE_PAUSE = "YOUTUBE_PAUSE";
const YOUTUBE_URL = "YOUTUBE_URL";

const youtubeOn = createAction(YOUTUBE_ON, (on) => ({ on }));
const youtubePause = createAction(YOUTUBE_PAUSE, (pause) => ({ pause }));
const youtubeUrl = createAction(YOUTUBE_URL, (url) => ({ url }));

// initialState
export const initialState = {
  youtube: {
    on: false,
    pause: false,
    url: "",
  },
};

export default handleActions(
  {
    [YOUTUBE_ON]: (state, action) =>
      produce(state, (draft) => {
        draft.youtube.on = action.payload.on;
      }),
    [YOUTUBE_PAUSE]: (state, action) =>
      produce(state, (draft) => {
        draft.youtube.pause = action.payload.pause;
      }),
    [YOUTUBE_URL]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.youtube.url = action.payload.url;
      }),
  },
  initialState
);

const actionCreators = {
  youtubeOn,
  youtubePause,
  youtubeUrl,
};

export { actionCreators };
