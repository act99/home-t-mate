import React from "react";
import { OpenVidu } from "openvidu-browser";
import { VideoList, VideoListWrap } from "./VideoContainer/VideoConEle";
import UserVideoComponent from "../components/UserVideoComponent";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { actionCreators as sessionAcions } from "../redux/modules/sessionReducer";

const WebRTCContainer = (props) => {
  const { publisher, subscribers, leaveSession, session, OV } = props;
  console.log(subscribers);
  const dispatch = useDispatch();
  // ** windowSize
  // ** leaveSession 전달용
  React.useEffect(() => {
    dispatch(sessionAcions.leaveSessionFunc(leaveSession));
    dispatch(sessionAcions.bringMySessionId(leaveSession));
    return () => {
      leaveSession();
    };
  }, []);

  return (
    <>
      <SessionWrap id="session">
        {publisher !== undefined ? (
          <UserVideoComponent streamManager={publisher} />
        ) : null}
        {subscribers.map((sub, i) => (
          <UserVideoComponent streamManager={sub} key={i} />
        ))}
      </SessionWrap>
    </>
  );
};

const SessionWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

export default WebRTCContainer;
