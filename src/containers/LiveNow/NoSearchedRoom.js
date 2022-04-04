import React from "react";
import Logo from "../../assets/nosearching.png";
import styled from "@emotion/styled";

const NoSearchedRoom = () => {
  return (
    <Wrap>
      <img alt="" src={Logo} width="320px" />
      <ContentText>다시 한번 검색해주세요</ContentText>
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

const ContentText = styled.h5`
  font-size: 16px;
  color: green;
`;
export default NoSearchedRoom;
