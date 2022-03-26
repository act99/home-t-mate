import styled from "@emotion/styled";
import React from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import useWindowSize from "../hooks/useWindowSize";
import {
  sendYoutubeOff,
  sendYoutubeOn,
  sendYoutubeUrl,
  sendYoutubeStop,
} from "../shared/SocketFunc";
import ReactPlayer from "react-player";
import { Avatar } from "@mui/material";
import RestImage from "../assets/rest.png";
import WorkoutImage from "../assets/workout.png";
const YoutubeVideo = (props) => {
  // ** history
  // ** props 가져오기
  const { ws, token, roomId, workOut, roomName, password, host, hostImg } =
    props;

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

  // ** 유튜브 Stop
  const [youtubeStop, setYoutubeStop] = React.useState({
    type: "YOUTUBESTOP",
    roomId: "",
    sender: "",
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
  const handleStop = () => {
    sendYoutubeStop(ws, token, youtubeStop);
    console.log("stop");
  };
  // const roomData = useSelector((state) => state.selectedRoomReducer.room);

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
    setYoutubeStop({
      ...youtubeStop,
      roomId: roomId,
      sender: user.nickname,
      type: "YOUTUBESTOP",
    });
    return () => {};
  }, [on, url]);
  // console.log(((height - 200) * 16) / 9);

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
          onEnded={handleStop}
        />
      ) : (
        <Empty width={width} height={height}>
          <img
            width={width * 0.2 + "px"}
            alt="yotubeUrl"
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvDPyd%2Fbtrv5m6rU7r%2FzjPwR6mggq43e6oSpvXRK1%2Fimg.png"
          />
          <YoutubeEmptyText>
            호스트 님은 유튜브 URL을 넣어주세요 :)
          </YoutubeEmptyText>
        </Empty>
      )}
      <WrapBottom width={width}>
        <BottomTop width={width}>
          <WrapRoomInfo width={width}>
            <HostText width={width} style={{ marginTop: width * 0.01 + "px" }}>
              <h3>방 제목 : </h3>
              <h3>
                {roomName.length > 12
                  ? roomName.slice(0, 12) + "..."
                  : roomName}
              </h3>
            </HostText>
            <HostText width={width}>
              <h3>비밀번호 : </h3>
              <h3>{password === "" ? "X" : password}</h3>
            </HostText>
            <HostText width={width}>
              <h3>호스트 : </h3>
              <Avatar
                alt={host}
                src={hostImg}
                sx={{ width: "1.5vw", height: "1.5vw", mx: 1 }}
              />
              <h3>{host}</h3>
            </HostText>
          </WrapRoomInfo>
          {/* <Banner width={width}></Banner> */}
        </BottomTop>
        <WrapFromStyle width={width}>
          <FormBox onSubmit={handleUrlSubmit}>
            <UrlInput
              type="text"
              value={urlIntput.message}
              onChange={handleUrlChange}
              required
              placeholder="유튜브 Url"
              dwidth={width}
            />
            <CreateButton type="submit" width={width}>
              유튜브 url 제출
            </CreateButton>
          </FormBox>
          {workOut ? (
            <WorkOutWrap width={width} src={WorkoutImage}>
              {/* <img
                src={WorkoutImage}
                alt=""
                style={{ width: "160px", height: "60px" }}
              /> */}
            </WorkOutWrap>
          ) : (
            <WorkOutWrap src={RestImage} width={width}>
              {/* <img
                src={RestImage}
                alt=""
                style={{ width: "160px", height: "50px" }}
              /> */}
            </WorkOutWrap>
          )}
        </WrapFromStyle>
      </WrapBottom>
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

const WrapBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.width * 0.1 + "px"};
`;

const BottomTop = styled.div`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width * 0.8 + "px"};
  height: ${(props) => props.width * 0.06 + "px"};
`;

const WrapRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: ${(props) => props.width * 0.2 + "px"};
  height: ${(props) => props.width * 0.06 + "px"};
`;

const Banner = styled.div`
  width: ${(props) => props.width * 0.44 + "px"};
  height: ${(props) => props.width * 0.06 + "px"};
  background-color: beige;
`;

const WrapFromStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${(props) => props.width * 0.04 + "px"};
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UrlInput = styled.input`
  width: ${(props) => props.dwidth * 0.28 + "px"};
  height: ${(props) => props.dwidth * 0.02 + "px"};
  margin-left: ${(props) => props.dwidth * 0.02 + "px"};
  margin-right: ${(props) => props.dwidth * 0.005 + "px"};
  padding-left: ${(props) => props.dwidth * 0.007 + "px"};
  font-size: ${(props) => props.dwidth * 0.007 + "px"};
  border-radius: 10px;
  border: solid 1px green;
  font-family: "GmarketSansLight";
  :focus {
    outline: solid 1px green;
    border: solid 1px green;
  }
`;

const WorkOutWrap = styled.div`
  width: ${(props) => props.width * 0.08 + "px"};
  height: ${(props) => props.width * 0.04 + "px"};
  margin-right: ${(props) => props.width * 0.01 + "px"};
  /* margin-bottom: ${(props) => props.width * 0.005 + "px"}; */
  /* background-color: black; */
  background-image: url("${(props) => props.src}");
  background-size: 80% auto;
  background-position: center;
  background-repeat: no-repeat;
`;

const HostText = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(props) => props.width * 0.005 + "px"};
  margin-left: ${(props) => props.width * 0.02 + "px"};
  margin-bottom: ${(props) => props.width * 0.003 + "px"};
  align-items: center;
  h3 {
    margin: 0px;
    font-size: ${(props) => props.width * 0.008 + "px"};
    font-family: "GmarketSansLight";
  }
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: ${(props) => props.width * 0.08 + "px"};
  height: ${(props) => props.width * 0.02 + "px"};
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10px;
  border: solid 1px green;
  background-color: white;
  font-size: ${(props) => props.width * 0.008 + "px"};
  color: green;
  font-weight: bold;
  margin-right: 16px;
  font-family: "GmarketSansLight";
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

export default YoutubeVideo;
