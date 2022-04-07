import React from "react";
import UserVideoComponent from "../../components/VideoChatRoom/UserVideoComponent";
import styled from "@emotion/styled";
import useWindowSize from "../../hooks/useWindowSize";

const WebRTCContainer = (props) => {
  const {
    publisher,
    subscribers,
    session,
    OV,
    host,
    sessionToken,
    myUserName,
  } = props;

  // ** windowSize
  const size = useWindowSize();
  const { width, height } = size;
  // ** leaveSession 전달용

  return (
    <>
      <SessionWrap
        id="session"
        // direction={width < height ? "row" : "column"}
        // overflow={width < height ? "true" : "false"}
      >
        <VideoTest width={width} height={height}>
          {publisher !== undefined ? (
            <UserVideoComponent
              streamManager={publisher}
              host={host}
              OV={OV}
              sessionToken={sessionToken}
              myUserName={myUserName}
              me={true}
              session={session}
            />
          ) : (
            <VideoWrap></VideoWrap>
          )}
          {subscribers.map((sub, i) => (
            <UserVideoComponent
              streamManager={sub}
              key={i + JSON.parse(sub.stream.connection.data).clientData}
              host={host}
              me={false}
              session={session}
            />
          ))}
        </VideoTest>
      </SessionWrap>
    </>
  );
};

const VideoTest = styled.div`
  ${(props) =>
    props.width < props.height
      ? `  width: ${props.width * 0.95}px;
  height: 160px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  overflow-x: auto;`
      : `  width: 15%;
  height: ${(props) => props.height - 56}px;
  position: absolute;
  background-color: #f9f9f9;
  left: 65%;
  border-left: solid 1px #e0e0e0;`}/* width: 15%;
  height: ${(props) => props.height - 56}px;
  position: absolute;
  background-color: #f9f9f9;
  left: 65%;
  border-left: solid 1px #e0e0e0; */
`;

const MVideoTest = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.width * 0.4}px;
  background-color: #f9f9f9;
  overflow-x: auto;
  /* background-color: red; */
`;

const SessionWrap = styled.div`
  /* width: 100%; */
  /* height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: ${(props) => props.direction};
  ${(props) => (props.overflow === "true" ? ` overflow-x: auto;` : null)} */
`;

const MSessionWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
`;

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

export default WebRTCContainer;
