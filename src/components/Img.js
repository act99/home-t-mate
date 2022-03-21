//react-responsive-carousel 라이브러리 사용

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image, Grid } from "../elements";

const Img = (props) => {
  console.log("img props확인용", props);
  console.log(props.postImg);
  if (props.postImg) {
    return (
      <Image
        _onClick={props._onClick}
        src={props.postImg}
        alt="포스트사진"
        height={props.size}
        B_bottom_left_radius={props.border}
        B_top_left_radius={props.border}
      ></Image>
    );
  }

  return <div />;
};

export default Img;
