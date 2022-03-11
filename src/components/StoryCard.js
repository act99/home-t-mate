import * as React from "react";
// import { styled } from '@mui/material/styles';
import Card from "@mui/material/Card";
// import style from "styled-components";

import Cardheader from "../components/Cardheader";
import LikeComment from "./LikeComment";
import Img from "../components/Img";
import CardContent from "@mui/material/CardContent";

import "../App.css";

import { Typography } from "@mui/material";
import Text from "../elements/Text";

export default function MainCard(props) {
  // let navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div className="mainbox">
      <Card sx={{ maxWidth: 620, margin: "auto" }}>
        <Cardheader />

        <Img setHeight={"600px"} />

        <LikeComment modal={true} />

        <CardContent sx={{ p: 0, pl: "16px" }}>
          <Typography variant="body2" color="black" align="justify">
            <strong>yejin</strong> css...🔥🔥🔥🔥 안녕 말을 길게 쳐보자 말을
            길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을
            길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자
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
