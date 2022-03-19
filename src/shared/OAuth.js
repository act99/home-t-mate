// ** 픽스!!!!!!!!!!!!!!!!!!!!!!!!!!!

import url from "./url";

const CLIENT_ID = url.CLIENT_KEY;
const REDIRECT_URI = url.REDIRECT_URI;

//닉네임 동의 페이지
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email`;

//성별, 연령 동의 페이지
// export const KAKAO_ADD_PROPERTIES = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_PRO}&response_type=code&scope=gender,age_range`;
