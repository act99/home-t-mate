// ** 테스트
// const BASE_URL = "http://15.165.42.20:8080";
// const BASE_URL = "http://3.35.175.152:8080";
// const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
// const WEB_SOCKET = "http://15.165.42.20:8080/ws-stomp";
// ** 배포
// const BASE_URL = "https://hanghae99.shop";
// const REDIRECT_URI = "https://act99.shop";
// const WEB_SOCKET = "https://hanghae99.shop/ws-stomp";
// ** 배포
// const BASE_URL = "https://hanghae99.shop:443";
// const REDIRECT_URI = "https://www.act99.shop/user/kakao/callback";
// const WEB_SOCKET = "https://hanghae99.shop/ws-stomp";
// const OPEN_VIDU = "https://hanghae99.shop:8443";
// const CLIENT_KEY = "a0c21ddfb1632beaa7377ac0b91c9849";
// ** 강욱님 url
// const BASE_URL = "http://3.35.175.152:8080";

//건욱님 url
// const BASE_URL = "http://15.165.42.20:8080";

//강욱,건욱님 합친 url
// const BASE_URL = "http://3.35.175.152:8080";
const BASE_URL = "http://15.165.42.20:8080";


const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
const WEB_SOCKET = "http://3.35.175.152:8080/ws-stomp";
const OPEN_VIDU = "https://" + window.location.hostname + ":4443";
const CLIENT_KEY = "dbf70dbcc152160d45ec6ce156a6c37e";
const url = {
  BASE_URL,
  REDIRECT_URI,
  WEB_SOCKET,
  OPEN_VIDU,
  CLIENT_KEY,
};
export default url;