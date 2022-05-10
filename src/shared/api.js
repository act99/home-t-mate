import axios from "axios";
import { getCookie } from "./Cookie";
import url from "./url";
const token = getCookie("token");
const api = axios.create({
  baseURL: url.BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = token;
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  // ** 카카오 로그인
  kakaoLogin: (code) => api.get(`/user/kakao/callback?code=${code}`),
  getUserInfo: () => api.post(`/chat/user`),
  // ** 영상채팅
  // getRooms: () => api.get(`/chat/rooms`),
  createRooms: (name, password, content, roomImg) =>
    api.post(`/chat/rooms`, {
      name: name,
      content: content,
      password: password,
      workOut: false,
      roomImg: roomImg,
    }),
  workOutRoom: (roomId, workOut) =>
    api.put(`/chat/rooms/workout/${roomId}`, { workOut: workOut }),
  enterRoom: (roomId, password) =>
    api.post(`/chat/rooms/enter/${roomId}`, { password: password }),
  leaveRoom: (roomId) => api.delete(`/chat/rooms/enter/${roomId}`),
  deleteRoom: (roomId) => api.delete(`/rooms/delete/${roomId}`),
  checkRoomName: (roomName) => api.post(`/rooms/roomcheck`, { name: roomName }),
  searchRoom: (keyword) => api.get(`/rooms/search?keyword=${keyword}`),
  infinityRoom: (page, size) =>
    api.get(`/chat/rooms?page=${page}&size=${size}`),
  // ** 포스트
  getPost: (page, size) => api.get(`/api/posts?page=${page}&size=${size}`),
  addPost: (contents) => api.post(`/api/posts`, contents),
  editPost: (postId, contents, images) =>
    api.put(`/api/posts/${postId}`, { content: contents, image: images }),
  deletePost: (postId) => api.delete(`/api/posts/${postId}`),
  likePost: (postId) => api.post(`/api/likes/${postId}`),
  getMyPost: () => api.get(`api/posts/myposts`),
  // deleteManyPost: (postId) => api.post(`/api/manyposts`, postId),
  //댓글
  getComment: (postId) => api.get(`api/comments/${postId}`),
  addComment: (postId, comment) =>
    api.post(`api/comments/${postId}`, { comment: comment }),
  delComment: (postId, commentId) =>
    api.delete(`api/comments/${postId}/${commentId}`),

  // ** TodoList
  getTodo: () => api.get(`/api/todolist`),
  addTodo: (todoContent) => api.post(`/api/todolist`, todoContent),
  editTodo: (id, contents) => api.put(`/api/todolist/${id}`, contents),
  deleteTodo: (id) => api.delete(`/api/todolist/${id}`),
};
