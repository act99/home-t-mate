import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));

const initialPost = {
  id: 0,
  imgUrl: [
    "https://www.clien.net/service/api/ori/imgView?imgUrl=https://cdn.clien.net/web/api/file/F01/12166446/1f22b4d87114c3.jpg&subject=%25EC%259C%2588%25ED%2584%25B0%2520(%25EC%2597%2590%25EC%258A%25A4%25ED%258C%258C)",
    "https://i.ytimg.com/vi/q_c5eSn4i7c/maxresdefault.jpg",
  ],
  title: "타이틀",
  contents: "본문",
  username: "pootter@naver.com",
  nickname: "pootter",
  userImgUrl:
    "http://img.marieclairekorea.com/2017/01/mck_586f4006b4e9f-375x375.jpg",
  createdAt: "2021-08-21 08:11:11",
  modifiedAt: "2021-08-21 08:11:11",
};

const initialState = {
  list: [{ ...initialPost }],
};

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then((res) => {
        dispatch(setPost(res.data));
      })
      .catch((error) => console.log(error));
  };
};

const editPostDB = (postId, contents) => {
  return function (dispatch, getState, { history }) {
    apis
      .editPost(postId, contents)
      .then((res) => {
        dispatch(editPost(contents));
        history.push("/");
      })
      .catch((error) => {
        alert("게시글 수정에 실패했습니다.");
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
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글이 삭제되지 않았습니다.");
      });
  };
};

const addPostDB = (contents) => {
  let postContent = {
    ...initialPost,
    id: contents.id,
    imgUrl: contents.imgUrl,
    title: contents.title,
    contents: contents.contents,
    username: contents.username,
    nickname: contents.nickname,
    userImgUrl: contents.userImgUrl,
    createdAt: contents.createdAt,
    modifiedAt: contents.modifiedAt,
  };
  return function (dispatch, getState, { history }) {
    apis
      .addPost(postContent)
      .then((res) => {
        dispatch(addPost(postContent));
        history.replace("/");
      })
      .catch((error) => {
        alert("저장에 실패했습니다. 네트워크 상태를 확인해주세요.");
      });
  };
};

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.post_list];
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex(
          (p) => p.id === action.payload.post_id
        );
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
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
};

export { actionCreators };
