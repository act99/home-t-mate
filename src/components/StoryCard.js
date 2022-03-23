import * as React from "react";
import { makeStyles } from "@mui/styles";

import Cardheader from "../components/Cardheader";
import LikeComment from "./LikeComment";
import Img from "../components/Img";
import { Grid } from "../elements";
import CardContent from "@mui/material/CardContent";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styled from "styled-components";
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
    if (likeUserDto && likeUserDto.length > 0) {
      console.log(props.likeUserDto[0]);
    }
    console.log(commentUserDto, likeUserDto);
  }, [commentUserDto, likeUserDto]);
  
  if (commentUserDto !== undefined && likeUserDto !== undefined) {
    return (
      <div className="mainbox">
        <Card
          sx={{ maxWidth: 620, height: 870, margin: "auto" }}
          className={classes.root}
        >
          <Cardheader id={id} username={nickname} userImg={userImg}/>

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
            <Grid is_flex>
              <Text F_color="black" F_size="20px">
                {nickname}
              </Text>
              <div className="overFlowText">{content}</div>
            </Grid>
          </CardContent>
          {likeUserDto.length <= 0 ? (
            <Text margin_left="16px" margin_top="28px">
              좋아요를 처음 누른 친구가 되어봐요 :)
            </Text>
          ) : (
            <Text margin_left="16px" margin_top="28px">
              {likeUserDto[0].userId}님 외 {likeUserDto.length-1}명이 이 스토리를
              좋아해요
            </Text>
          )}
          {commentUserDto <= 0 ? (
            <Text margin_left="16px" margin_bottom="8px" F_color="#757575">
              아직 댓글이 없어요
            </Text>
          ) : (
            <Text margin_left="16px" margin_bottom="8px" F_color="#757575">
              <p>{commentUserDto[0].nickname}님 외
              <span>{commentUserDto.length-1}개</span>의 댓글</p>
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