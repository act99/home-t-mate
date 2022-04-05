import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";
import { imageApis } from "../../shared/formApi";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";
const LOADING = "LOADING";
const PAGING = "PAGING";
const NEXT = "NEXT";
const SET_MY_POST = "SET_MY_POST";

const setPost = createAction(SET_POST, (list) => ({ list }));
const like = createAction(LIKE_POST, (postId, userId, nickname) => ({
  postId,
  userId,
  nickname,
}));
const setMyPost = createAction(SET_MY_POST, (list) => ({ list }));
const next = createAction(NEXT, (next) => ({ next }));
const paging = createAction(PAGING, (paging) => ({ paging }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));

const initialState = {
  list: [],
  is_loading: false,
  next: true,
  paging: 1,
};

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(loading(true));
    const postList = getState().postReducer.list;
    if (postList.length === 0) {
      dispatch(paging(1));
    }
    const page = getState().postReducer.paging;
    apis
      .getPost(page, 5)
      .then((res) => {
        if (res.data.length === 0) {
          dispatch(next(false));
        } else {
          dispatch(next(true));
        }
        dispatch(setPost(res.data));
      })
      .catch((error) => console.log(error.response.data));
  };
};

const getMyPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getMyPost()
      .then((res) => {
        dispatch(setMyPost(res.data));
        console.log(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };
};

const addPostDB = (postData) => {
  return async function (dispatch, getState) {
    imageApis
      .addPost(postData)
      .then((res) => {
        const content = { ...res.data, commentUserDto: [], likeUserDto: [] };
        dispatch(addPost(content));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

const editPostDB = (postId, content) => {
  return function (dispatch, getState, { history }) {
    console.log(postId, content);
    imageApis
      .editPost(postId, content)
      .then((res) => {
        history.replace("/story");
        history.go(0);
      })
      .catch((error) => {
        alert("게시글 수정에 실패했습니다 :(");
        console.log(error);
      });
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deletePost(postId)
      .then((res) => {
        dispatch(deletePost(postId));
        alert("게시글이 삭제되었습니다.");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글 삭제를 실패했습니다 :(");
      });
  };
};

const likePostDB = (postId, userId, nickname) => {
  return async function (dispatch, getState) {
    apis
      .likePost(postId)
      .then((res) => {
        dispatch(like(postId, userId, nickname));
      })
      .catch((error) => {
        console.log(error);
        alert("좋아요를 실패했습니다 :(");
      });
  };
};

const deleteManyPostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log(postId);
    console.log("삭제하기 콘솔", postId);
    apis
      .deleteManyPost({ postId: postId })
      .then((res) => {
        console.log({ postId: postId });
        // dispatch(deletePost(postId));
        alert("게시글이 삭제되었습니다.");
        // history.replace("/story");
      })
      .catch((error) => {
        console.log({ postId: postId });
        console.log(error.response.data);
        alert("게시글 삭제를 실패했습니다 :(");
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        const result = action.payload.list.filter(
          (item) => !draft.list.find((v) => item.id === v.id)
        );
        draft.list = [...draft.list, ...result];
        draft.is_loading = false;
        draft.paging = draft.paging + 1;
      }),

    [LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.findIndex(
          (item) => item.id === action.payload.postId
        );

        let is_include = false;
        draft.list[index].likeUserDto.map((item, index) =>
          item.userId === action.payload.userId
            ? (is_include = true)
            : (is_include = false)
        );
        const userIndex = draft.list[index].likeUserDto.findIndex(
          (item) => item.userId === action.payload.userId
        );
        if (is_include) {
          draft.list[index].likeUserDto.splice(userIndex, 1);
          draft.list[index].likeCount -= 1;
        } else {
          draft.list[index].likeUserDto.push({
            userId: action.payload.userId,
            nickname: action.payload.nickname,
          });
          draft.list[index].likeCount += 1;
        }
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [PAGING]: (state, action) =>
      produce(state, (draft) => {
        draft.paging = action.payload.paging;
      }),
    [NEXT]: (state, action) =>
      produce(state, (draft) => {
        draft.next = action.payload.next;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [SET_MY_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let dummyIndex = draft.list.findIndex(
          (item) => item["id"] === action.payload.post_id
        );
        draft.list.splice(dummyIndex, 1);
      }),
  },
  initialState
);

const actionCreators = {
  addPostDB,
  getPostDB,
  deletePostDB,
  editPostDB,
  likePostDB,
  deleteManyPostDB,
  getMyPostDB,
};

export { actionCreators };
