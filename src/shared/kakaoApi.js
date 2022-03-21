import axios from "axios";
import url from "./url";

const api = axios.create({
  baseURL: url.BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const kakaoApis = {
  // ** 카카오 로그인
  kakaoLogin: (code) => api.get(`/user/kakao/callback?code=${code}`),
};
