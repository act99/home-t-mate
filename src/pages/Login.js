import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/OAuth.js";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import kakaoImage from "../assets/kakao_login_large_wide.png";
const Login = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  React.useEffect(() => {
    if (user.is_login) {
      alert("로그인 하신 상태입니다.");
      history.push("/");
    }
    return () => {};
  }, []);

  return (
    <Wrap>
      <Title>
        <span>홈트메이트</span>에 온 걸 환영해요:)
      </Title>
      <Content>친구들과 함께 즐거운 홈트해요💪💪</Content>
      <div>
        <a
          href={KAKAO_AUTH_URL}
          id="custom-login-btn"
          // onClick={kakaoLogin}
        >
          <img alt="" src={kakaoImage} width="500" />
        </a>
      </div>
      <SmallFont onClick={() => history.push("/")}>
        먼저 더 둘러볼래요
      </SmallFont>
    </Wrap>
  );
};

const Title = styled.h1`
  font-size: xx-large;
  font-weight: bold;
  margin-bottom: 0px;
  span {
    color: #ff9234;
  }
`;

// const CenterWrap = styled.div`
//   margin: auto;
// `;

// FF9234

const Content = styled.h3`
  font-size: large;
  margin-bottom: 10vh;
`;

const SmallFont = styled.h5`
  font-size: small;
  color: #757575;
  cursor: pointer;
`;

const Wrap = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Login;
