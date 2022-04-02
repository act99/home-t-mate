import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// actions
const GET_ROOM = "GET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
const LOADING = "LOADING";
const GET_MAIN_ROOM = "GET_MAIN_ROOM";
const SEARCH_ROOM = "SEARCH_ROOM";
const CLEAR_ROOM = "CLEAR_ROOM";
const NEXT = "NEXT";
const PAGING = "PAGING";
// action creators

const getRoom = createAction(GET_ROOM, (room_list) => ({ room_list })); // 로그인 - user정보, 로그인상태 변경
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));
const getMainRoom = createAction(GET_MAIN_ROOM, (room_list) => ({ room_list }));
const searchRoom = createAction(SEARCH_ROOM, (room_list) => ({ room_list }));
const clearRoom = createAction(CLEAR_ROOM, (room_list) => ({ room_list }));
const next = createAction(NEXT, (next) => ({ next }));
const paging = createAction(PAGING, (paging) => ({ paging }));
// initialState
const initialState = {
  room_list: [],
  is_loading: false,
  next: true,
  paging: 1,
};

// ** 생성된 방 정보 가져오기
const getRoomDB = () => {
  return async function (dispatch, getState, { history }) {
    dispatch(loading(true));
    console.log("생성된방정보가져오기");

    const roomList = getState().roomReducer.room_list;
    console.log("방 갯수", roomList.length);
    if (roomList.length === 0) {
      dispatch(paging(1));
    }
    const page = getState().roomReducer.paging;

    await apis
      .infinityRoom(page, 8)
      .then((res) => {
        console.log(page);
        if (res.data.length === 0) {
          dispatch(next(false));
        } else {
          dispatch(next(true));
        }

        console.log(res.data);
        dispatch(getRoom(res.data));
      })
      .catch((error) => console.log(error));
  };
};

const getMainRoomDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .infinityRoom(1, 8)
      .then((res) => {
        dispatch(getMainRoom(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const searchRoomDB = (searchInput) => {
  return function (dispatch, getState, { history }) {
    apis
      .searchRoom(searchInput)
      .then((res) => {
        dispatch(searchRoom(res.data));
      })
      .catch((error) => console.log(error.response.data));
  };
};

// ** 방 생성
const createRoomDB = (name, password, content, roomImg) => {
  return function (dispatch, getState, { history }) {
    const state = getState();
    const user = state.userReducer.user;
    const nickname = user.nickname;
    const profileImg = user.profileImg;
    apis
      .createRooms(name, password, content, roomImg)
      .then(
        (res) =>
          dispatch(
            createRoom({
              ...res.data,
              profileImg: profileImg,
              nickname: nickname,
              // user :
              // roomId: res.data.roomId,
              // name: res.data.name,
              // content: res.data.content,
              // workOut: res.data.workOut,
              // roomImg: res.data.roomImg,
              // userCount: res.data.userCount,
              // user: res.data.user,
            })
          )
        // history.go(0)
      )
      .catch((error) => {
        alert(error.response.data.message);
      });
  };
};

export default handleActions(
  {
    [GET_ROOM]: (state, action) =>
      produce(state, (draft) => {
        const result = action.payload.room_list.filter(
          (item) => !draft.room_list.find((v) => item.name === v.name)
        );
        draft.room_list = [...draft.room_list, ...result];
        draft.is_loading = false;
        draft.paging = draft.paging + 1;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list.unshift(action.payload.room);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    [GET_MAIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list = [...action.payload.room_list];
      }),
    [SEARCH_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list = [...action.payload.room_list];
      }),
    [CLEAR_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list = [...action.payload.room_list];
      }),
    [NEXT]: (state, action) =>
      produce(state, (draft) => {
        draft.next = action.payload.next;
      }),
    [PAGING]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.paging);
        draft.paging = action.payload.paging;
      }),
  },
  initialState
);

const actionCreators = {
  getRoomDB,
  createRoomDB,
  getMainRoomDB,
  searchRoomDB,
  clearRoom,
  next,
};

export { actionCreators };
