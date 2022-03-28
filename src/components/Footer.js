import React from "react";
import { Divider } from "@mui/material";
import styled from "@emotion/styled";
import { history } from "../redux/store";
import Logo from "../assets/mainlogo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  let pathname = window.location.pathname;
  const routeUrl = useSelector((state) => state.router.location.pathname);
  React.useEffect(() => {}, [pathname, routeUrl]);
  if (pathname.includes("checkvideo") || pathname.includes("/livenow/chat")) {
    return <div> </div>;
  }
  return (
    <>
      <Divider />
      <Wrap>
        <FooterList>
          <img
            alt=""
            src={Logo}
            height="40px"
            onClick={() => history.push("/")}
            style={{ cursor: "pointer", marginRight: 30, marginBottom: 8 }}
          />
          <TitleWrap onClick={() => history.push("/termsofuse")}>
            <h3>이용약관</h3>
          </TitleWrap>
          <TitleWrap onClick={() => history.push("/privacy")}>
            <h3>개인정보보호</h3>
          </TitleWrap>
          <TitleWrap
            onClick={() =>
              window.open("https://forms.gle/KjiKSmjvokFLQNPV9", "_black")
            }
          >
            <h3>오류제보</h3>
          </TitleWrap>
          <TitleWrap
            onClick={() =>
              window.open("https://forms.gle/w6vL5DUyokPE9PtR8", "_black")
            }
          >
            <h3>만족도 평가</h3>
          </TitleWrap>
        </FooterList>
        <Divider sx={{ width: "70%" }} />
        <FooterList>
          <CopyRight>
            <h3>Copyright ©2022 Hometmate. All rights reserved.</h3>
          </CopyRight>
        </FooterList>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 240px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;

const FooterList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const TitleWrap = styled.div`
  width: 130px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h3 {
    font-size: 16px;
    font-family: "GmarketSansLight";
  }
`;

const AHref = styled.a`
  width: 130px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h3 {
    font-size: 16px;
    font-family: "GmarketSansLight";
  }
`;

const CopyRight = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    font-size: 12px;
    font-family: "GmarketSansLight";
  }
`;

export default Footer;
