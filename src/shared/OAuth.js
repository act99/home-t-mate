// ** 픽스!!!!!!!!!!!!!!!!!!!!!!!!!!!
import url from "./url";
const CLIENT_ID = url.CLIENT_KEY;
const REDIRECT_URI = url.REDIRECT_URI;
// 배포용
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// 테스트용
// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
