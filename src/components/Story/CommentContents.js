import React from "react";
import { Grid, Image } from "../../elements";
import CloseIcon from "@mui/icons-material/Close";
import { actionCreators as commentActions } from "../../redux/modules/commentReducer";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "../../elements";
import useWindowSize from "../../hooks/useWindowSize";
import { useMediaQuery } from "react-responsive";

export default function CommentContents(props) {
  const dispatch = useDispatch();
  const delComment = () => {
    dispatch(commentActions.delCommentDB(props.id, parseInt(props.commentId)));
  };
  const _user = useSelector((state) => state.userReducer.user.id);
  const size = useWindowSize();
  const { width, height } = size;
  const isMobile = useMediaQuery({ query: "(max-width: 1209px)" });

  return (
    <>
      {isMobile ? (
        // width 1209이하일때//////////////////////////////////
        <Grid is_flex>
          <Grid
            is_flex
            align_items="stretch"
            flex_direction="row"
            width="100%"
            padding_left="16px"
            margin="0px 0px 15px 0px"
          >
            <Grid margin="0px" is_flex justify_content="start">
              <Image
                margin="0"
                shape="circle"
                src={props.profileImg}
                size="34"
              />
            </Grid>

            <Grid width="100%" margin_left="10px">
              <Grid height="auto" is_flex>
                <Text margin="1vh 0.5vw 0px 0px" F_size="0.8em">
                  <b width="auto" style={{ marginRight: "1vmin" }}>
                    {props.nickname}
                  </b>
                  {props.comment}
                </Text>
                
                {/* 댓글작성자만 x표시 보이게하기 */}
                {props.userId === _user ? (
                  <CloseIcon
                    sx={{
                      color: "#757575",
                      fontSize: "10px",
                      cursor: "pointer",
                      marginTop: "8px",
                      marginRight: "1vw",
                    }}
                    onClick={delComment}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        // width 1209이상일때//////////////////////////////////
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
              <Image
                margin="0"
                shape="circle"
                src={props.profileImg}
                size="34"
              />
            </Grid>

            <Grid width={width * 0.25 + "px"} margin_left="10px">
              <Grid height="auto" is_flex>
                <Text margin="1vh 0.5vw 0px 0px" F_size="0.9vmax">
                  <b width="auto" style={{ marginRight: "1vmin" }}>
                    {props.nickname}
                  </b>
                  {props.comment}
                </Text>
                <CloseIcon
                  sx={{
                    color: "#757575",
                    fontSize: "1.4vmin",
                    cursor: "pointer",
                    marginTop: "8px",
                  }}
                  onClick={delComment}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
