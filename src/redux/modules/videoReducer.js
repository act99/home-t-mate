import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const SET_VIDEO = "SET_VIDEO";
const GET_VIDEO = "GET_VIDEO";

const setVideo = createAction(SET_VIDEO, (video) => ({ video }));
const getVideo = createAction(GET_VIDEO, (video) => ({ video }));

// initialState
export const initialState = {
  video: { video: true, audio: true },
};

export default handleActions(
  {
    [SET_VIDEO]: (state, action) =>
      produce(state, (draft) => {
        action.payload.video === undefined
          ? (draft.video = { ...draft.video })
          : (draft.video = action.payload.video);
      }),
    [GET_VIDEO]: (state, action) =>
      produce(state, (draft) => {
        draft.video = action.payload.video;
      }),
  },
  initialState
);

const actionCreators = {
  setVideo,
  getVideo,
};

export { actionCreators };
