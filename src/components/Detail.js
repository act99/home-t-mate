import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cardheader from "./Cardheader";
import LikeComment from "./LikeComment";
import CommentContents from "./CommentContents";
import Grid from "../elements/Grid";
import Img from "./Img";
import CommentBox from "./CommentBox";
// import CardText from "./CardText";
import { useDispatch, useSelector } from "react-redux";
import { borderRadius } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1345,
  height: 800,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  padding: 0,
};

export default function Detail(props) {
  const dispatch = useDispatch();
  const { commentUserDto } = props;
  // id={props.id}
  console.log("Detail props용", props); //post id값, comment어쩌구

  const _post = useSelector((state) => state.postReducer.list);
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x), "");
  const thisPostPhoto = thisPost.photoResponseDto;

  console.log("postReducer확인용", _post);
  console.log("thispost확인용", thisPost);

  const commentState = useSelector((state) => state.commentReducer.list)[
    `${props.id}`
  ];

  React.useEffect(() => {
    dispatch(commentActions.getCommentDB(props.id));
  }, []);

  return (
    <div>
      <Box sx={style}>
        <div style={{ width: "800px" }}>
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            height={props.size}
            width={props.size}
          >
            {thisPostPhoto &&
              thisPostPhoto.map((v, i) => (
                <Img key={i} {...v} size="800px" border="20px" />
              ))}
          </Carousel>
        </div>

        <Grid width="545px">
          {/* id={props.id} username={props.nickname} userImg={props.userImgUrl} */}
          <Cardheader
            id={thisPost.id}
            username={thisPost.nickname}
            userImg={thisPost.userImg}
          />
          <div
            className="commentlist"
            style={{ height: "640px", overflow: "auto" }}
          >
            {/* 글 내용 */}
            <Typography
              variant="body2"
              color="black"
              align="justify"
              marginLeft={"16px"}
            >
              {thisPost.content}
            </Typography>

            {/* 댓글 보이기 */}
            {commentState && commentState.map((v, i) => (
              <CommentContents key={i} {...v} id={props.id} />
            ))}
          </div>

          {/* 댓글작성부분 */}
          <Grid position="absolute" bottom="0px" width="545px">
            <LikeComment id={props.id} modal={false} />
            <CommentBox id={props.id} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
