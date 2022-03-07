import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";

const SET_TODO = "SET_TODO";
const ADD_TODO = "ADD_TODO";
const EDIT_TODO = "EDIT_TODO";
const DELETE_TODO = "DELETE_TODO";

const setTodo = createAction(SET_TODO, (todo_list) => ({ todo_list }));
const addTodo = createAction(ADD_TODO, (todo) => ({ todo }));
const deleteTodo = createAction(EDIT_TODO, (todo_id) => ({ todo_id }));
const editTodo = createAction(DELETE_TODO, (todo_id, todo) => ({
  todo_id,
  todo,
}));

const initialTodo = {
  id: 0,
  title: "sdfasdf",
  startAt: "YYYY-MM-DD ",
  endAt: "YYYY-MM-DD",
  time: "hh:mm:ss",
  completed: false,
};

const initialState = {
  list: [{ ...initialTodo }],
};

const getTodoDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getTodo()
      .then((res) => {
        dispatch(setTodo(res.data));
      })
      .catch((error) => console.log(error));
  };
};

const editTodoDB = (todoId, contents) => {
  return function (dispatch, getState, { history }) {
    apis
      .editTodo(todoId, contents)
      .then((res) => {
        dispatch(editTodo(contents));
        history.push("/");
      })
      .catch((error) => {
        alert("게시글 수정에 실패했습니다.");
      });
  };
};

const deleteTodoDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .deleteTodo(postId)
      .then((res) => {
        dispatch(deleteTodo(postId));
        alert("게시글이 삭제되었습니다.");
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("게시글이 삭제되지 않았습니다.");
      });
  };
};

const addTodoDB = (contents) => {
  let todoContent = {
    ...initialTodo,
    id: contents.id,
    title: contents.title,
    startAt: contents.startAt,
    endAt: contents.endAt,
    time: contents.time,
    completed: false,
  };
  return function (dispatch, getState, { history }) {
    apis
      .addTodo(todoContent)
      .then((res) => {
        dispatch(addTodo(todoContent));
        history.replace("/");
      })
      .catch((error) => {
        alert("저장에 실패했습니다. 네트워크 상태를 확인해주세요.");
      });
  };
};

export default handleActions(
  {
    [SET_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [...action.payload.todo_list];
      }),
    [ADD_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.todo);
      }),
    [EDIT_TODO]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex(
          (p) => p.id === action.payload.todo_id
        );
        draft.list[index] = { ...draft.list[index], ...action.payload.todo };
      }),
    [DELETE_TODO]: (state, action) =>
      produce(state, (draft) => {
        let dummyIndex = draft.list.findIndex(
          (item) => item["id"] === action.payload.todo_id
        );
        draft.list.splice(dummyIndex, 1);
      }),
  },
  initialState
);

const actionCreators = {
  addTodoDB,
  getTodoDB,
  editTodoDB,
  deleteTodoDB,
};

export { actionCreators };
