//import Library
import React, {useState} from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button, Typography, Box, Modal } from "@mui/material";
import { useSelector,useDispatch} from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import Input from "../elements/Input";
//import Actions

//import elements
import Grid from "../elements/Grid";

//import Icon

// impot Component
//import Actions

//import axios

export default function CommentBox(props) {
  const dispatch = useDispatch();
  // console.log('commentBox', props) id
  // const comment = React.useRef();
  const _user = useSelector((state) => state.userReducer.user);

  const comment = React.useRef();

  const addComment = () =>{
    if(!_user.is_login){
      alert('로그인 해주세요');
        return;
    }
    dispatch(commentActions.addCommentDB(props.id,comment.current.value));
    comment.current.value="";
}

//   const write = () => {
//     const data = {
//         content: comment_text
//     }
//     console.log(data)
//     dispatch(commentActions.addCommentDB(props.id, data))
//     document.location.reload();
// }


  return (
    <Grid is_flex margin_left="16px" justify_content="space-between">
      <SentimentSatisfiedAltIcon className="SmileButton" fontSize="medium" />
      <input ref={comment} className="CommentInputBox" placeholder="댓글 달기..."></input>
      <Button onClick={addComment} variant="text">게시</Button>
    </Grid>
  );
}
