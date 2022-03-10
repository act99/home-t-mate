import styled from "@emotion/styled";
import React from "react";

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
        <div></div>
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
  video {
    transition: 0.5s;
  }
  div {
    display: "none";
  }
  :hover {
    video {
      transition: filter 0.5s;
      filter: brightness(40%);
    }
    div {
      width: 20%;
      height: 50px;
      position: absolute;
      top: 50%;
      left: 40%;
      z-index: 1;

      /* flex-direction: "row"; */
      background-color: green;
    }
  }
`;

export default VideoComponent;
