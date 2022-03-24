import React from "react";
import Logo from "../assets/logo500300.png";
import styled from "@emotion/styled";

const SearchingRoom = () => {
  return (
    <Wrap>
      <img alt="" src={Logo} width="320px" />
      <TitleText>검색중...</TitleText>
      <ContentText>
        원하시는 방 제목 또는 호스트 이름을 입력한 후 엔터키를 눌러 검색해주세요
        :)
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
export default SearchingRoom;
