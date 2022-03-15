import * as React from "react";
import { makeStyles } from "@mui/styles";


import Cardheader from "../components/Cardheader";
import LikeComment from "./LikeComment";
import Img from "../components/Img";
import CardContent from "@mui/material/CardContent";

import "../App.css";

import { Card, Typography } from "@mui/material";
import Text from "../elements/Text";

import {useDispatch, useSelector} from "react-redux";
import { color } from "@mui/system";
// import  style  from "@mui/styles";

export default function MainCard(props) {

  const _user = useSelector(state=>state.userReducer);
  console.log('user확인용', _user);
  const classes = storyCard();

  return (
    <div className="mainbox">
      <Card sx={{ maxWidth: 620, height:900, margin: "auto" }} className={classes.root}>
        
        <Cardheader id={props.id} username={props.nickname} userImg={props.userImg}/>

        <Img postImg={props.postImg} size="620px" />

        <LikeComment id={props.id} modal={true} />

        <CardContent sx={{ p: 0, pl: "16px" }}>
          <Typography variant="body2" color="black" align="justify">
            <strong>{props.nickname}</strong>
            {props.content}
          </Typography>
        </CardContent>

        <Text margin_left="16px" margin_top="28px">
          이주석님 외 8명이 이 스토리를 좋아해요
        </Text>
        <Text margin_left="16px" margin_bottom="8px">
          홍길동님 외 20개의 댓글
        </Text>
      </Card>
    </div>
  );
}

const storyCard = makeStyles({
  root: {
      borderRadius: 20,
      boxShadow: '2px 5px 12px 6px rgba(240, 240, 240);',
  },

});