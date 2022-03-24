import React from "react";
import Logo from "../assets/nosearching.png";
import styled from "@emotion/styled";

const NoSearchedRoom = () => {
  return (
    <Wrap>
      <img alt="" src={Logo} width="320px" />
      <ContentText>
        검색 가능한 방이 없습니다 <br />
        <br />
        원하시는 방을 다시 검색해주세요 :)
      </ContentText>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  text-align: center;
  margin-top: 100px;
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const ContentText = styled.h5`
  font-size: 16px;
`;
export default NoSearchedRoom;
