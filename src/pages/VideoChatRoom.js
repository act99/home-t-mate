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
import { apis } from "../shared/api";
import ChatNav from "../containers/ChatNav";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const VideoChatRoom = () => {
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;
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
  const { roomName, roomId, video, audio, password } = locationState;

  console.log(roomName, roomId, video, audio);

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
          // alert("방 인원이 꽉 찼습니다.");
          // history.replace("/");
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
    apis
      .enterRoom(roomId, password)
      .then((res) => {
        created();
      })
      .catch((error) => console.log(error.response.message));
    // created();
    return () => {
      apis
        .leaveRoom(roomId)
        .then((res) => {})
        .catch((error) => console.log(error));
      disconnected();
      history.replace("/");
      history.go(0);
      // disconnected();
      // history.replace("/");
    };
  }, []);

  if (width <= 600) {
    <TabletWrap></TabletWrap>;
  }

  return (
    <>
      <Wrap>
        <ChatNav roomName={roomName} roomId={roomId} />
        <WrapContents>
          <YoutubeWrap>
            <YoutubeVideo ws={ws} token={token} roomId={roomId} />
          </YoutubeWrap>
          <EnterRoom
            roomId={roomId}
            nickname={nickname}
            video={video}
            audio={audio}
          />
          <ChatContainer chattingRef={chattingRef} ws={ws} />
        </WrapContents>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 1920px;
  height: 937px;
  background-color: #f9f9f9;
`;

const WrapContents = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabletWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: beige;
  flex-direction: column;
`;

const YoutubeWrap = styled.div`
  width: 1280px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export default VideoChatRoom;
