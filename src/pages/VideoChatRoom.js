import styled from "@emotion/styled";
import React from "react";
import ChatContainer from "../containers/VideoChatRoom/ChatContainer";
import YoutubeVideo from "../containers/VideoChatRoom/YoutubeVideo";
import useWindowSize from "../hooks/useWindowSize";
import EnterRoom from "../containers/VideoChatRoom/EnterRoom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import url from "../shared/url";
import Stomp from "stompjs";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
import { actionCreators as youtubeActions } from "../redux/modules/youtubeReducer";
import { apis } from "../shared/api";
import ChatNav from "../containers/VideoChatRoom/ChatNav";
import { actionCreators as subscribersActions } from "../redux/modules/subscriberReducer";
import { sendQuitRoom } from "../shared/SocketFunc";
import { getCookie } from "../shared/Cookie";

const token = getCookie("token");
const VideoChatRoom = (props) => {
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
  const { roomName, roomId, password, host, hostImg, myStatus } = locationState;
  const myVideo = useSelector((state) => state.videoReducer.video);
  const { audio, video } = myVideo;

  // ** SockJS 설정
  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };
  const sock = new SockJS(url.WEB_SOCKET);
  const ws = Stomp.over(sock, options);

  // ** 유튜브 재생 시 운동 중
  const [workOut, setWorkOut] = React.useState(false);

  // ** 나갈 때
  const [quit, setQuit] = React.useState({
    type: "QUIT",
    roomId: "",
    sender: "",
  });
  const handleQuit = () => {
    sendQuitRoom(ws, token, quit);
  };

  // ** ws Open

  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          ws.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              let recv = JSON.parse(message.body);
              if (recv.type === "TALK") {
                dispatch(chatActions.getChat(recv));
                chattingRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (recv.type === "ENTER") {
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.getSubscribers(recv));
                chattingRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (recv.type === "YOUTUBEURL") {
                dispatch(youtubeActions.youtubeUrl(recv.message));
                setWorkOut(true);
              } else if (recv.type === "YOUTUBEON") {
                setWorkOut(true);
                dispatch(youtubeActions.youtubeOn(true));
              } else if (recv.type === "YOUTUBEPAUSE") {
                dispatch(youtubeActions.youtubeOn(false));
                setWorkOut(false);
              } else if (recv.type === "YOUTUBESTOP") {
                setWorkOut(false);
              } else if (recv.type === "QUIT") {
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.leaveSubscribers(recv));
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
  const onbeforeunload = () => {
    apis
      .leaveRoom(roomId)
      .then((res) => {
        disconnected();
        handleQuit();
      })
      .catch((error) => {
        console.log(error);
        disconnected();
        handleQuit();
      });
  };

  React.useEffect(() => {
    setQuit({ roomId: roomId, sender: user.nickname });
    apis
      .enterRoom(roomId, password)
      .then((res) => {
        dispatch(subscribersActions.getSubscribers(res.data));
        window.addEventListener("beforeunload", onbeforeunload);
        created();
        // joinSession();
      })
      .catch((error) => console.log(error.response.message));
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
      history.replace("/");
      history.go(0);
    };
  }, []);

  return (
    <>
      <Wrap width={width} height={height}>
        <ChatNav roomName={roomName} roomId={roomId} handleQuit={handleQuit} />
        <YoutubeVideo
          chattingRef={chattingRef}
          ws={ws}
          token={token}
          roomId={roomId}
          workOut={workOut}
          password={locationState.password}
          roomName={roomName}
          host={host}
          hostImg={hostImg}
        />
        <EnterRoom
          roomId={roomId}
          nickname={nickname}
          video={video}
          audio={audio}
          password={locationState.password}
          host={host}
          myStatus={myStatus}
          width={width}
          height={height}
        />
        <ChatContainer chattingRef={chattingRef} ws={ws} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  ${(props) =>
    props.width < props.height
      ? `  width: ${(props) => props.width}px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;`
      : `position: absolute;
width: 100%;
background-color: #f9f9f9;`}
`;

const MWrap = styled.div``;

export default VideoChatRoom;
