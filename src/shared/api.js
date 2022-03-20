import { applyMutationToEventStore } from "@fullcalendar/react";
import axios from "axios";
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
  createRooms: (name, password, content, roomImg) =>
    api.post(`/chat/room`, {
      name: name,
      content: content,
      password: password,
      workOut: false,
      roomImg: roomImg,
    }),
  workOutRoom: (roomId, workOut) =>
    api.put(`/chat/room/workout/${roomId}`, { workOut: workOut }),
  enterRoom: (roomId, password) =>
    api.post(`/chat/room/enter/${roomId}`, { password: password }),
  leaveRoom: (roomId) => api.delete(`/chat/room/quit/${roomId}`),
  deleteRoom: (roomId) => api.delete(`/room/delete/${roomId}`),
  checkRoomName: (roomName) => api.post(`/room/roomcheck`, { name: roomName }),
  // ** 포스트
  getPost: () => api.get(`/api/posts`),
  addPost: (contents) => api.post(`/api/posts`, contents),
  editPost: (postId, contents, images) =>
    api.put(`/api/posts/${postId}`, { contents, images }),
  deletePost: (postId) => api.delete(`/api/posts/${postId}`),
  likePost: (postId, userId) => api.post(`/api/posts/${postId}`, userId),

  //댓글
    // 댓글 불러오기
    getComment: (postId) => api.get(`api/comments/${postId}`),
    // 댓글 작성하기
    addComment: (postId, comment) => api.post(`api/comments/${postId}`, comment),
    // 댓글 삭제하기
    delComment: (postId, commentId) => api.delete(`api/comments/${postId}/${commentId}`),

  // ** TodoList
  getTodo: () => api.get(`/api/todolist`),
  addTodo: (todoContent) => api.post(`/api/todolist`, todoContent),
  editTodo: (id, contents) => api.put(`/api/todolist/${id}`, contents),
  deleteTodo: (id) => api.delete(`/api/todolist/${id}`),
};
