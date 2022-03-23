const BASE_URL = "http://localhost:8080";
const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
const WEB_SOCKET = "http://54.180.145.1/ws-stomp";
const OPEN_VIDU = "https://" + window.location.hostname + ":4443";
const CLIENT_KEY = "a0c21ddfb1632beaa7377ac0b91c9849";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
// const WEB_SOCKET = process.env.REACT_APP_WEB_SOCKET;
// const OPEN_VIDU = process.env.REACT_APP_OPEN_VIDU;
// const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY;

const url = {
  BASE_URL,
  REDIRECT_URI,
  WEB_SOCKET,
  OPEN_VIDU,
  CLIENT_KEY,
};
export default url;