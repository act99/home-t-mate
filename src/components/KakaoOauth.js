import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";

const KakaoOauth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return (
    <Wrap>
      <p>테스트 로딩중</p>
      <LinearProgress color="success" />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default KakaoOauth;
