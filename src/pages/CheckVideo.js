import styled from "@emotion/styled";
import { Button, ButtonGroup, Container, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { useLocation } from "react-router-dom";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as videoActions } from "../redux/modules/videoReducer";
import LinearProgress from "@mui/material/LinearProgress";
import useWindowSize from "../hooks/useWindowSize";
import { apis } from "../shared/api";
import FullErrorContainer from "../containers/FullErrorContainer";
import LoadingImage from "../assets/loading_image.png";

const CheckVideo = () => {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer.video);

  // ** roomID, roomName 가져오기
  const location = useLocation();
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  const password = location.state.password;
  // ** 비디오 세팅
  const [video, setVideo] = React.useState(videoReducer.video);
  const [audio, setAudio] = React.useState(videoReducer.audio);
  const [loading, setLoading] = React.useState(true);
  const videoRef = React.useRef(null);

  // ** 방 인원 체크
  const [fullPeople, setFullPeople] = React.useState(false);
  // ** 사이즈

  const size = useWindowSize();
  const height = size.height;
  const width = size.width;

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
            video: video,
            audio: audio,
            password: password,
          },
        });
      })
      .catch((error) => console.log(error));

    // dispatch(videoActions.setVideo({ video: video, audio: audio }));
  };

  React.useEffect(() => {
    // **  ㄱㄱ
    setTimeout(() => {
      if (video === true) {
        getWebcam((stream) => {
          videoRef.current.srcObject = stream;
        });
      }
      setLoading(false);
    }, 1000);
    // apis
    //   .joinRoom(roomId)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => setFullPeople(true));

    return () => {
      apis
        .leaveRoom(roomId)
        .then((res) => {
          history.go(0);
        })
        .catch((error) => console.log(error));
      // ** 페이지에서 나갈 시 비디오 죽이기
    };
  }, []);

  const videoOnOff = () => {
    if (video) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        console.log(track);
        track.stop();
      });
    } else {
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
      });
    }
    setVideo(!video);
  };
  const audioOnOff = () => {
    setAudio(!audio);
  };

  if (fullPeople) {
    return <FullErrorContainer />;
  }
  if (loading) {
    return (
      <Wrap>
        <img alt="" src={LoadingImage} width="300px" />
        <Text>잠시만 기다려주세요.</Text>
        <LinearProgress color="success" sx={{ width: "300px", mt: 5 }} />
      </Wrap>
    );
  }
  return (
    <>
      <Wrap>
        <VideoTitle>
          <h3>홈트를 시작하기 전 먼저 비디오와 마이크 상태를 확인해주세요.</h3>
        </VideoTitle>
        <VideoWrap>
          <video ref={videoRef} autoPlay style={Styles.Video} muted={!audio} />
          <div>
            <ButtonGroup
              disableElevation
              variant="contained"
              sx={{
                height: "100px",
              }}
            >
              <IconButton onClick={videoOnOff}>
                {video ? (
                  <VideocamIcon sx={{ fontSize: "40px", color: "black" }} />
                ) : (
                  <VideocamOffIcon sx={{ fontSize: "40px", color: "red" }} />
                )}
              </IconButton>
              <IconButton onClick={audioOnOff}>
                {audio ? (
                  <MicIcon sx={{ fontSize: "40px", color: "black" }} />
                ) : (
                  <MicOffIcon sx={{ fontSize: "40px", color: "red" }} />
                )}
              </IconButton>
            </ButtonGroup>
          </div>
        </VideoWrap>
        <EnterButton>
          <Button
            variant="outlined"
            sx={{ height: 50, width: 300, display: "block", my: "auto" }}
            onClick={handleEnter}
          >
            입장하기
          </Button>
        </EnterButton>
      </Wrap>
    </>
  );
};

const VideoTitle = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  background-color: white;
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
  flex-direction: column;
  align-items: center;
  align-content: center;
  background-color: white;
  video {
    width: 100%;
    max-width: 600px;
    height: auto;
  }
  div {
    width: 100%;
    max-width: 600px;
    height: 100px;
    background-color: white;
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
  background-color: white;
  /* margin: auto; */
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const Styles = {
  Video: {
    background: "rgba(245, 240, 215, 0.3)",
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
  background-color: white;
`;

const Text = styled.h3`
  font-size: large;
  color: black;
  margin-bottom: 10px;
`;

export default CheckVideo;
