import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DetailCardheader from "./DetailCardheader";
import LikeComment from "./LikeComment";
import CommentContents from "./CommentContents";
import Grid from "../../elements/Grid";
import Img from "../common/Img";
import CommentBox from "./CommentBox";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
import { actionCreators as commentActions } from "../../redux/modules/commentReducer";
import { BsChat } from "react-icons/bs";
import { Text } from "../../elements";
import useWindowSize from "../../hooks/useWindowSize";
import { useMediaQuery } from "react-responsive";

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
};

const mobileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  maxWidth: "500px",
  minWidth: "280px",
  height: "80%",
  maxHeight: "725px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
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

  React.useEffect(() => {
    if (!commentState) {
      dispatch(commentActions.getCommentDB(props.id));
    }
  }, []);

  const size = useWindowSize();
  const { width, height } = size;

  const isMobile = useMediaQuery({ query: "(max-width: 1209px)" });

  return (
    <Box sx={isMobile ? mobileStyle : style}>
      {isMobile ? (
        <>
          {/* ?????? width??? 1209px?????? ?????????////////////////////////// */}
          <Grid width="100%">
            <DetailCardheader
              id={thisPost.id}
              username={thisPost.nickname}
              userImg={thisPost.userImg}
              createdAt={thisPost.createdAt}
            />
            <div
              className="commentlist"
              style={{
                height: `${height * 0.62}px`,
                overflow: "auto",
                width: "100%",
              }}
            >
              {/* ??? ?????? */}
              <Typography
                variant="body2"
                color="black"
                align="justify"
                marginLeft="16px"
                marginRight="16px"
                fontFamily="GmarketSansMedium"
                fontSize="1em"
              >
                <pre-wrap
                  style={{ fontFamily: "GmarketSansMedium", marginTop: "5px" }}
                >
                  {thisPost.content}
                </pre-wrap>
              </Typography>

              {/* ?????????????????? ????????? */}
              <Grid is_flex B_top="1px solid #D3D3D3" margin_bottom="0.5vh">
                <BsChat size="1.2em" style={{ margin: "1vh 10px 17px 16px" }} />
                <Text F_size="0.7em" margin_bottom="1vh">
                  ??? {commentState && commentState.length}?????? ??????
                </Text>
              </Grid>

              {/* ?????? ????????? */}
              {thisComment &&
                thisComment.map((v, i) => (
                  <CommentContents key={i} {...v} id={props.id} />
                ))}
            </div>

            {/* ?????????????????? */}
            <Grid position="absolute" bottom="0px" width="100%">
              <Grid is_flex>
                <LikeComment
                  id={props.id}
                  modal={false}
                  none="none"
                  default="default"
                  size="2em"
                />
                <Grid is_flex position="relative" left="-40px" width="100%">
                  {thisPost.likeUserDto && thisPost.likeUserDto.length > 0 ? (
                    <Text
                      F_size="0.8em"
                      F_family="GmarketSansLight"
                      margin_top="10px"
                    >
                      {thisPost.likeUserDto[0].nickname}??? ???{" "}
                      {thisPost.likeUserDto.length - 1}?????? ??? ???????????? ????????????
                    </Text>
                  ) : (
                    <Text
                      F_size="0.8em"
                      F_family="GmarketSansLight"
                      margin_top="10px"
                    >
                      ???????????? ?????? ?????? ????????? ???????????? :)
                    </Text>
                  )}
                </Grid>
              </Grid>
              <CommentBox id={props.id} />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {/* ?????? width??? 1209px?????? ??????////////////////////////// */}
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
              style={{ height: `${width * 0.29}px`, overflow: "auto" }}
            >
              {/* ??? ?????? */}
              <Typography
                variant="body2"
                color="black"
                align="justify"
                marginLeft="16px"
                marginRight="16px"
                // marginBottom="1vh"
                fontFamily="GmarketSansMedium"
                fontSize="1.1vw"
              >
                <pre-wrap
                  style={{ fontFamily: "GmarketSansMedium", marginTop: "0px" }}
                >
                  {thisPost.content}
                </pre-wrap>
              </Typography>

              {/* ?????????????????? ????????? */}
              <Grid is_flex B_top="1px solid #D3D3D3" margin_bottom="0.5vh">
                <BsChat
                  size="2.5vmin"
                  style={{ margin: "1vh 10px 17px 16px" }}
                />
                <Text F_size="1.5vmin" margin_bottom="1vh">
                  ??? {commentState && commentState.length}?????? ??????
                </Text>
              </Grid>

              {/* ?????? ????????? */}
              {thisComment &&
                thisComment.map((v, i) => (
                  <CommentContents key={i} {...v} id={props.id} />
                ))}
            </div>

            {/* ?????????????????? */}
            <Grid position="absolute" bottom="0px" width={width * 0.3 + "px"}>
              <Grid is_flex>
                <LikeComment
                  id={props.id}
                  modal={false}
                  none="none"
                  default="default"
                  size="2vmax"
                />
                <Grid
                  is_flex
                  position="relative"
                  left="-40px"
                  width={width * 0.3 + "px"}
                >
                  {thisPost.likeUserDto && thisPost.likeUserDto.length > 0 ? (
                    <Text
                      F_size="1vmax"
                      F_family="GmarketSansLight"
                      margin_top="10px"
                    >
                      {thisPost.likeUserDto[0].nickname}??? ???{" "}
                      {thisPost.likeUserDto.length - 1}?????? ??? ???????????? ????????????
                    </Text>
                  ) : (
                    <Text
                      F_size="1vmax"
                      F_family="GmarketSansLight"
                      margin_top="8px"
                    >
                      ???????????? ?????? ?????? ????????? ???????????? :)
                    </Text>
                  )}
                </Grid>
              </Grid>
              <CommentBox id={props.id} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
