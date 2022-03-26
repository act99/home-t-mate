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
import useWindowSize from "../hooks/useWindowSize";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  padding: 0, 

  // paddingTop: "200%",
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

  const size = useWindowSize();
  const { width, height } = size;

  return (
    <Box sx={style}>
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          height={width * 0.4 + "px"}
          minHeight="557px"
          width={width * 0.4 + "px"}
          minWidth="975px"
        >
          {thisPostPhoto &&
            thisPostPhoto.map((v, i) => (
              <Img key={i} {...v} size={width * 0.4 + "px"} border="20px" />
            ))}
        </Carousel>


      <Grid width={width * 0.3 + "px"}>
        <DetailCardheader
          id={thisPost.id}
          username={thisPost.nickname}
          userImg={thisPost.userImg}
          createdAt={thisPost.createdAt}
        />
        <div
          className="commentlist"
          style={{ height: `${width * 0.295}px`, overflow: "auto" }}
        >
          {/* 글 내용 */}
          <Typography
            variant="body2"
            color="black"
            align="justify"
            marginLeft="16px"
            marginRight="16px"
            marginBottom="1vh"
            fontFamily="GmarketSansMedium"
            fontSize="1.1vw"
          >
            {thisPost.content}
          </Typography>

          {/* 댓글몇개인지 보이기 */}
          <Grid is_flex B_top="1px solid #D3D3D3" margin_bottom="0.5vh">
            <BsChat size="2.5vmin" style={{ margin: "1vh 10px 17px 16px" }} />
            <Text F_size="1.5vmin" margin_bottom="1vh">총 {commentState && commentState.length}개의 댓글</Text>
          </Grid>

          {/* 댓글 보이기 */}
          {thisComment &&
            thisComment.map((v, i) => (
              <CommentContents key={i} {...v} id={props.id} />
            ))}
        </div>

        {/* 댓글작성부분 */}
        <Grid  position="absolute" bottom="0px" width={width * 0.3 + "px"}>
          <Grid is_flex>
            <LikeComment
              id={props.id}
              modal={false}
              none="none"
              default="default"
              size="2vmax"
            />
            <Grid is_flex position="relative" left="-40px" width={width * 0.3 + "px"} >
            {thisPost.likeUserDto && thisPost.likeUserDto.length > 0 ? (
              <Text F_size="1.5vmin" margin_top="10px">
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