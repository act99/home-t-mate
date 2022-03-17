import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";

// actions
const GET_ROOM = "GET_ROOM";
const CREATE_ROOM = "CREATE_ROOM";
// action creators

const getRoom = createAction(GET_ROOM, (room_list) => ({ room_list })); // 로그인 - user정보, 로그인상태 변경
const createRoom = createAction(CREATE_ROOM, (room) => ({ room }));
// initialState
const initialState = {
  room_list: [],
};

const initialRoom = {
  roomId: "",
  name: "",
  userCount: 0,
  user: "",
};

// ** 생성된 방 정보 가져오기
const getRoomDB = () => {
  return async function (dispatch, getState, { history }) {
    await apis
      .getRooms()
      .then((res) => {
        console.log(res.data);
        dispatch(getRoom(res.data));
      })
      .catch((error) => console.log(error));
  };
};

// ** 방 생성
const createRoomDB = (name, password, content, roomImg) => {
  return function (dispatch, getState, { history }) {
    apis
      .createRooms(name, password, content, roomImg)
      .then(
        (res) =>
          dispatch(
            createRoom({
              ...res.data,
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
        draft.room_list = action.payload.room_list;
      }),
    [CREATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room_list.push(action.payload.room);
      }),
  },
  initialState
);

const actionCreators = {
  getRoomDB,
  createRoomDB,
};

export { actionCreators };
