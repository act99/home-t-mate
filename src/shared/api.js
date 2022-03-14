import axios from "axios";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import url from "./url";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  baseURL: url.BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  // ** 카카오 로그인
  kakaoLogin: (code) => api.get(`/user/kakao/callback?code=${code}`),
  getUserInfo: () => api.post(`/chat/user`),
  // ** 영상채팅
  getRooms: () => api.get(`/chat/rooms`),
  createRooms: (name, password, content) =>
    api.post(`/chat/room`, {
      name: name,
      content: content,
      password: password,
    }),
  joinRoom: (roomId) => api.get(`/chat/room/join/${roomId}`),
  leaveRoom: (roomId) => api.get(`/chat/room/quit/${roomId}`),
  // ** 포스트
  getPost: () => api.get(`/api/posts`),
  addPost: (contents) => api.post(`/api/posts`, contents),
  editPost: (postId, contents) => api.put(`/api/posts/${postId}`, contents),
  deletePost: (postId) => api.delete(`/api/posts/${postId}`),
  // ** TodoList
  getTodo: () => api.get(`/api/todolist`),
  addTodo: (todoContent) => api.post(`/api/todolist`, todoContent),
  editTodo: (id, contents) => api.put(`/api/todolist/${id}`, contents),
  deleteTodo: (id) => api.delete(`/api/todolist/${id}`),
};
