import styled from "@emotion/styled";
import {
  Container,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useStyle from "../styles/chattingStyle";
import SendIcon from "@mui/icons-material/Send";

const ChatContainer = () => {
  const classes = useStyle.makeChattingStyle();
  const chattingList = useSelector((state) => state.chatReducer.list);
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;

  // ** 메시지 핸들러
  const [sendMessage, setSendMessage] = React.useState({
    type: "TALK",
    roomId: "",
    sender: "",
    message: "",
  });
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };
  // ** 스크롤 핸들러
  const chattingRef = React.useRef();

  React.useEffect(() => {
    chattingRef.current.scrollIntoView({ behavior: "smooth" });
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
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              console.log("메시지 보내기");
              // sendingMessage(ws, setSendMessage, sendMessage, token);
            }}
          >
            <SendIcon />
          </Fab>
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
