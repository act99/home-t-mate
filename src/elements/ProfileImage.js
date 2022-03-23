import styled from "@emotion/styled";
import React from "react";
import DefaultImage from "../assets/loading_image.png";
const ProfileImage = (props) => {
  const { src, onClick } = props;
  const styles = { src };
  return <RoomImageDefault {...styles} onClick={onClick} />;
};

const RoomImageDefault = styled.div`
  /* max-width: 320px;
  max-height: 240px; */
  width: 200px;
  height: 200px;
  margin-top: 4px;
  margin-right: 8px;
  background-image: url("${(props) => props.src}");
  background-size: 80% auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border: solid 1px #e2e2e2;
  border-radius: 100px;
  cursor: pointer;
`;

ProfileImage.defaultProps = {
  src: DefaultImage,
};

export default ProfileImage;
