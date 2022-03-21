import React from "react";
import { Grid, Input, Image, Text } from "../elements";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { actionCreators as commentActions} from "../redux/modules/commentReducer";
import {useDispatch, useSelector} from "react-redux";

export default function CommentContents(props) {
  console.log('CommentContentsprops', props)
  const dispatch = useDispatch();

//   React.useEffect(()=>{
//     dispatch(commentActions.getComment(props.postKey));
// },[])

  const delComment= ()=>{
    dispatch(commentActions.delCommentDB(props.id, props.commentId));
}
  return (
    <Grid
      is_flex
      flex_wrap="wrap"
      align_items="stretch"
      flex_direction="row"
      width="545px"
      padding_left="16px"
      margin="0px"
    >
      <Grid
        margin="0px"
        height="50px"
        is_flex
        flex_direction="column"
        justify_content="start"
      >
        <Image
          margin="0"
          shape="circle"
          src={props.profileImageUrl}
          size="35"
        />
      </Grid>

      <Grid width="460px" margin_left="16px">
        <Typography variant="body2" color="black" align="justify">
          <strong>{props.nickname}</strong>
          {props.comment}
          <CloseIcon
            sx={{ color: "black", fontSize: 20 }}
            onClick={delComment}
          />
        </Typography>

        <Grid>
          
        </Grid>

        {/* <Grid margin_top="10px">
          <Typography
            variant="body2"
            color="text.secondary"
            align="justify"
            margin-top="10px"
          >
          </Typography>
        </Grid> */}
      </Grid>
    </Grid>
  );
}
