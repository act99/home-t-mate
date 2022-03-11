import styled from "@emotion/styled";
import {
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "../styles/chattingStyle";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import url from "../shared/url";
import Stomp from "stompjs";
import { sendingMessage } from "../shared/SocketFunc";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChatContainer = () => {
  const dispatch = useDispatch();
  const classes = useStyle.makeChattingStyle();
  const chattingList = useSelector((state) => state.chatReducer.list);

  // ** params 로 받은 roomId 와 roomName
  const location = useLocation();
  const locationState = location.state;
  const roomName = locationState.roomName;
  const roomId = locationState.roomId;
  console.log(roomName, roomId);

  // ** user 정보
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;

  // ** 메시지 핸들러
  const [sendMessage, setSendMessage] = React.useState({
    type: "TALK",
    roomId: "",
    sender: "",
    message: "",
  });

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
              dispatch(chatActions.getChat(recv));
              chattingRef.current.scrollIntoView({ behavior: "smooth" });
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

  // ** input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };
  // ** 스크롤 핸들러
  const chattingRef = React.useRef();

  React.useEffect(() => {
    chattingRef.current.scrollIntoView({ behavior: "smooth" });
    setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
    created();
    return () => {
      disconnected();
    };
  }, []);

  return (
    <Wrap>
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
                  <ListItemText align="right" secondary="09:30"></ListItemText>
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
                  <ListItemText align="left" secondary="09:31"></ListItemText>
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
          <IconButton
            onClick={() => {
              sendingMessage(ws, setSendMessage, sendMessage, token);
            }}
          >
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 20vw;
  height: 93vh;
  background-color: aliceblue;
`;

export default ChatContainer;
