import styled from "@emotion/styled";
import React from "react";
import ChatContainer from "../containers/ChatContainer";
import YoutubeVideo from "../components/YoutubeVideo";
import useWindowSize from "../hooks/useWindowSize";
import EnterRoom from "../containers/EnterRoom";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "../styles/chattingStyle";
import { useHistory, useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import url from "../shared/url";
import Stomp from "stompjs";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
import { actionCreators as youtubeActions } from "../redux/modules/youtubeReducer";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const VideoChatRoom = () => {
  const history = useHistory();
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;

  const dispatch = useDispatch();

  // ** 스크롤 핸들러
  const chattingRef = React.useRef();

  // ** params 로 받은 roomId 와 roomName
  const location = useLocation();
  const locationState = location.state;
  const roomName = locationState.roomName;
  const roomId = locationState.roomId;
  console.log(roomName, roomId);

  // ** SockJS 설정
  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };
  const sock = new SockJS(url.WEB_SOCKET);
  const ws = Stomp.over(sock, options);

  // ** ws Open

  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          console.log("hi");
          ws.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              let recv = JSON.parse(message.body);
              console.log(recv);
              if (recv.type === "TALK") {
                dispatch(chatActions.getChat(recv));
                chattingRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (recv.type === "ENTER") {
                dispatch(chatActions.getChat(recv));
                chattingRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (recv.type === "YOUTUBEURL") {
                console.log(recv.message, "유튜브 url");
                dispatch(youtubeActions.youtubeUrl(recv.message));
              } else if (recv.type === "YOUTUBEON") {
                dispatch(youtubeActions.youtubeOn(true));
              } else if (recv.type === "YOUTUBEPAUSE") {
                dispatch(youtubeActions.youtubeOn(false));
              }
            },
            { Authorization: token }
          );
        },
        (error) => {
          console.log("서버연결 실패", error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const disconnected = () => {
    if (ws !== null) {
      ws.disconnect();
      console.log("연결 종료");
    }
  };

  React.useEffect(() => {
    created();
    return () => {
      disconnected();
      history.replace("/");
    };
  }, []);

  return (
    <>
      <Wrap>
        <ContentsWrap>
          <VideoGroupWrap>
            <YoutubeVideo ws={ws} token={token} roomId={roomId} />
            <EnterRoom />
          </VideoGroupWrap>
          <ChatContainer chattingRef={chattingRef} ws={ws} />
        </ContentsWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 93vh;
`;

const VideoGroupWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 79.6vw;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

export default VideoChatRoom;
