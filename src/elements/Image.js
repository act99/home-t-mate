import styled from "@emotion/styled";
import React from "react";

const Image = (props) => {
  //image category
  const { src } = props;

  //shape, size category
  const { shape, size, width, height, margin } = props;

  //event category
  const { _onClick } = props;

  //box category
  const { box_shadow } = props;

  //flex category
  const { flex } = props;

  const { border_radius } = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    box_shadow,
    flex,
    border_radius,
  };
  if (shape === "imageBG") {
    return <ImageBG onClick={_onClick} {...styles}></ImageBG>;
  }
  if (shape === "imagePost") {
    return <ImagePost onClick={_onClick} {...styles}></ImagePost>;
  }
  if (shape === "circle") {
    return <ImageCircle onClick={_onClick} {...styles} />;
  }
  return (
    <div>
      <ImageDefault onClick={_onClick} {...styles}>
        <Hover></Hover>
      </ImageDefault>
    </div>
  );
};

Image.defaultProps = {
  shape: null,
  src: "https://thumb.mt.co.kr/06/2021/03/2021030521582049015_1.jpg/dims/optimize/",
  size: null,
  width: null,
  height: null,
  margin: null,
  flex: null,
  border_radius: null,
};

const ImageDefault = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  z-index: 1;
  border-radius: ${(props) => props.border_radius};
  flex: ${(props) => props.flex};
`;

const Hover = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;
const ImagePost = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
  box-shadow: ${(props) => props.box_shadow};
  border-radius: ${(props) => props.border_radius};
`;
const ImageBG = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.src}");
  object-fit: cover;
  background-position: center;
  // border: 1px solid #ffec99;
`;

export default Image;
