import React from "react";
import { Grid, Image } from "../elements";
import CloseIcon from "@mui/icons-material/Close";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { useDispatch } from "react-redux";
import { Text } from "../elements";
import useWindowSize from "../hooks/useWindowSize";
import { useMediaQuery } from "react-responsive";

export default function CommentContents(props) {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   return () => {};
  // }, [props]);

  const delComment = () => {
    dispatch(commentActions.delCommentDB(props.id, props.commentId));
  };

  const size = useWindowSize();
  const { width, height } = size;

  const isMobile = useMediaQuery({ query: "(max-width: 1209px" });

  return (
    <Grid is_flex flex_direction="column">
      <Grid
        is_flex
        flex_wrap="wrap"
        align_items="stretch"
        flex_direction="row"
        width={width * 0.3 + "px"}
        
        padding_left="16px"
        margin="0px 0px 15px 0px"
      >
        <Grid
          margin="0px"
          // height={width * 0.1 + "px"}
          is_flex
          flex_direction="column"
          justify_content="start"
        >
          <Image margin="0" shape="circle" src={props.profileImg} size="34" />
        </Grid>

        <Grid width={width * 0.25 + "px"} margin_left="10px">
          <Grid height="auto" is_flex>
            <Text margin="1vh 0.5vw 0px 0px" F_size="0.9vmax">
              <b width="auto" style={{marginRight:"1vmin"}}>
                {props.nickname}
              </b>
              {props.comment}
            </Text>
            <CloseIcon
              sx={{ color: "#757575", fontSize: "1.4vmin", cursor: "pointer", marginTop:"8px"}}
              onClick={delComment}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
