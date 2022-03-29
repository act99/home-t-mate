import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import LoadingImage from "../assets/loading_image.png";
import styled from "@emotion/styled";
import { history } from "../redux/store";

const FullErrorContainer = (props) => {
  return (
    <>
      <WrapError>
        <Alert
          severity="error"
          sx={{
            width: 450,
            height: 752,
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AlertTitle sx={{ mx: "auto", textAlign: "center" }}>
            <h3>{props.errorMessage}</h3>
          </AlertTitle>
          <img src={LoadingImage} width="300px" />
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
              props.modalOff();
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 752px;
`;

export default FullErrorContainer;
