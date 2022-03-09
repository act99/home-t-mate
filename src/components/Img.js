//react-responsive-carousel 라이브러리 사용

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "../elements/Grid";

function Img(props) {
  // console.log(props.img)

  return (
    //이미지 슬라이더 디폴트값 코드
    // <Carousel showThumbs={false} infiniteLoop={true}>
    //   <div style={{ height: "200px", color: "#fff" }}>this is slide 1</div>
    //   <div style={{ height: "200px", color: "#fff" }}>this is slide 2</div>
    //   <div style={{ height: "200px", color: "#fff" }}>this is slide 3</div>
    // </Carousel>

    /////////원래 적용하려고했던 복붙코드
    <Carousel
      showThumbs={false}
      infiniteLoop={true}
      height={props.img !== undefined ? "740px" : "600px"}
    >
      <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid>
      <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid>
      <Grid height={props.img ? "740px" : "600px"}>
        <img src="https://img.insight.co.kr/static/2019/07/29/700/ho8dty32zw1h3jth4l4a.jpg" />
      </Grid>
    </Carousel>
  );
}

export default Img;
