//import Library
import React, {useState} from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button, Typography, Box, Modal } from "@mui/material";
import { useSelector,useDispatch} from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";

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
  const [comment_text, setCommentText] = useState()
  // const comment = React.useRef();
  const _user = useSelector((state) => state.userReducer.user);

  const onChange = (e) => {
    setCommentText(e.target.value);
}

  const write = () => {
    const data = {
        comment: comment_text
    }
    console.log(data)
    dispatch(commentActions.addCommentDB(props.id, data))
    document.location.reload();
}

//   const addComment = () =>{
//     if(!_user.is_login){
//       alert("로그인을 하셔야 사용이 가능합니다.");
//         return;
//     }
//     dispatch(commentActions.addCommentDB(props.postKey,comment.current.value));
//     comment.current.value="";
// }

  return (
    <Grid is_flex margin_left="16px" justify_content="space-between">
      <SentimentSatisfiedAltIcon className="SmileButton" fontSize="medium" />
      <input _onChange={onChange}
                value={comment_text}
                is_Submit 
                onSubmit={write} className="CommentInputBox" placeholder="댓글 달기..."></input>
      <Button onClick={write} variant="text">게시</Button>
    </Grid>
  );
}
