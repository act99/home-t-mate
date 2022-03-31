import styled from "@emotion/styled";
import React from "react";
import { useLocation } from "react-router-dom";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as videoActions } from "../redux/modules/videoReducer";
import LinearProgress from "@mui/material/LinearProgress";
import useWindowSize from "../hooks/useWindowSize";
import { apis } from "../shared/api";
import LoadingImage from "../assets/loading_image.png";
const CheckVideo = () => {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer.video);
  const { video, audio } = videoReducer;

  // ** roomID, roomName 가져오기
  const location = useLocation();
  const locationState = location.state;
  const { roomId, roomName, password, host, hostImg } = locationState;

  // ** 비디오 세팅
  const [loading, setLoading] = React.useState(true);
  const videoRef = React.useRef(null);

  // ** 사이즈
  const size = useWindowSize();
  const { width, height } = size;
  const [myStatus, setMyStatus] = React.useState({ video: true, audio: true });

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: true,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const handleEnter = () => {
    apis
      .leaveRoom(roomId)
      .then((res) => {
        history.push({
          pathname: `/livenow/chat/${roomId}`,
          state: {
            roomId: roomId,
            roomName: roomName,
            password: password,
            host: host,
            hostImg: hostImg,
            myStatus: myStatus,
          },
        });
      })
      .catch((error) => console.log(error.response));
  };
  const leaveAPICall = () => {
    console.log("hi");
    apis
      .leaveRoom(roomId)
      .then((res) => {
        history.go(0);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    setTimeout(() => {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
      });
      setLoading(false);
    }, 1000);

    return () => {
      if (history.action === "POP") {
        leaveAPICall();
      }
      // if (window.performance) {
      //   if (performance.navigation.type === 1) {
      //   }
      //   leaveAPICall();
      // }
    };
  }, []);

  const videoOnOff = () => {
    if (videoReducer.video) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
      });
    }
    dispatch(
      videoActions.setVideo({
        video: !videoReducer.video,
        audio: videoReducer.audio,
      })
    );
    setMyStatus({ ...myStatus, video: !myStatus.video });
  };

  const audioOnOff = () => {
    dispatch(
      videoActions.setVideo({
        video: videoReducer.video,
        audio: !videoReducer.audio,
      })
    );
    setMyStatus({ ...myStatus, audio: !myStatus.audio });
  };

  if (loading) {
    return (
      <Wrap>
        <img alt="" src={LoadingImage} width="300px" />
        <Text>잠시만 기다려주세요.</Text>
        <LinearProgress color="success" sx={{ width: "300px", mt: 5 }} />
      </Wrap>
    );
  }

  if (width < height) {
    return (
      <>
        <MWrap>
          <MVideoTitle width={width}>
            <h3>
              홈트를 시작하기 전 <br /> <br /> 먼저 비디오와 마이크 상태를
              확인해주세요.
            </h3>
          </MVideoTitle>
          <MVideoWrap>
            <video
              ref={videoRef}
              autoPlay
              style={Styles.Video}
              muted={!videoReducer.audio}
            />
          </MVideoWrap>
          <MWarningWrap width={width}>
            <h3>
              ⚠ 경고! <br />
              <br /> 입장하시면 카메라와 오디오가 자동으로 켜지게 됩니다. <br />
              입장 후 카메라와 오디오 설정해주시기 바랍니다.
            </h3>
          </MWarningWrap>
          <MEnterButton>
            <JoinButton type="button" onClick={handleEnter}>
              입장하기
            </JoinButton>
          </MEnterButton>
        </MWrap>
      </>
    );
  }
  return (
    <>
      <Wrap>
        <VideoTitle>
          <h3>홈트를 시작하기 전 먼저 비디오와 마이크 상태를 확인해주세요.</h3>
        </VideoTitle>
        <VideoWrap>
          <video
            ref={videoRef}
            autoPlay
            style={Styles.Video}
            muted={!videoReducer.audio}
          />
        </VideoWrap>
        <WarningWrap>
          <h3>
            ⚠ 경고! <br />
            <br /> 입장하시면 카메라와 오디오가 자동으로 켜지게 됩니다. <br />
            입장 후 카메라와 오디오 설정해주시기 바랍니다.
          </h3>
        </WarningWrap>
        <EnterButton>
          <JoinButton type="button" onClick={handleEnter}>
            입장하기
          </JoinButton>
        </EnterButton>
      </Wrap>
    </>
  );
};

const MWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* background-color: #ffffff; */
  background-color: #f9f9f9;
`;

const MVideoTitle = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.2}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  background-color: #f9f9f9;
  h3 {
    font-size: ${(props) => props.width * 0.04}px;
    font-weight: bold;
  }
`;

const MWarningWrap = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.3}px;
  text-align: center;
  h3 {
    font-size: ${(props) => props.width * 0.03}px;
    font-family: GmarketSansLight;
    color: red;
  }
`;

const MEnterButton = styled.div`
  width: 80%;
  height: 100px;
  background-color: #f9f9f9;
  /* margin: auto; */
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const MVideoWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 600px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  align-content: center;
  background-color: #f9f9f9;

  video {
    width: 100%;
    max-width: 600px;
    height: auto;
    z-index: 13000;
  }
  #back {
    width: 100%;
    max-width: 600px;
    height: 337px;
    background-color: #1c1c1c;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 16px;
      color: white;
    }
    img {
      width: auto;
      /* max-width: 337px; */
      height: 337px;
      margin: 0px;
    }
  }
  div {
    width: 100%;
    max-width: 600px;
    height: 100px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
  }
`;

const JoinButton = styled.button`
  display: block;
  margin: auto;
  margin-top: 24px;
  width: 484px;
  height: 50px;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const WarningWrap = styled.div`
  width: 100%;
  height: 92px;
  text-align: center;
  h3 {
    font-size: 16px;
    font-family: GmarketSansLight;
    color: red;
  }
`;

const VideoTitle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  background-color: #f9f9f9;
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;

const VideoWrap = styled.div`
  width: 100%;
  height: auto;
  max-height: 600px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  align-content: center;
  background-color: #f9f9f9;

  video {
    width: 100%;
    max-width: 600px;
    height: auto;
    z-index: 13000;
  }
  #back {
    width: 100%;
    max-width: 600px;
    height: 337px;
    background-color: #1c1c1c;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 16px;
      color: white;
    }
    img {
      width: auto;
      /* max-width: 337px; */
      height: 337px;
      margin: 0px;
    }
  }
  div {
    width: 100%;
    max-width: 600px;
    height: 100px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-items: center;
  }
`;

const EnterButton = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100px;
  background-color: #f9f9f9;
  /* margin: auto; */
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const Styles = {
  Video: {
    // background: "rgba(0, 0, 0, 1)",
  },
  None: { display: "none" },
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff; */
  background-color: #f9f9f9;
`;

const Text = styled.h3`
  font-size: large;
  color: black;
  margin-bottom: 10px;
`;

export default CheckVideo;
