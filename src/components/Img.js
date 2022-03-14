//react-responsive-carousel 라이브러리 사용

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "../elements/Grid";
{
  /* <Img postImg={props.imgUrl} setHeight={"600px"} /> */
}
function Img(props) {
  console.log('write props확인용',props);
  if (props.postImg) {
    return (
      <Carousel showThumbs={false} infiniteLoop={true} height={props.size}>
        {props.postImg.map((item, i) => (
          <Grid key={i} height={props.size}>
            <img src={item} alt="포스트사진"></img>
          </Grid>
        ))}
        {/* <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid>
      <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid>
      <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid> */}
      </Carousel>
    );
  }

  return (
    <div />
  );
}

export default Img;
