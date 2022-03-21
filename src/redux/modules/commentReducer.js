import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import "moment";
import moment from "moment";
import { apis } from "../../shared/api";

//action
const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DEL_COMMENT = "DEL_COMMENT";

//action create function
const setComment = createAction(SET_COMMENT, (postId, comment_list) => ({postId, comment_list}));
const addComment = createAction(ADD_COMMENT, (postId, comment) => ({postId, comment}));
const delComment = createAction(DEL_COMMENT, (postId, commentId) => ({postId, commentId}));

// 초기값
const initialState = {
  list:{},
};

// 미들웨어

const getCommentDB = (postId) => {
  return async function (dispatch,getState){
    apis.getComment(postId)
    .then((response)=>{
      dispatch(setComment(postId,response.data))
      console.log('getComment res 확인용', response.data)
    }).catch((error)=>{
      console.log(error)
      alert('댓글 불러오기 실패');
    })
    
  }
}

const addCommentDB = (postId, comment) => {

  return function(dispatch, getState, {history}){
    apis.addComment(postId, comment)
      .then((response) => {
        // apis.getComment().then((response)=>{
        //   dispatch(setComment(postId, response.data))
        //   console.log('addcommet res값 확인용', response.data);
        // })
      })
      .catch((error) => {
        console.log(error)
        alert('댓글작성 실패');
      })
}
};

const delCommentDB = (postId, commentId) => {
  return function(dispatch, getState, {history}){
    apis.delComment(postId, commentId)
      .then((response) => {
        dispatch(delComment(postId,commentId))
        alert("댓글삭제 성공")
      })
      .catch((error) => {
        console.log(error)
        alert("댓글삭제 실패")
      })
  }
}


// 리듀서
export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
        draft.list[action.payload.postId] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.postId].unshift(action.payload.comment)
      }),
      // [EDIT_COMMENT]: (state, action) => produce(state, (draft)=> {
      //   draft.list[action.payload.post_id].unshift(action.payload.comment)
      // }),
      [DEL_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.postId] = [...state.list[action.payload.postId].filter((v,i)=> v.commentId!==action.payload.commentId)]
      }),
  },
  initialState
);

const actionCreators = {
  getCommentDB,
  addCommentDB,
  delCommentDB
};

export { actionCreators };