import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { deleteCookie } from "../shared/Cookie.js";
import LoadingImage from "../assets/loading_image.png";
import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    deleteCookie("token");
    dispatch(userActions.logout());
    setTimeout(() => {
      history.replace("/");
    }, 1000);
    return () => {};
  }, [dispatch, history]);

  return (
    <Wrap>
      <img alt="" src={LoadingImage} width="300px" />
      <Text>이용해주셔서 감사합니다.</Text>
      <LinearProgress color="success" sx={{ width: "300px", mt: 5 }} />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff; */
  background-color: white;
`;

const Text = styled.h3`
  font-size: large;
  color: black;
  margin-bottom: 10px;
`;

export default Logout;
