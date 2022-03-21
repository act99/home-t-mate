import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import useWindowSize from "../hooks/useWindowSize";
import {
  sendYoutubeOff,
  sendYoutubeOn,
  sendYoutubeUrl,
} from "../shared/SocketFunc";
import ReactPlayer from "react-player";
import { Avatar } from "@mui/material";

const YoutubeVideo = (props) => {
  // ** history
  // ** props 가져오기
  const { ws, token, roomId } = props;

  // ** 회원정보
  const user = useSelector((state) => state.userReducer.user);

  // ** 유튜브 redux state
  const youtubeRedux = useSelector((state) => state.youtubeReducer.youtube);
  const { on, pause, url } = youtubeRedux;

  // ** 윈도우 사이즈 규격
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;

  // ** 유튜브 url 여부 확인
  function youtube_parser(url) {
    var regExp =
      /^https?:\/\/(?:www\.youtube(?:-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*)?vi?=|vi?=|\?(?:.*)?vi?=)([^#?\n<>"']*)/i;
    var match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : false;
  }
  // ** 유튜브 url 이 id 로 바뀌 때 state

  // ** 유튜브 url input
  const [urlIntput, setUrlIntput] = React.useState({
    type: "YOUTUBEURL",
    roomId: "",
    sender: "",
    message: "",
  });

  // ** 유튜브 on
  const [youtubeOn, setYoutubeOn] = React.useState({
    type: "YOUTUBEON",
    roomId: "",
    sender: "",
    message: true,
  });

  // ** 유튜브 off
  const [youtubeOff, setYoutubeOff] = React.useState({
    type: "YOUTUBEPAUSE",
    roomId: "",
    sender: "",
    message: false,
  });

  // ** 유튜브 켜졌는지 꺼졌는지
  const [isYoutube, setIsYoutube] = React.useState(false);
  // ** 유튜브 상태관리

  // ** url change 핸들러
  const handleUrlChange = (e) => {
    setUrlIntput({ ...urlIntput, message: e.target.value });
  };
  // ** 유튜브 url websocket
  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (youtube_parser(urlIntput.message) === false) {
      alert("옳바른 주소를 입력해주세요");
    } else {
      sendYoutubeUrl(ws, token, urlIntput);
      setUrlIntput({ ...urlIntput, message: "" });
    }
  };
  // ** 유튜브 play websocket
  const handlePlay = () => {
    sendYoutubeOn(ws, token, youtubeOn);
    console.log("play");
  };
  // ** 유튜브 pause websocket
  const handlePause = () => {
    sendYoutubeOff(ws, token, youtubeOff);
    console.log("pause");
  };

  // ** 유튜브 on Off controller
  React.useEffect(() => {
    if (url !== "") {
      setIsYoutube(true);
    } else {
      setIsYoutube(false);
    }
    setUrlIntput({
      ...urlIntput,
      roomId: roomId,
      sender: user.nickname,
      type: "YOUTUBEURL",
    });
    setYoutubeOn({
      ...youtubeOn,
      roomId: roomId,
      sender: user.nickname,
      type: "YOUTUBEON",
    });
    setYoutubeOff({
      ...youtubeOff,
      roomId: roomId,
      sender: user.nickname,
      type: "YOUTUBEPAUSE",
    });
    return () => {};
  }, [on, url]);
  // console.log(((height - 200) * 16) / 9);
  const roomData = useSelector((state) => state.selectedRoomReducer.room);

  return (
    <>
      {isYoutube ? (
        <ReactPlayer
          url={url}
          controls
          width={"100%"}
          height={`${width * 0.34}px`}
          // height={"auto"}
          // width={`${width * 0.7}px`}
          // height={`${width * 0.525}px`}
          // height={`${height - 200}px`}
          playing={on}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      ) : (
        <Empty width={width} height={height}>
          <img
            width={width * 0.2 + "px"}
            alt="yotubeUrl"
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvDPyd%2Fbtrv5m6rU7r%2FzjPwR6mggq43e6oSpvXRK1%2Fimg.png"
          />
          <YoutubeEmptyText>유튜브 URL을 넣어주세요 :)</YoutubeEmptyText>
        </Empty>
      )}
      <FormStyle>
        <TitleText>방제 : {roomData.roomName}</TitleText>
        <ContentText>설명 : {roomData.content}</ContentText>
        <HostText>
          <h3>호스트 : </h3>
          <Avatar
            alt={roomData.nickname}
            src={roomData.profileImg}
            sx={{ width: "28px", height: "28px", ml: 1 }}
          />
          <h3>{roomData.nickname}</h3>
        </HostText>
        <FormBox onSubmit={handleUrlSubmit}>
          <UrlInput
            type="text"
            onChange={handleUrlChange}
            required
            placeholder="유튜브 Url"
          />
          <CreateButton type="submit">유튜브 url 제출</CreateButton>
        </FormBox>
      </FormStyle>
    </>
  );
};

//** 유튜브 안넣었을 때 */

const Empty = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.34}px;
  background-color: aqua;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const YoutubeEmptyText = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

//** 유튜브 안넣었을 때 */

// ** 유튜브 아래

const FormStyle = styled.div`
  width: 100%;
  height: 144px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const UrlInput = styled.input`
  width: 500px;
  height: 36px;
  margin-left: 30px;
  margin-right: 16px;
  padding-left: 12px;
  border-radius: 10px;
  border: solid 1px green;
  :focus {
    outline: solid 1px green;
    border: solid 1px green;
  }
`;

const TitleText = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 4px;
  margin-bottom: 3px;
  margin-left: 30px;
`;
const ContentText = styled.h5`
  font-size: 16px;
  margin: 4px;
  margin-bottom: 15px;
  margin-left: 30px;
`;
const HostText = styled.div`
  display: flex;
  flex-direction: row;
  margin: 4px;
  margin-bottom: 15px;
  margin-left: 30px;
  align-items: center;
  h3 {
    margin: 0px;
    font-size: 16px;
  }
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 160px;
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10px;
  border: solid 1px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: 16px;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default YoutubeVideo;
