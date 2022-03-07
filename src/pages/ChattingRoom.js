import {
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import SendIcon from "@mui/icons-material/Send";
import useStyle from "../styles/chattingStyle";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
import { sendingMessage } from "../shared/SocketFunc";
import url from "../shared/url";
import "../App.css";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChattingRoom = () => {
  const classes = useStyle.makeChattingStyle();
  const dispatch = useDispatch();

  // ** params 로 받은 roomId 와 roomName
  const location = useLocation();
  const locationState = location.state;
  const roomName = locationState.roomName;
  const roomId = locationState.roomId;

  // ** user 정보
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;

  // ** SockJS 설정
  const sock = new SockJS(url.WEB_SOCKET);

  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };
  const ws = Stomp.over(sock, options);

  // ** 메시지 보내기 위한 핸들러
  const [sendMessage, setSendMessage] = React.useState({
    type: "TALK",
    roomId: "",
    sender: "",
    message: "",
  });
  // input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };

  const chattingList = useSelector((state) => state.chatReducer.list);

  // ** 스크롤 핸들러
  const chattingRef = React.useRef();
  // ** ws open
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
              switch (recv.type) {
                case "TALK":
                  log("채팅방 토크");
                  dispatch(chatActions.getChat(recv));
                  break;
                case "OFFER":
                  log("Signal OFFER received");
                  handleOfferMessage(recv);
                  break;
                case "ANSWER":
                  log("Signal ANSWER received");
                  handleAnswerMessage(recv);
                  break;
                case "ICE":
                  log("Signal ICE Candidate received");
                  handleNewICECandidateMessage(recv);
                  break;
                case "ENTER":
                  log(
                    "Client is starting to " +
                      (message.data === "true)"
                        ? "negotiate"
                        : "wait for a peer")
                  );
                  handlePeerConnection(message);
                  break;

                default:
                  handleErrorMessage("Wrong type message received from server");
              }

              // recvMessage(recv);
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

  // ** 비디오 테스트 시작
  // ** pc => PeerConnection

  const peerConnectionConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun01.sipphone.com" },
      { urls: "stun:stun.ekiga.net" },
      { urls: "stun:stun.fwdnet.net" },
      { urls: "stun:stun.ideasip.com" },
      // { urls: "stun:stun.stunprotocol.org:3478" },
      // { urls: "stun:stun.l.google.com:19302" }, // P2P 연결의 중계서버는 구글에서 무료로 지원하는 Google STUN 서버
    ],
  };

  let myPeerConnection;
  let localStream;
  let localVideoTracks;
  //   const [socket, setSocket] = React.useState();
  let localVideoRef = React.useRef(null);
  let remoteVideoRef = React.useRef(null);

  const mediaConstraints = {
    video: true,
    // video: { width: { exact: 640 }, height: { exact: 480 } },
    audio: true,
  };
  const videoButtonOff = () => {
    localVideoTracks = localStream.getVideoTracks();
    localVideoTracks.forEach((track) => localStream.removeTrack(track));
    localVideoRef.current.display = "none";
    console.log("video off");
  };
  const videoBUttonOn = () => {
    localVideoTracks.forEach((track) => localStream.addTrack(track));
    localVideoRef.current.display = "inline";
    console.log("video on");
  };
  const audioButtonOff = () => {
    localVideoRef.current.muted = true;
    console.log("Audio off");
  };
  const audioButtonOn = () => {
    localVideoRef.current.muted = false;
    console.log("Audio On");
  };
  const exitButton = () => {
    stop();
  };

  const getMedia = async (constraints) => {
    try {
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(getLocalMediaStream)
        .catch(handleGetUserMediaError);
    } catch (error) {
      console.log(error);
    }
  };

  const log = (msg) => {
    console.log(msg);
  };
  const handleErrorMessage = (msg) => {
    console.error(msg);
  };
  const sendToServer = (msg) => {
    let msgJSON = JSON.stringify(msg);
    ws.send(`/pub/chat/message`, { Authorization: token }, msgJSON);
  };

  async function handleICECandidateEvent(event) {
    try {
      if (event.candidate) {
        sendToServer({
          from: nickname,
          type: "ICE",
          candidate: event.candidate,
        });
        log("ICE Candidate Event: ICE candidate sent");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createPeerConnection = async () => {
    try {
      myPeerConnection = new RTCPeerConnection(peerConnectionConfig);
      myPeerConnection.onicecandidate = handleICECandidateEvent;
      myPeerConnection.ontrack = handleTrackEvent;
    } catch (error) {
      console.log(error);
    }
  };
  const handlePeerConnection = async (msg) => {
    try {
      createPeerConnection();
      getMedia(mediaConstraints);
      if (msg.data === "true") {
        myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLocalMediaStream = async (mediaStream) => {
    try {
      localStream = mediaStream;
      localVideoRef.current.srcObject = mediaStream;
      localStream
        .getTracks()
        .forEach((track) => myPeerConnection.addTrack(track, localStream));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUserMediaError = (error) => {
    log("navigator.getUserMedia error: ", error);
    switch (error.name) {
      case "NotFoundError":
        alert(
          "Unable to open your call because no camera and/or microphone were found."
        );
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + error.message);
        break;
    }

    stop();
  };

  async function handleTrackEvent(event) {
    try {
      log("Track Event: set stream to remote video element");
      remoteVideoRef.current.srcObject = event.streams[0];
    } catch (error) {
      console.log(error);
    }
  }

  function handleNegotiationNeededEvent() {
    myPeerConnection
      .createOffer()
      .then(function (offer) {
        console.log(offer);
        return myPeerConnection.setLocalDescription(offer);
      })
      .then(function () {
        console.log(myPeerConnection.localDescription);
        sendToServer({
          from: nickname,
          type: "OFFER",
          sdp: myPeerConnection.localDescription,
        });
        log("Negotiation Needed Event: SDP offer sent");
      })
      .catch(function (reason) {
        // an error occurred, so handle the failure to connect
        handleErrorMessage("failure to connect error: ", reason);
      });
  }
  // ** 제일 중요한 오퍼
  function handleOfferMessage(message) {
    log("Accepting Offer Message");
    log(message);
    let desc = new RTCSessionDescription(message.sdp);
    //TODO test this
    if (desc != null && message.sdp != null) {
      log("RTC Signalling state: " + myPeerConnection.signalingState);
      myPeerConnection
        .setRemoteDescription(desc)
        .then(function () {
          log("Set up local media stream");
          return navigator.mediaDevices.getUserMedia(mediaConstraints);
        })
        .then(function (stream) {
          log("-- Local video stream obtained");
          localStream = stream;
          try {
            localVideoRef.current.srcObject = localStream;
          } catch (error) {
            localVideoRef.current.src = window.URL.createObjectURL(stream);
          }

          log("-- Adding stream to the RTCPeerConnection");
          localStream
            .getTracks()
            .forEach((track) => myPeerConnection.addTrack(track, localStream));
        })
        .then(function () {
          /**
           * Client2는 응답을 인자로 전달하는 성공 콜백 함수 createAnswer()를 호출
           */
          log("-- Creating answer");
          // Now that we've successfully set the remote description, we need to
          // start our stream up locally then create an SDP answer. This SDP
          // data describes the local end of our call, including the codec
          // information, options agreed upon, and so forth.
          return myPeerConnection.createAnswer();
        })
        .then(function (answer) {
          /**
           * Client2는 setLocalDescription()의 호출을 통해
           * Client2의 응답을 로컬 기술(Description)으로 설정합니다.
           */
          log("-- Setting local description after creating answer");
          // We now have our answer, so establish that as the local description.
          // This actually configures our end of the call to match the settings
          // specified in the SDP.
          return myPeerConnection.setLocalDescription(answer);
        })
        .then(function () {
          /**
           * Client2는 시그널링 메커니즘을 사용하여 자신의 문자열화된 응답을 Client1에게 다시 전송합니다.
           */
          log("Sending answer packet back to other peer");
          sendToServer({
            from: nickname,
            type: "ANSWER",
            sdp: myPeerConnection.localDescription,
          });
        })
        // .catch(handleGetUserMediaError);
        .catch(handleErrorMessage);
    }
  }

  async function handleAnswerMessage(message) {
    try {
      myPeerConnection
        .setRemoteDescription(message.sdp)
        .catch(handleErrorMessage);
    } catch (error) {
      console.log(error);
    }
    log("The peer has accepted request");

    // Configure the remote description, which is the SDP payload
    // in our "video-answer" message.
    // myPeerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp)).catch(handleErrorMessage);
  }

  function handleNewICECandidateMessage(message) {
    let candidate = new RTCIceCandidate(message.candidate);
    log("Adding received ICE candidate: " + JSON.stringify(candidate));
    myPeerConnection.addIceCandidate(candidate).catch(handleErrorMessage);
  }

  // ws.connect(
  //   { Authorization: token },
  //   (frame) => {
  //     console.log("hi");
  //     ws.subscribe(
  //       `/sub/chat/room/${roomId}`,
  //       (message) => {
  //         let recv = JSON.parse(message.body);
  //         console.log(recv);
  //         dispatch(chatActions.getChat(recv));
  //         // recvMessage(recv);
  //       },
  //       { Authorization: token }
  //     );
  //   },
  //   (error) => {
  //     console.log("서버연결 실패", error);
  //   }
  // );

  // function start() {
  //   // add an event listener for a message being received

  //   ws.subscribe(
  //     `/sub/chat/room/${roomId}`,
  //     (msg) => {
  //       let message = JSON.parse(msg.data);
  //     },
  //     { Authorization: token }
  //   );
  // }
  function stop() {
    // send a message to the server to remove this client from the room clients list
    log("Send 'leave' message to server");
    sendToServer({
      from: nickname,
      type: "leave",
      data: roomId,
    });

    if (myPeerConnection) {
      log("Close the RTCPeerConnection");

      // disconnect all our event listeners
      myPeerConnection.onicecandidate = null;
      myPeerConnection.ontrack = null;
      myPeerConnection.onnegotiationneeded = null;
      myPeerConnection.oniceconnectionstatechange = null;
      myPeerConnection.onsignalingstatechange = null;
      myPeerConnection.onicegatheringstatechange = null;
      myPeerConnection.onnotificationneeded = null;
      myPeerConnection.onremovetrack = null;

      // Stop the videos
      if (remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
      if (localVideoRef.current.srcObject) {
        localVideoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }

      remoteVideoRef.current.src = null;
      localVideoRef.current.src = null;

      // close the peer connection
      myPeerConnection.close();
      myPeerConnection = null;

      log("Close the socket");
      if (ws != null) {
        ws.disconnect();
      }
    }
  }
  const gogoRef = React.useRef();

  React.useEffect(() => {
    // chattingRef.current.scrollIntoView({ behavior: "smooth" });
    setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
    created();
    return () => disconnected();
  }, [roomId]);

  return (
    <>
      <div>
        <Grid container className={classes.chatSection}>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              {chattingList.map((item, index) =>
                item.sender === nickname ? (
                  <ListItem key={index + "" + (item.id + "")}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          primary={item.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          secondary="09:30"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ) : (
                  <ListItem key={index + "" + (item.id + "")}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          primary={item.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          secondary="09:31"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              )}
              <div ref={chattingRef} />
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={sendMessage.message}
                  onChange={sendingMessageHandler}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    sendingMessage(ws, setSendMessage, sendMessage, token);
                  }}
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <h1>sdfjksldjf;k</h1>
          <video autoPlay playsInline />
          <video ref={localVideoRef} autoPlay playsInline />
          <button onClick={videoBUttonOn}>비디오 온</button>
          <button onClick={videoButtonOff}>비디오 비디오 오프</button>
          <button onClick={audioButtonOn}>마이크 온</button>
          <button onClick={audioButtonOff}>마이크 오프</button>
          <button onClick={exitButton}>나가기</button>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
