import styled from "@emotion/styled";
import React from "react";
import ChatContainer from "../containers/ChatContainer";
import YoutubeVideo from "../components/YoutubeVideo";
import useWindowSize from "../hooks/useWindowSize";
import EnterRoom from "../containers/EnterRoom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import url from "../shared/url";
import Stomp from "stompjs";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
import { actionCreators as youtubeActions } from "../redux/modules/youtubeReducer";
import { apis } from "../shared/api";
import ChatNav from "../containers/ChatNav";
import { actionCreators as subscribersActions } from "../redux/modules/subscriberReducer";
import { sendQuitRoom } from "../shared/SocketFunc";
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
  const { roomName, roomId, password, host, hostImg } = locationState;
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
    console.log("유저가 나감");
  };

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
                dispatch(subscribersActions.getSubscribers(recv));
                chattingRef.current.scrollIntoView({ behavior: "smooth" });
              } else if (recv.type === "YOUTUBEURL") {
                dispatch(youtubeActions.youtubeUrl(recv.message));
                setWorkOut(true);
              } else if (recv.type === "YOUTUBEON") {
                dispatch(youtubeActions.youtubeOn(true));
              } else if (recv.type === "YOUTUBEPAUSE") {
                dispatch(youtubeActions.youtubeOn(false));
              } else if (recv.type === "YOUTUBESTOP") {
                setWorkOut(false);
              } else if (recv.type === "QUIT") {
                console.log("나갔음");
                dispatch(chatActions.getChat(recv));
                dispatch(subscribersActions.leaveSubscribers(recv));
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
  const onbeforeunload = () => {
    disconnected();
    handleQuit();
  };

  React.useEffect(() => {
    apis
      .enterRoom(roomId, password)
      .then((res) => {
        dispatch(subscribersActions.getSubscribers(res.data));
        window.addEventListener("beforeunload", onbeforeunload);
        created();
      })
      .catch((error) => console.log(error.response.message));
    setQuit({ roomId: roomId, sender: user.nickname });
    // created();
    return () => {
      apis
        .leaveRoom(roomId)
        .then((res) => {
          window.removeEventListener("beforeunload", onbeforeunload);
          disconnected();
        })
        .catch((error) => console.log(error));
      handleQuit();
      history.replace("/");
      history.go(0);
    };
  }, []);

  // if (width <= 600) {
  //   <TabletWrap></TabletWrap>;
  // }

  return (
    <>
      <Wrap>
        <ChatNav roomName={roomName} roomId={roomId} handleQuit={handleQuit} />
        <YoutubeTest height={height}>
          <YoutubeVideo
            ws={ws}
            token={token}
            roomId={roomId}
            workOut={workOut}
            password={locationState.password}
            roomName={roomName}
            host={host}
            hostImg={hostImg}
          />
        </YoutubeTest>
        <VideoTest height={height}>
          <EnterRoom
            roomId={roomId}
            nickname={nickname}
            video={video}
            audio={audio}
            password={locationState.password}
            host={host}
          />
        </VideoTest>
        <ChattingTest height={height}>
          <ChatContainer chattingRef={chattingRef} ws={ws} />
        </ChattingTest>
        {/* <WrapContents>
          <YoutubeVideo ws={ws} token={token} roomId={roomId} />
          <EnterRoom
            roomId={roomId}
            nickname={nickname}
            video={video}
            audio={audio}
          />
          <ChatContainer chattingRef={chattingRef} ws={ws} />
        </WrapContents> */}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  background-color: #f9f9f9;
`;

const YoutubeTest = styled.div`
  width: 65%;
  height: ${(props) => props.height - 56}px;
  position: absolute;
  background-color: #f9f9f9;
`;

const VideoTest = styled.div`
  width: 15%;
  height: ${(props) => props.height - 56}px;
  position: absolute;
  background-color: #f9f9f9;
  left: 65%;
  border-left: solid 1px #e0e0e0;
`;

const ChattingTest = styled.div`
  width: 20%;
  height: ${(props) => props.height - 56}px;
  position: absolute;
  background-color: #f9f9f9;
  left: 80%;
`;

const TabletWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  flex-direction: column;
`;

export default VideoChatRoom;
