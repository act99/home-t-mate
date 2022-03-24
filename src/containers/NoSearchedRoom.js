import React from "react";
import Logo404 from "../assets/404(600px).png";
import styled from "@emotion/styled";

const NoSearchedRoom = () => {
  return (
    <Wrap>
      <img alt="" src={Logo404} width="320px" />
      <TitleText>
        죄송합니다 <br />
        요청하신 페이지를 찾을 수 없습니다.
      </TitleText>
      <ContentText>
        방문하시려는 페이지의 주소가 잘못 입력되었거나,
        <br />
        페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        <br />
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
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
  margin-top: 156px;
  text-align: center;
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const ContentText = styled.h5`
  font-size: 12px;
`;
export default NoSearchedRoom;
