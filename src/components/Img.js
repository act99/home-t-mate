//react-responsive-carousel 라이브러리 사용

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image, Grid } from "../elements";
import { Modal } from "@mui/material";
import Detail from "./Detail";
import CloseIcon from "@mui/icons-material/Close";

const Img = (props) => {

  if (props.postImg) {
    return (
        <Image
          _onClick={props._onClick}
          src={props.postImg}
          alt="포스트사진"
          height={props.size}
          width={props.size}
          B_bottom_left_radius={props.border}
          B_top_left_radius={props.border}
          cursor={props.cursor}
        ></Image>
    );
  }

  return <div />;
};

export default Img;
