//react-responsive-carousel 라이브러리 사용

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Image, Grid } from "../elements";

const Img = (props) => {
  console.log("write props확인용", props);
  if (props.postImg) {
    return (
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        height={props.size}
        width={props.size}
      >
        {/* map함수는 배열만 받는다 */}
        {/* {props.postImg.map((item, i) => (
          <Grid key={i}>
            <Image
              src={item}
              alt="포스트사진"
              height={props.size}
              B_bottom_left_radius={props.border}
              B_top_left_radius={props.border}
            ></Image>
          </Grid>
        ))} */}
        <Grid>
          <Image
          _onClick={props._onClick}
            src={props.postImg}
            alt="포스트사진"
            height={props.size}
            B_bottom_left_radius={props.border}
            B_top_left_radius={props.border}
          ></Image>
        </Grid>
      </Carousel>
    );
  }

  return <div />;
};

export default Img;
