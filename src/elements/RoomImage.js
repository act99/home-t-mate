import styled from "@emotion/styled";
import React from "react";

const RoomImage = (props) => {
  const { src } = props;
  const styles = { src };
  return <RoomImageDefault {...styles} />;
};

const RoomImageDefault = styled.div`
  min-width: 320px;
  min-height: 240px;
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  background-position: center;
`;

RoomImage.defaultProps = {
  src: "https://via.placeholder.com/400x300",
};

export default RoomImage;
