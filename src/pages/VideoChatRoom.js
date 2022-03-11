import styled from "@emotion/styled";
import React from "react";
import ChatContainer from "../containers/ChatContainer";
import YoutubeVideo from "../components/YoutubeVideo";
import useWindowSize from "../hooks/useWindowSize";
import EnterRoom from "../containers/EnterRoom";
const VideoChatRoom = () => {
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;
  return (
    <>
      <Wrap>
        <ContentsWrap>
          <VideoGroupWrap>
            <YoutubeVideo />
            <EnterRoom />
          </VideoGroupWrap>
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

const VideoGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 79.6vw;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export default VideoChatRoom;
