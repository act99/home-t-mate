import React from "react";
import Typography from "@mui/material/Typography";
import { Divider, Link } from "@mui/material";
import styled from "@emotion/styled";
import { history } from "../redux/store";
import Logo from "../assets/mainlogo.png";

const Footer = () => {
  return (
    <>
      <Divider />
      <Wrap>
        <FooterList>
          <img
            alt=""
            src={Logo}
            height="50%"
            onClick={() => history.push("/")}
            style={{ cursor: "pointer", marginRight: 30, marginBottom: 8 }}
          />
          <TitleWrap onClick={() => history.push("/termsofuse")}>
            <h3>이용약관</h3>
          </TitleWrap>
          <TitleWrap onClick={() => history.push("/privacy")}>
            <h3>개인정보보호</h3>
          </TitleWrap>
          <TitleWrap>
            <h3>오류제보</h3>
          </TitleWrap>
        </FooterList>
        {/* <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/act99/mini_project">
            Frontend
          </Link>

          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}

          <Link
            color="inherit"
            href="https://github.com/hyeonjh/gongguri_backend"
          >
            Back end
          </Link>
          {new Date().getFullYear()}
          {"."}
        </Typography> */}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100px;
  /* background-color: #e2f7de; */
  margin: 0px;
  margin-top: 96px;
  /* padding-top: 96px; */
`;

const FooterList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: star;
  align-items: center;
  width: 60%;
  height: 92px;
  margin-right: auto;
  margin-left: auto;
  /* background-color: aliceblue; */
`;

const TitleWrap = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h3 {
    font-size: 16px;
    font-family: "GmarketSansLight";
  }
`;

export default Footer;
