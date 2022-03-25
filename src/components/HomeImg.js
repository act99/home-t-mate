import React from "react";
import { Image } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";

function HomeImg(props) {
  const { photoResponseDto } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {

    if (photoResponseDto && photoResponseDto.length > 0) {
      console.log(photoResponseDto);
    }
    dispatch(postActions.getPostDB());
  }, [photoResponseDto]);

  return (
    <Image
      width="224px"
      height="224px"
    //   src={photoResponseDto[0].postImg}
    ></Image>
  );
}

export default HomeImg;
