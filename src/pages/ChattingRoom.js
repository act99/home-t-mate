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
      </div>
    </>
  );
};

export default ChattingRoom;
