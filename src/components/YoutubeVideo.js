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
  const fixedWidth = `${size.width / 1.7}`;
  const fixedHeight = `${((size.width / 1.7) * 9) / 16}`;

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

  return (
    <Wrap>
      {isYoutube ? (
        <ReactPlayer
          url={url}
          controls
          width={fixedWidth + "px"}
          height={fixedHeight + "px"}
          playing={on}
          onPlay={handlePlay}
          onPause={handlePause}
        />
      ) : (
        <Empty width={fixedWidth} height={fixedHeight}>
          텅 비었습니다.
        </Empty>
      )}

      <form onSubmit={handleUrlSubmit}>
        <input
          type="text"
          onChange={handleUrlChange}
          required
          placeholder="유튜브 Url"
        />
        <button type="submit">유튜브 url 제출</button>
      </form>
    </Wrap>
  );
};

const Empty = styled.div`
  width: ${(props) => props.width + "px"};
  height: ${(props) => props.height + "px"};
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 4px;
  margin-left: 4px; */
  /* width: 80vw;
  height: 45vw; */
`;

export default YoutubeVideo;
