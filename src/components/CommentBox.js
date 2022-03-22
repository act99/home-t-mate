import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";

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

  if (_user.is_login) {
    return (
      <Grid is_flex margin_left="16px" justify_content="space-between">
        <SentimentSatisfiedAltIcon className="SmileButton" fontSize="medium" />
        <input
          ref={comment}
          className="CommentInputBox"
          placeholder="댓글 달기..."
        ></input>
        <Button onClick={addComment} variant="text">
          게시
        </Button>
      </Grid>
    );
  }
  return <div></div>;
}
