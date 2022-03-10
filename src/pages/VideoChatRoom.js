import styled from "@emotion/styled";
import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import ChatNav from "../components/ChatNav";
import ChatContainer from "../containers/ChatContainer";
import YoutubeVideo from "../components/YoutubeVideo";
const VideoChatRoom = () => {
  return (
    <>
      <Wrap>
        <ChatNav />
        <ContentsWrap>
          <YoutubeVideo />
          <ChatContainer />
        </ContentsWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 93vh;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export default VideoChatRoom;
