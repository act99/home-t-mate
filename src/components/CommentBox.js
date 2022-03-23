//emoji-picker-react

import React, { useState } from "react";

// import { Button } from "@mui/material";
import { Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { AiOutlineSmile } from "react-icons/ai";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import Grid from "../elements/Grid";

export default function CommentBox(props) {
  const dispatch = useDispatch();
  // console.log('commentBox', props) id
  const _user = useSelector((state) => state.userReducer.user);

  const comment = React.useRef();

  console.log(_user);
  const addComment = () => {
    if (!_user.is_login) {
      alert("로그인 해주세요");
      return;
    }

    dispatch(
      commentActions.addCommentDB(props.id, comment.current.value, _user)
    );
    comment.current.value = "";
  };

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const EmojiData = ({ chosenEmoji }) => (
    <div>
      <strong>Unified:</strong> {chosenEmoji.unified}
      <br />
      <strong>Names:</strong> {chosenEmoji.names.join(", ")}
      <br />
      <strong>Symbol:</strong> {chosenEmoji.emoji}
      <br />
      <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
    </div>
  );

  if (_user.is_login) {
    return (
      <>
        <Grid
          is_flex
          margin="0px 16px 20px 16px"
          justify_content="space-between"
          B_radius="20px"
          Border="2px solid #757575"
          width="auto"
          height="58px"
        >
          <AiOutlineSmile
            style={{
              color: "#757575",
              marginRight: "8px",
              fontSize: "36",
              marginLeft: "8px",
            }}
          />
          <input
            ref={comment}
            className="CommentInputBox"
            placeholder="하고 싶은 말을 남기세요 :)"
          ></input>
          <Button
            _onClick={addComment}
            BG_color="white"
            border="none"
            B_radius="20px"
            F_size="18px"
            font_color="#587730"
          >
            댓글달기
          </Button>
        </Grid>

        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
        {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
      </>
    );
  }
  return <div></div>;
}
