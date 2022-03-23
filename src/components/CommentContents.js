import React from "react";
import { Grid, Image } from "../elements";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { useDispatch } from "react-redux";
import { Text } from "../elements";
import { enableCursor } from "@fullcalendar/react";

export default function CommentContents(props) {
  console.log("CommentContentsprops", props);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   return () => {};
  // }, [props]);

  const delComment = () => {
    dispatch(commentActions.delCommentDB(props.id, props.commentId));
  };

  return (
    <Grid is_flex flex_direction="column">
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

        <Grid width="297px" margin_left="16px">
          <Grid height="auto" is_flex flex_wrap="wrap">
            <Text margin="7px 10px 0px 0px" F_size="16px">
              <b width="auto" margin="5px 10px 5px 5px">
                {props.nickname}
              </b>
              {props.comment}
            </Text>
            <CloseIcon
              sx={{ color: "#757575", fontSize: "13px", cursor:"pointer" }}
              onClick={delComment}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
