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
  console.log("storycard", props);

  const _storyimg = props.photoResponseDto;
  console.log("_storyimg", _storyimg);
  const _user = useSelector((state) => state.userReducer.user);
  const _post = useSelector((state) => state.postReducer.list);
  console.log("user확인용", _user);
  console.log("post확인용", _post);
  const classes = storyCard();

  React.useEffect(() => {
    if (props.likeUserDto && props.likeUserDto.length > 0) {
      console.log(props.likeUserDto[0]);
    }
  }, []);

  return (
    <div className="mainbox">
      <Card
        sx={{ maxWidth: 620, height: 900, margin: "auto" }}
        className={classes.root}
      >
        <Cardheader
          id={props.id}
          username={props.nickname}
          userImg={props.userImg}
        />

        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          height={props.size}
          width={props.size}
        >
          {_storyimg &&
            _storyimg.map((v, i) => <Img key={i} {...v} size="620px" />)}
        </Carousel>

        {/* <Img postImg={props.photoResponseDto} size="620px" /> */}

        {/* id는 post id */}
        <LikeComment
          commentUserDto={props.commentUserDto}
          likeUserDto={props.likeUserDto}
          likeCount={props.likeCount}
          id={props.id}
          modal={true}
        />

        <CardContent sx={{ p: 0, pl: "16px" }}>
          <Typography variant="body2" color="black" align="justify">
            <strong>{props.nickname}</strong>
            {props.content}
          </Typography>
        </CardContent>

        <Text margin_left="16px" margin_top="28px">
          {/* {props.likeUserDto[0].userId}님 외 {props.likeUserDto.length}명이 이 스토리를 좋아해요 */}
        </Text>
        <Text margin_left="16px" margin_bottom="8px">
          {/* {props.commentUserDto[0].nickname}님 외 {props.commentUserDto.length}개의 댓글 */}
        </Text>
      </Card>
    </div>
  );
}

const storyCard = makeStyles({
  root: {
    borderRadius: 20,
    boxShadow: "2px 5px 12px 6px rgba(240, 240, 240);",
  },
});
