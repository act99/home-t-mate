import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import LoadingImage from "../assets/loading_image.png";
import styled from "@emotion/styled";
import { history } from "../redux/store";

const FullErrorContainer = () => {
  return (
    <>
      <WrapError>
        <Alert
          severity="error"
          sx={{
            width: 400,
            height: 600,
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertTitle sx={{ mx: "auto", textAlign: "center" }}>
            <h3>방 인원 초과</h3>
          </AlertTitle>
          <img src={LoadingImage} width="300px" />

          <h3>방 인원이 꽉 차 입장하실 수 없습니다.</h3>
          <Button
            sx={{
              display: "block",
              mx: "auto",
              width: "200px",
              border: "solid 2px",
            }}
            variant="outlined"
            color="error"
            onClick={() => {
              history.replace("/");
            }}
          >
            <strong>돌아가기</strong>
          </Button>
        </Alert>
      </WrapError>
    </>
  );
};

const WrapError = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default FullErrorContainer;
