import React from "react";
import { OpenVidu } from "openvidu-browser";
import { VideoList, VideoListWrap } from "./VideoContainer/VideoConEle";
import UserVideoComponent from "../components/UserVideoComponent";

const WebRTCContainer = (props) => {
  const { publisher, subscribers } = props;
  return (
    <>
      <div id="session">
        <VideoListWrap id="video-container">
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
        </VideoListWrap>
      </div>
    </>
  );
};

export default WebRTCContainer;
