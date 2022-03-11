import React from "react";
import { OpenVidu } from "openvidu-browser";
import { VideoList, VideoListWrap } from "./VideoContainer/VideoConEle";
import UserVideoComponent from "../components/UserVideoComponent";
import styled from "@emotion/styled";

const WebRTCContainer = (props) => {
  const { publisher, subscribers } = props;
  return (
    <>
      <SessionWrap id="session">
        <VideoListWrap id="video-container">
          {subscribers.length < 5 ? (
            <VideoList>
              {publisher !== undefined ? (
                <div>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </VideoList>
          ) : (
            <FiveVideoList>
              {publisher !== undefined ? (
                <div>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </FiveVideoList>
          )}
        </VideoListWrap>
      </SessionWrap>
    </>
  );
};

const SessionWrap = styled.div`
  width: 100%;
  height: auto;
`;

const FiveVideoList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  video {
    position: relative;
    float: left;
    cursor: pointer;
    height: auto;
    min-height: 230px;
    margin-left: 4px;
  }
`;

export default WebRTCContainer;
