import produce from "immer";
import { result } from "lodash";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";
import { imageApis } from "../../shared/formApi";

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
  postImg: [
    "https://img.allurekorea.com/allure/2021/03/style_60586b3a9c105-916x1200.jpg",
    // "https://bunny.jjalbot.com/2019/01/b2ajc3wyBN/ILaMquQcp.jpeg",
    "https://pds.joins.com/news/component/htmlphoto_mmdata/202103/20/e92d9c8a-3518-4201-b2d9-ade6e3ea3c1d.jpg",
  ],
  title: "타이틀",
  content: "본문",
  username: "pootter@naver.com",
  nickname: "pootter",
  userImg:
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
        console.log("res확인용입니다", res);
        dispatch(setPost(res.data.data.postList));
      })
      .catch((error) => {
        window.alert("게시글 불러오기 실패!");
      });
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

const addPostDB = (postData) => {
  console.log(postData);
  return async function (dispatch, getState) {
    imageApis
      .addPost(postData)
      .then((res) => {
        alert("게시물 작성 성공!");
      })
      .catch((error) => {
        alert("게시물 작성 실패!");
      });
  };
};

// const addPostDB = (contents) => {
//   let postContent = {
//     ...initialPost,
//     id: contents.id,
//     imgUrl: contents.imgUrl,
//     title: contents.title,
//     contents: contents.contents,
//     username: contents.username,
//     nickname: contents.nickname,
//     userImgUrl: contents.userImgUrl,
//     createdAt: contents.createdAt,
//     modifiedAt: contents.modifiedAt,
//   };
//   return function (dispatch, getState, { history }) {
//     apis
//       .addPost(postContent)
//       .then((res) => {
//         dispatch(addPost(postContent));
//         history.replace("/");
//       })
//       .catch((error) => {
//         alert("저장에 실패했습니다. 네트워크 상태를 확인해주세요.");
//       });
//   };
// };


//액션에 필요한 추가 데이터는 payload라는 이름을 사용함

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.post_list];
      }),
    // [ADD_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.unshift(action.payload.post);
    //   }),
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
