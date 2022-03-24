//emoji-picker-react

import React from "react";

// import { Button } from "@mui/material";
import { Button } from "../elements";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { AiOutlineSmile } from "react-icons/ai";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";

import Grid from "../elements/Grid";
import Popover from "@mui/material/Popover";

export default function CommentBox(props) {
  const dispatch = useDispatch();
  // console.log('commentBox', props) id
  const _user = useSelector((state) => state.userReducer.user);

  const commentRef = React.useRef();

  const [comment, setComment] = React.useState("");

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  console.log(_user);
  const addComment = () => {
    if (!_user.is_login) {
      alert("로그인 해주세요");
      return;
    }

    dispatch(commentActions.addCommentDB(props.id, comment, _user));
    setComment("");
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject.emoji);
    setComment(comment + emojiObject.emoji);
  };

  //웃는 아이콘 클릭했을때 이모지 나오게하기
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return addComment();
    }
  };

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
            onClick={handleClick}
            style={{
              color: "#757575",
              marginRight: "8px",
              fontSize: "36",
              marginLeft: "8px",
            }}
          />
          {/* 이모지부분 */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={
              {
                // style: { width: "200px", height: "200px" },
              }
            }
          >
            <Picker
              onEmojiClick={onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          </Popover>

          <input
            ref={commentRef}
            value={comment}
            onChange={handleOnChange}
            className="CommentInputBox"
            placeholder="하고 싶은 말을 남기세요 :)"
            onKeyDown={onEnterPress}
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

        {/* <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
        {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
      </>
    );
  }
  return <div></div>;
}
