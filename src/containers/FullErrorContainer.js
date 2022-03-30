import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button } from "@mui/material";
import LoadingImage from "../assets/loading_image.png";
import styled from "@emotion/styled";
import { history } from "../redux/store";
import useWindowSize from "../hooks/useWindowSize";

const FullErrorContainer = (props) => {
  const { width, mobile } = props;
  console.log(width);
  if (mobile) {
    return (
      <>
        <MWrapError>
          <Alert
            severity="error"
            sx={{
              width: "100%",
              height: "100%",
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
            <img
              src={LoadingImage}
              width={`${width * 0.5}px`}
              alt=""
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
            <Button
              sx={{
                display: "block",
                mx: "auto",
                width: `${width * 0.5}px`,
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
        </MWrapError>
      </>
    );
  }
  return (
    <>
      <WrapError>
        <Alert
          severity="error"
          sx={{
            width: "100%",
            height: "100%",
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
          <img
            src={LoadingImage}
            width={`${width * 0.2}px`}
            alt=""
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
          <Button
            sx={{
              display: "block",
              mx: "auto",
              width: `${width * 0.2}px`,
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
  width: 30%;
  height: 80%;
`;

const MWrapError = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
`;

export default FullErrorContainer;
