import styled from "@emotion/styled";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useStyle from "../styles/chattingStyle";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router-dom";
import { sendingMessage } from "../shared/SocketFunc";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChatContainer = (props) => {
  const { chattingRef, ws } = props;
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

  // ** input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };

  React.useEffect(() => {
    chattingRef.current.scrollIntoView({ behavior: "smooth" });
    setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
    return () => {};
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
