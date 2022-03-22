import styled from "@emotion/styled";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { ButtonGroup, IconButton } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";

const VideoComponent = (props) => {
  const videoRef = React.useRef();
  const { streamManager, nickname } = props;
  const size = useWindowSize();
  const { width, height } = size;

  const [mic, setMic] = React.useState(true);
  const [vid, setVid] = React.useState(true);
  const handleVideo = () => {
    console.log("비디오");
    setVid(!vid);
  };
  const handleMic = () => {
    console.log("마이크");
    setMic(!mic);
  };

  React.useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
    console.log(videoRef.current.style);
    return () => {};
  }, [streamManager, nickname]);

  return (
    <>
      <VideoWrap height={height}>
        <NicknameTag height={height}>
          {nickname.length > 7 ? nickname.slice(0, 7) + "..." : nickname}
        </NicknameTag>
        <ButtonTag>
          <IconButton onClick={handleVideo}>
            <VideocamIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={handleMic}>
            <MicIcon sx={{ color: "white" }} />
          </IconButton>
        </ButtonTag>
        <video autoPlay={true} ref={videoRef} />
      </VideoWrap>
    </>
  );
};

const NicknameTag = styled.p`
  color: white;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -0%);
  font-size: 15px;
`;

const ButtonTag = styled.div`
  color: white;
  /* background-color: green; */
  position: absolute;
  transform: translate(-50%, -0%);
  font-size: 15px;
  width: 100%;
  height: 50px;
`;

const VideoWrap = styled.div`
  width: ${(props) => (((props.height - 56) / 5 / 1.11) * 4) / 3}px;
  height: ${(props) => (props.height - 56) / 5 / 1.11}px;
  position: relative;
  justify-content: center;
  margin: 4px auto;
  video {
    transition: 0.2s;
    border-radius: 12px;
  }
  div {
    display: none !important;
    transition: 0.2s;
  }
  :hover {
    video {
      transition: filter 0.2s;
      filter: brightness(40%);
    }
    div {
      transition: filter 0.2s;
      display: flex !important;
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -0%);
      z-index: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* background-color: green; */
    }
  }
`;

export default VideoComponent;
