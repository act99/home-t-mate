//react-responsive라이브러리 사용
import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Cardheader from "./Cardheader";
import LikeComment from "./LikeComment";
import Img from "../common/Img";
import { Grid, Text } from "../../elements";
import CardContent from "@mui/material/CardContent";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../App.css";
import { actionCreators as commentActions } from "../../redux/modules/commentReducer";
import { Card } from "@mui/material";
import { Modal } from "@mui/material";
import Detail from "./Detail";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "react-responsive";

export default function StoryCard(props) {
  const classes = storyCard();
  const {
    id,
    nickname,
    userImg,
    commentUserDto,
    likeUserDto,
    likeCount,
    photoResponseDto,
    content,
  } = props;

  const commentState = useSelector((state) => state.commentReducer.list)[
    `${props.id}`
  ];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.id !== undefined) {
      dispatch(commentActions.getCommentDB(props.id));
    }
  }, [props.id, dispatch]);

  // datail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (commentUserDto !== undefined && likeUserDto !== undefined) {
    return (
      <div className="mainbox">
        <Card sx={{ maxWidth: 620, margin: "auto" }} className={classes.root}>
          <Cardheader id={id} username={nickname} userImg={userImg} />

          <Carousel showThumbs={false} infiniteLoop={true}>
            {photoResponseDto &&
              photoResponseDto.map((v, i) =>
                isMobile ? (
                  <Img
                    key={i}
                    {...v}
                    size="100vw"
                    commentUserDto={commentUserDto}
                    likeUserDto={likeUserDto}
                    likeCount={likeCount}
                    id={id}
                    _onClick={handleOpen}
                  />
                ) : (
                  <Img
                    key={i}
                    {...v}
                    size="620px"
                    commentUserDto={commentUserDto}
                    likeUserDto={likeUserDto}
                    likeCount={likeCount}
                    id={id}
                    _onClick={handleOpen}
                  />
                )
              )}
          </Carousel>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <Detail
                id={id}
                commentUserDto={commentUserDto}
                likeUserDto={likeUserDto}
              />
              <Grid position="absolute" right="0">
                <CloseIcon
                  sx={{ color: "white", fontSize: 40 }}
                  onClick={handleClose}
                />
              </Grid>
            </>
          </Modal>

          {/* id는 post id */}
          <LikeComment
            commentUserDto={commentUserDto}
            likeUserDto={likeUserDto}
            likeCount={likeCount}
            id={id}
            modal={true}
            size="32"
          />

          <CardContent sx={{ p: 0, pl: "16px" }}>
            <Grid is_flex>
              <Text F_color="black" F_size="16px" F_family="GmarketSansMedium">
                {nickname.length > 6 ? nickname.slice(0, 6) + "..." : nickname}
              </Text>
              <div className="overFlowText">
                <h3 style={{ fontSize: "1em", fontFamily: "GmarketSansLight" }}>
                  {content.length > 20 ? content.slice(0, 20) + "..." : content}
                </h3>
              </div>
            </Grid>
          </CardContent>
          {likeUserDto && likeUserDto.length <= 0 ? (
            <Text margin_left="16px" margin_top="8px">
              좋아요를 처음 누른 친구가 되어봐요 :)
            </Text>
          ) : (
            <Text margin_left="16px" margin_top="8px">
              {likeUserDto && likeUserDto[0].nickname}님 외{" "}
              {likeUserDto && likeUserDto.length - 1}명이 이 스토리를 좋아해요
            </Text>
          )}
          {commentState && commentState.length <= 0 ? (
            <Text
              margin_left="16px"
              margin_bottom="8px"
              F_color="#757575"
              margin_top="8px"
            >
              아직 댓글이 없어요
            </Text>
          ) : (
            <Text
              margin_left="16px"
              margin_bottom="8px"
              F_color="#757575"
              margin_top="8px"
            >
              {commentState && commentState[0].nickname}님 외
              {commentState && commentState.length - 1}개의댓글
            </Text>
          )}
        </Card>
      </div>
    );
  }
  return <div></div>;
}

const storyCard = makeStyles({
  root: {
    borderRadius: 20,
    boxShadow: "2px 5px 12px 6px rgba(240, 240, 240);",
    border: "1px solid #D3D3D3",
  },
});
