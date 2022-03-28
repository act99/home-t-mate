import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import { apis } from "../../shared/api";
import { actionCreators as postActions } from "./postReducer";
//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//action create function
const setComment = createAction(SET_COMMENT, (postId, comment_list) => ({
  postId,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({
  postId,
  comment,
}));
const delComment = createAction(DEL_COMMENT, (postId, commentId) => ({
  postId,
  commentId,
}));

// 초기값
const initialState = {
  list: {},
};

// 미들웨어

const getCommentDB = (postId) => {
  return async function (dispatch, getState) {
    apis
      .getComment(postId)
      .then((response) => {
        dispatch(setComment(postId, response.data));
        console.log("getComment res 확인용", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const addCommentDB = (postId, comment, user) => {
  return function (dispatch, getState, { history }) {
    console.log("애드커멘트 유저정보", user);
    apis
      .addComment(postId, comment)
      .then((response) => {
        // https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/static/defalt+user+frofile.png
        let userProfileImg = "";
        if (user.profileImg === null) {
          userProfileImg =
            "https://skifriendbucket.s3.ap-northeast-2.amazonaws.com/static/defalt+user+frofile.png";
        } else {
          userProfileImg = user.profileImg;
        }
        console.log(user);
        const dummyComment = {
          nickname: user.nickname,
          comment: comment,
          profileImg: userProfileImg,
        };
        dispatch(addComment(postId, dummyComment));
      })
      .catch((error) => {
        console.log(error);
        alert("댓글작성을 실패했습니다 :(");
      });
  };
};

const delCommentDB = (postId, commentId) => {
  return function (dispatch, getState, { history }) {
    apis
      .delComment(postId, commentId)
      .then((response) => {
        dispatch(delComment(postId, commentId));
      })
      .catch((error) => {
        console.log(error);
        alert("댓글삭제를 실패했습니다 :(");
      });
  };
};

// 리듀서
export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId].unshift(action.payload.comment);
      }),
    [DEL_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postId] = [
          ...state.list[action.payload.postId].filter(
            (v, i) => v.commentId !== action.payload.commentId
          ),
        ];
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  addCommentDB,
  delCommentDB,
};

export { actionCreators };
