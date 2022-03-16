import styled from "@emotion/styled";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { ButtonGroup, IconButton } from "@mui/material";

const VideoComponent = (props) => {
  const videoRef = React.useRef();
  const { streamManager, nickname } = props;

  React.useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
    console.log(videoRef.current.style);
    return () => {};
  }, [streamManager, nickname]);

  return (
    <>
      <VideoWrap>
        <NicknameTag>
          {nickname.length > 7 ? nickname.slice(0, 7) + "..." : nickname}
        </NicknameTag>
        <video autoPlay={true} ref={videoRef} />
      </VideoWrap>
    </>
  );
};

const NicknameTag = styled.p`
  color: white;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  left: 25%;
`;

const VideoWrap = styled.div`
  width: 220px;
  height: 165px;
  position: relative;
  justify-content: center;
  margin: 4px auto;

  video {
    transition: 0.5s;
    border-radius: 12px;
  }

  div {
    display: none !important;
    transition: 0.5s;
  }
  :hover {
    video {
      transition: filter 0.5s;
      filter: brightness(40%);
    }
    div {
      display: flex !important;
      width: 2.5vw;
      height: 50px;
      position: absolute;
      top: 50%;
      left: 3.4vw;
      z-index: 1;
      flex-direction: row;
      justify-content: center;
      flex-direction: "row";
      background-color: green;
    }
  }
`;

export default VideoComponent;
