//react-responsive-carousel 라이브러리 사용

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image } from "../elements";

const Img = (props) => {

  if (props.postImg) {
    return (
        <Image
          _onClick={props._onClick}
          src={props.postImg}
          alt="포스트사진"
          height={props.size}
          width={props.size}
          max_width={props.max_width}
          min_width={props.min_width}
          min_height={props.min_height}
          border_radius={props.border_radius}
          B_bottom_left_radius={props.border}
          B_top_left_radius={props.border}
          cursor={props.cursor}
        ></Image>
    );
  }

  return <div />;
};

export default Img;
