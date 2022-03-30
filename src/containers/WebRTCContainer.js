import React from "react";
import UserVideoComponent from "../components/UserVideoComponent";
import styled from "@emotion/styled";
import useWindowSize from "../hooks/useWindowSize";

const WebRTCContainer = (props) => {
  const {
    publisher,
    subscribers,
    leaveSession,
    session,
    OV,
    mySessionId,
    host,
    sessionToken,
    myUserName,
  } = props;

  // ** windowSize
  const size = useWindowSize();
  const { width, height } = size;
  // ** leaveSession 전달용
  React.useEffect(() => {
    // return () => {
    //   leaveSession();
    // };
  }, []);

  // if (width < height) {
  //   return (
  //     <>
  //       <MSessionWrap id="session" width={width}>
  //         {publisher !== undefined ? (
  //           <UserVideoComponent
  //             streamManager={publisher}
  //             host={host}
  //             OV={OV}
  //             sessionToken={sessionToken}
  //             myUserName={myUserName}
  //             me={true}
  //             session={session}
  //           />
  //         ) : (
  //           <VideoWrap></VideoWrap>
  //         )}
  //         {subscribers.map((sub, i) => (
  //           <UserVideoComponent
  //             streamManager={sub}
  //             key={i}
  //             host={host}
  //             me={false}
  //             session={session}
  //           />
  //         ))}
  //       </MSessionWrap>
  //     </>
  //   );
  // }

  return (
    <>
      <SessionWrap id="session">
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
            key={i}
            host={host}
            me={false}
            session={session}
          />
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

const MSessionWrap = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
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
