import React from "react";
import ChatMsg from "../styles/Chat";
import styled from "@emotion/styled";
import useWindowSize from "../hooks/useWindowSize";
import { IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatContainer = () => {
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;
  console.log(width, height);

  const [value, setValue] = React.useState("Controlled");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Wrap>
      <ChatBox>
        <ChatMsg
          avatar={
            "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
          }
          messages={[
            "Hi Jenny, How r u today?",
            "Did you train yesterday",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.",
          ]}
        />
        <ChatMsg
          side={"right"}
          messages={[
            "Great! What's about you?",
            "Of course I did. Speaking of which check this out",
          ]}
        />
        <ChatMsg
          avatar={
            "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
          }
          messages={["Im good.", "See u later."]}
        />
      </ChatBox>
      <TextFieldArea>
        <TextField
          id="outlined-multiline-flexible"
          label="메시지"
          multiline
          maxRows={2}
          value={value}
          onChange={handleChange}
          fullWidth={true}
          // sx={{w }}
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </TextFieldArea>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-width: 300px;
  width: 20vw;
  height: 91vh;
  border-right: solid 1px;
  border-left: solid 1px;
  /* border-bottom: solid 1px; */
  border-top: solid 0px;
  padding: 10px;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 80vh;
`;

const TextFieldArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default ChatContainer;
