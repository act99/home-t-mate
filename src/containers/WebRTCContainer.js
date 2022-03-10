import React from "react";
import { OpenVidu } from "openvidu-browser";

const OPENVIDU_SERVER_URL = "https://" + window.location.hostname + ":4443";
// const OPENVIDU_SERVER_URL = "https://hanghae99.shop:5443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const WebRTCContainer = () => {
  const [data, setData] = React.useState({
    mySessionId: "SessionA",
    myUserName: "Participant" + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  });
  let OV = null;

  const leaveSession = () => {
    const mySession = data.session;
    if (mySession) {
      mySession.disconnect();
    }
    OV = null;
    setData({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  };

  const onbeforeunload = (e) => {
    window.addEventListener("beforeunload", onbeforeunload);
  };
  React.useEffect(() => {
    onbeforeunload();
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  return <div></div>;
};

export default WebRTCContainer;
