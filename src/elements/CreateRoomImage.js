import styled from "@emotion/styled";
import React from "react";

const CreateRoomImage = (props) => {
  const { src, width, height } = props;
  const styles = { src, width, height };
  return <RoomImageDefault {...styles} />;
};

const RoomImageDefault = styled.div`
  /* max-width: 320px;
  max-height: 240px; */
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  background-image: url("${(props) => props.src}");
  background-size: 80% auto;
  background-position: center;
  background-repeat: no-repeat;
  border: solid 1px #e2e2e2;
  border-radius: 8px;
`;

CreateRoomImage.defaultProps = {
  src: "https://via.placeholder.com/400x300",
};

export default CreateRoomImage;
