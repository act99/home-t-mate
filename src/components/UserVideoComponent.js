import React from "react";
import VideoComponent from "./VideoComponent";
import "../styles/UserVideo.css";
import styled from "@emotion/styled";

const UserVideoComponent = (props) => {
  const getNicknameTag = () =>
    JSON.parse(props.streamManager.stream.connection.data).clientData;
  const OpenVidu = props.OV ? props.OV : null;
  return (
    <>
      {props.streamManager !== undefined ? (
        <VideoComponent
          streamManager={props.streamManager}
          nickname={getNicknameTag()}
          host={props.host}
          OV={OpenVidu}
          sessionToken={props.sessionToken}
          myUserName={props.myUserName}
        />
      ) : (
        <VideoWrap>
          <h3>비디오 없음</h3>
        </VideoWrap>
      )}
    </>
  );
};

const VideoWrap = styled.div`
  width: ${(props) => (((props.height - 56) / 5 / 1.11) * 4) / 3}px;
  height: ${(props) => (props.height - 56) / 5 / 1.11}px;
  position: relative;
  justify-content: center;
  margin: 4px auto;
  background-color: black;
  h3 {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -0%);
    z-index: 1;
    font-size: 12px;
    color: white;
  }
  video {
    position: absolute;
    transition: 0.2s;
    border-radius: 12px;
  }
  #buttondiv {
    display: none !important;
    transition: 0.2s;
  }
  :hover {
    video {
      position: absolute;
      transition: filter 0.2s;
      filter: brightness(40%);
    }
    #buttondiv {
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

export default UserVideoComponent;
