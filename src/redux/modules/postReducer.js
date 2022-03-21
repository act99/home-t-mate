import produce from "immer";
import { result } from "lodash";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";
import { imageApis } from "../../shared/formApi";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const LIKE_POST = "LIKE_POST";

const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const like = createAction(LIKE_POST, (postId, userId) => ({
  postId,
  userId,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
// const editPost = createAction(EDIT_POST, (post_id, contents, images) => ({
//   post_id, contents, images
// }));

const initialPost = {};

const initialState = {
  list: [{ ...initialPost }],
};

const getPostDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getPost()
      .then((res) => {
        dispatch(setPost(res.data));
        console.log("res확인용입니다", res.data);
      })
      .catch((error) => {
        window.alert("게시글 불러오기 실패!");
        console.log("res,error확인용입니다", error);
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

const editPostDB = (postId, contents, images) => {
  return function (dispatch, getState, { history }) {
    apis
      .editPost(postId, contents, images)
      .then((res) => {
        history.replace("/story");
        alert("게시글 수정 성공!");
      })
      .catch((error) => {
        alert("게시글 수정에 실패했습니다.");
        console.log(error);
      });
  };
};

const deletePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deletePost(postId)
      .then((res) => {
        alert("게시글이 삭제되었습니다.");
        history.replace("/story");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글이 삭제되지 않았습니다.");
      });
  };
};

const likePostDB = (postId, userId) => {
  return async function (dispatch, getState) {
    apis
      .likePost(postId)
      .then((res) => {
        dispatch(like(postId, userId));
        alert("좋아요 성공");
      })
      .catch((error) => {
        console.log(error);
        alert("좋아요 실패");
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

    [LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        const index = draft.list.findIndex(
          (item) => item.id === action.payload.postId
        );
        const is_include = draft.list[index].likeUserDto.includes(
          action.payload.userId
        );
        const userIndex = draft.list[index].likeUserDto.findIndex(
          (item) => item === action.payload.userId
        );
        if (is_include) {
          draft.list[index].likeUserDto.splice(userIndex, 1);
          draft.list[index].likeCount -= 1;
        } else {
          draft.list[index].likeUserDto.push(action.payload.userId);
          draft.list[index].likeCount += 1;
        }
      }),

    // [ADD_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list.unshift(action.payload.post);
    //   }),

    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let index = draft.list.findIndex(
    //       (p) => p.id === action.payload.postId
    //     );
    //     draft.list[index] = { ...draft.list[index], ...action.payload.post };
    //   }),

    // [DELETE_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let dummyIndex = draft.list.findIndex(
    //       (item) => item["id"] === action.payload.post_id
    //     );
    //     draft.list.splice(dummyIndex, 1);
    //   }),
  },
  initialState
);

const actionCreators = {
  addPostDB,
  getPostDB,
  deletePostDB,
  editPostDB,
  likePostDB,
};

export { actionCreators };
