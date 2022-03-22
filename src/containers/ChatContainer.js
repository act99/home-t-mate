import styled from "@emotion/styled";
import {
  Avatar,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useStyle from "../styles/chattingStyle";
import SendIcon from "@mui/icons-material/Send";
import { useLocation } from "react-router-dom";
import { sendingMessage } from "../shared/SocketFunc";

import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import useWindowSize from "../hooks/useWindowSize";
import LogoImage from "../assets/loading_image.png";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChatContainer = (props) => {
  // ** window Size
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;

  const { chattingRef, ws } = props;
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
  const username = user.username;

  // ** 메시지 핸들러
  const [sendMessage, setSendMessage] = React.useState({
    type: "TALK",
    roomId: "",
    sender: username,
    message: "",
  });

  // ** input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };

  // ** 엔터 시 채팅 제출
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return sendingMessage(ws, setSendMessage, sendMessage, token);
    }
  };

  React.useEffect(
    () => {
      console.log(nickname);
      setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
      // chattingRef.current.scrollIntoView({ behavior: "smooth" });
      return () => {};
    },
    []

    // [roomId, sendMessage.sender]
  );

  return (
    <>
      <MemberTitle>
        <h3>지금 나와 함께 홈트하는 친구들</h3>
      </MemberTitle>
      <Divider />
      <List
        sx={{
          width: "100%",
          overflow: "auto",
          bgcolor: "background.paper",
          height: "160px",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
            />
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          <ButtonGroup size="large" aria-label="large button group">
            <IconButton>
              <VideocamIcon />
            </IconButton>
            <IconButton>
              <MicIcon />
            </IconButton>
          </ButtonGroup>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
            />
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          <ButtonGroup size="large" aria-label="large button group">
            <IconButton>
              <VideocamIcon />
            </IconButton>
            <IconButton>
              <MicIcon />
            </IconButton>
          </ButtonGroup>
        </ListItem>
      </List>
      <ChatTitle>
        <h3>친구들과 채팅타임</h3>
      </ChatTitle>
      <Divider />
      <List
        sx={{
          height: height - 428,
          overflowY: "auto",
          backgroundColor: "white",
        }}
      >
        {chattingList.map((item, index) =>
          item.sender === nickname ? (
            <ListItem key={index + "" + (item.id + "")}>
              <Grid container>
                <Grid item xs={12}>
                  <ProfileRight>
                    {/* <h3>{item.sender}</h3> */}
                    <h3>나</h3>
                  </ProfileRight>
                  <MyText>
                    <h5>{item.time}</h5>
                    <h3>{item.message}</h3>
                  </MyText>
                </Grid>
              </Grid>
            </ListItem>
          ) : (
            <ListItem key={index + "" + (item.id + "")}>
              <Grid container>
                <Grid item xs={12}>
                  <ProfileLeft>
                    {item.profileImg !== null ? (
                      <Avatar
                        alt="Remy Sharp"
                        src={item.profileImg}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                    ) : (
                      <Avatar
                        alt="Remy Sharp"
                        src={LogoImage}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      />
                    )}

                    <h3>{item.sender}</h3>
                  </ProfileLeft>
                  <OtherText>
                    <h3>{item.message}</h3>
                    <h5>{item.time}</h5>
                  </OtherText>
                </Grid>
              </Grid>
            </ListItem>
          )
        )}
        <div ref={chattingRef} />
      </List>
      <Divider />
      <Grid container style={{ padding: "10px", height: 56 }}>
        <Grid item xs={10}>
          <TextField
            autoComplete="off"
            onKeyDown={onEnterPress}
            // id="outlined-basic-email"
            label="메시지..."
            fullWidth
            value={sendMessage.message}
            onChange={sendingMessageHandler}
          />
        </Grid>
        <Grid item xs={1} align="right" sx={{ display: "flex" }}>
          <IconButton
            onClick={() => {
              sendingMessage(ws, setSendMessage, sendMessage, token);
            }}
          >
            <SendIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

const MemberTitle = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f9f9f9;
  h3 {
    font-size: medium;
    margin-left: 1vw;
  }
`;

const ChatTitle = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f9f9f9;
  h3 {
    font-size: medium;
    margin-left: 1vw;
  }
`;

const ProfileLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  h3 {
    font-size: 12px;
    font-weight: bold;
  }
`;

const ProfileRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  h3 {
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 4px;
  }
`;

const MyText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  width: 100%;
  h3 {
    background-color: #c3e5ae;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
  }
  h5 {
    font-size: 8px;
    font-weight: bold;
    margin: 0px;
    margin-top: 24px;
    margin-right: 8px;
  }
`;

const OtherText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  h3 {
    background-color: #f1e1a6;
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    margin: 0px;
  }
  h5 {
    font-size: 8px;
    font-weight: bold;
    margin: 0px;
    margin-top: 24px;
    margin-left: 8px;
  }
`;

export default ChatContainer;
