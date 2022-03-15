import styled from "@emotion/styled";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { ButtonGroup, IconButton } from "@mui/material";

const VideoComponent = (props) => {
  const videoRef = React.useRef();
  React.useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    console.log(videoRef.current.style);
    // videoRef.current.style.height = "270px";
    // videoRef.current.style.width = "480px";
    return () => {};
  }, [props]);

  return (
    <>
      <VideoWrap>
        <div>
          <ButtonGroup sx={{ mt: 15 }}>
            <IconButton>
              <VideocamIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
            <IconButton>
              <MicIcon sx={{ fontSize: 30, color: "white" }} />
            </IconButton>
          </ButtonGroup>
        </div>
        <video autoPlay={true} ref={videoRef} />
      </VideoWrap>
    </>
  );
};

const VideoWrap = styled.div`
  width: 100%;
  /* height: ${(props) => console.log(props)}; */
  position: relative;
  justify-content: center;
  margin: 16px 4px;
  video {
    transition: 0.5s;
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
      /* flex-direction: "row"; */
      /* background-color: green; */
    }
  }
`;

export default VideoComponent;
