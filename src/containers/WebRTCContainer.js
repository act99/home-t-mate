import React from "react";
import UserVideoComponent from "../components/UserVideoComponent";
import styled from "@emotion/styled";

const WebRTCContainer = (props) => {
  const { publisher, subscribers, leaveSession, session, OV, mySessionId } =
    props;
  console.log(props);

  // ** windowSize
  // ** leaveSession 전달용
  React.useEffect(() => {
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
