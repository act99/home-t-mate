import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DetailCardheader from "./DetailCardheader";
import LikeComment from "./LikeComment";
import CommentContents from "./CommentContents";
import Grid from "../elements/Grid";
import Img from "./Img";
import CommentBox from "./CommentBox";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { BsChat } from "react-icons/bs";
import { Text } from "../elements";

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
  // id={props.id}

  const _post = useSelector((state) => state.postReducer.list);
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x), "");
  const thisPostPhoto = thisPost.photoResponseDto;

  const commentState = useSelector((state) => state.commentReducer.list)[
    `${props.id}`
  ];

  const comment = useSelector((state) => state.commentReducer.list);
  const thisComment = comment[`${props.id}`];
  console.log(thisPost.likeUserDto);

  React.useEffect(() => {
    if (!commentState) {
      dispatch(commentActions.getCommentDB(props.id));
    }
  }, []);

  return (
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
        <DetailCardheader
          id={thisPost.id}
          username={thisPost.nickname}
          userImg={thisPost.userImg}
        />
        <div
          className="commentlist"
          style={{ height: "592px", overflow: "auto" }}
        >
          {/* 글 내용 */}
          <Typography
            variant="body2"
            color="black"
            align="justify"
            marginLeft="16px"
            marginRight="16px"
            marginBottom="13px"
            fontFamily="GmarketSansMedium"
            fontSize="18px"
          >
            {thisPost.content}
          </Typography>

          {/* 댓글몇개인지 보이기 */}
          <Grid is_flex B_top="2px solid #D3D3D3" margin_bottom="10px">
            <BsChat size="24" style={{ margin: "15px 10px 17px 16px" }} />
            <Text>총 {commentState && commentState.length}개의 댓글</Text>
          </Grid>

          {/* 댓글 보이기 */}
          {thisComment &&
            thisComment.map((v, i) => (
              <CommentContents key={i} {...v} id={props.id} />
            ))}
        </div>

        {/* 댓글작성부분 */}
        <Grid position="absolute" bottom="0px" width="545px">
          <Grid is_flex>
            <LikeComment
              id={props.id}
              modal={false}
              none="none"
              default="default"
            />
            <Grid is_flex position="relative" left="-40px">
            {thisPost.likeUserDto && thisPost.likeUserDto.length > 0 ? (
              <Text margin_top="8px">
                {thisPost.likeUserDto[0].nickname}님 외{" "}
                {thisPost.likeUserDto.length - 1}명이 이 스토리를 좋아해요
              </Text>
            ) : (
              <Text margin_top="8px">
                좋아요를 처음 누른 친구가 되어봐요 :)
              </Text>
            )}</Grid>
          </Grid>
          <CommentBox id={props.id} />
        </Grid>
      </Grid>
    </Box>
  );
}
