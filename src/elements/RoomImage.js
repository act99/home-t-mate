import styled from "@emotion/styled";
import React from "react";

const RoomImage = (props) => {
  const { src } = props;
  const styles = { src };
  return <RoomImageDefault {...styles} />;
};

const RoomImageDefault = styled.div`
  /* max-width: 320px;
  max-height: 240px; */
  width: 320px;
  height: 240px;

  background-image: url("${(props) => props.src}");
  background-size: 80% auto;
  background-position: center;
  background-repeat: no-repeat;
  border: solid 1px #e2e2e2;
  border-radius: 8px;
`;

RoomImage.defaultProps = {
  src: "https://via.placeholder.com/400x300",
};

export default RoomImage;
