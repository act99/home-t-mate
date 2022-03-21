import * as React from "react";
import { makeStyles } from "@mui/styles";

import Cardheader from "../components/Cardheader";
import LikeComment from "./LikeComment";
import Img from "../components/Img";
import CardContent from "@mui/material/CardContent";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../App.css";

import { Card, Typography } from "@mui/material";
import Text from "../elements/Text";

import { useDispatch, useSelector } from "react-redux";
// import  style  from "@mui/styles";

export default function StoryCard(props) {
  const classes = storyCard();
  const {
    id,
    nickname,
    userImg,
    size,
    commentUserDto,
    likeUserDto,
    likeCount,
    photoResponseDto,
    content,
  } = props;
  React.useEffect(() => {
    if (props.likeUserDto && props.likeUserDto.length > 0) {
      console.log(props.likeUserDto[0]);
    }
    console.log(commentUserDto, likeUserDto);
  }, [commentUserDto, likeUserDto]);

  if (commentUserDto !== undefined && likeUserDto !== undefined) {
    return (
      <div className="mainbox">
        <Card
          sx={{ maxWidth: 620, height: 900, margin: "auto" }}
          className={classes.root}
        >
          <Cardheader id={id} username={nickname} userImg={userImg} />

          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            height={size}
            width={size}
          >
            {photoResponseDto &&
              photoResponseDto.map((v, i) => (
                <Img key={i} {...v} size="620px" />
              ))}
          </Carousel>

          {/* <Img postImg={props.photoResponseDto} size="620px" /> */}

          {/* id는 post id */}
          <LikeComment
            commentUserDto={commentUserDto}
            likeUserDto={likeUserDto}
            likeCount={likeCount}
            id={id}
            modal={true}
          />

          <CardContent sx={{ p: 0, pl: "16px" }}>
            <Typography variant="body2" color="black" align="justify">
              <strong>{nickname}</strong>
              {content}
            </Typography>
          </CardContent>
          {likeUserDto.length <= 0 ? null : (
            <Text margin_left="16px" margin_top="28px">
              {likeUserDto[0].userId}님 외 {likeUserDto.length}명이 이 스토리를
              좋아해요
            </Text>
          )}
          {commentUserDto <= 0 ? null : (
            <Text margin_left="16px" margin_bottom="8px">
              {props.commentUserDto[0].nickname}님 외{" "}
              {props.commentUserDto.length}개의 댓글
            </Text>
          )}
        </Card>
      </div>
    );
  }
  return (
    <div>
      <h3>로딩중</h3>
    </div>
  );
}

const storyCard = makeStyles({
  root: {
    borderRadius: 20,
    boxShadow: "2px 5px 12px 6px rgba(240, 240, 240);",
  },
});
