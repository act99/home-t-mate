import axios from "axios";
import { getCookie } from "./Cookie";
import url from "./url";
const token = getCookie("token");
const api = axios.create({
  baseURL: url.BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
    Authorization: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = token;
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const imageApis = {
  // ** 이미지 업로드
  postImage: (formData) => api.post(`api/image`, formData),
  addPost: (postData) => api.post(`api/posts`, postData),
  editPost: (postId, content) => api.put(`/api/posts/${postId}`, content),
  editProfile: (profileImg) => api.put(`/api/user/info`, profileImg),
};
