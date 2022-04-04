import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import { kakaoApis } from "../../shared/kakaoApi";
// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
// action creators

const login = createAction(LOG_IN, (user) => ({ user })); // 로그인 - user정보, 로그인상태 변경
const logout = createAction(LOG_OUT, (user) => ({ user }));
// initialState
export const initialState = {
  user: {
    id: 0,
    nickname: "",
    userImg: "",
    username: "",
    is_login: false,
    token: null,
  },
};

// const userinfoDB = () => {
//   return function (dispatch, getState, { history }) {
//     apis
//       .getUserInfo()
//       .then((res) => {
//         dispatch(login({ ...res.data, is_login: true }));
//       })
//       .catch((error) => console.log(error));
//   };
// };

const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    await apis
      .kakaoLogin(code)
      .then((res) => {
        setCookie("token", res.headers.authorization);
        dispatch(
          login({
            id: res.data.userId,
            token: res.headers.authorization,
            nickname: res.data.userResponseDto.nickname,
            profileImg: res.data.userResponseDto.profileImg,
            username: res.data.userResponseDto.username,
          })
        );

        // console.log(res.data);
        history.replace("/");
        history.go(0);
      })
      .catch((error) => console.log(error));
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = {
          id: action.payload.user.id,
          nickname: action.payload.user.nickname,
          profileImg: action.payload.user.profileImg,
          username: action.payload.user.username,
          is_login: true,
          token: getCookie("token"),
        }; //유저정보
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("token");
        draft.user = {
          id: 0,
          nickname: "",
          profileImg: "",
          username: "",
          is_login: false,
          token: null,
        };
      }),
    // produce(state, (draft)) => {
    // }
  },
  initialState
);

// action creator export

const actionCreators = {
  login,
  kakaoLoginDB,
  logout,
  // userinfoDB,
};

export { actionCreators };
