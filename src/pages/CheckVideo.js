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
const CheckVideo = () => {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer.video);

  // ** roomID, roomName 가져오기
  const location = useLocation();
  const roomId = location.state.roomId;
  const roomName = location.state.roomName;
  // ** 비디오 세팅
  const [video, setVideo] = React.useState(videoReducer.video);
  const [audio, setAudio] = React.useState(videoReducer.audio);
  const [loading, setLoading] = React.useState(true);
  const videoRef = React.useRef(null);
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
    history.push({
      pathname: `/livenow/${roomId}`,
      state: { roomId: roomId, roomName: roomName },
    });
    dispatch(videoActions.setVideo({ video: video, audio: audio }));
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (video === true) {
        getWebcam((stream) => {
          videoRef.current.srcObject = stream;
        });
      }
      setLoading(false);
    }, 1000);

    return () => {
      // ** 페이지에서 나갈 시 비디오 죽이기
      history.go(0);
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

  if (loading) {
    return (
      <div>
        <h3>로딩중입니다.</h3>
      </div>
    );
  }
  return (
    <>
      <Wrap>
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "70vh",
              borderRadius: "20px",
              textAlign: "center",
              p: 5,
            }}
          >
            <VideoWrap>
              <Text>
                홈트를 시작하기 전 먼저 비디오와 마이크 상태를 확인 해 주세요.
              </Text>
            </VideoWrap>
            <video
              ref={videoRef}
              autoPlay
              style={Styles.Video}
              muted={!audio}
            />
            <ButtonGroup
              disableElevation
              variant="contained"
              sx={{ height: "100px" }}
            >
              <IconButton onClick={videoOnOff}>
                {video ? (
                  <VideocamIcon sx={{ fontSize: "40px", color: "black" }} />
                ) : (
                  <VideocamOffIcon sx={{ fontSize: "40px", color: "black" }} />
                )}
              </IconButton>
              <IconButton onClick={audioOnOff}>
                {audio ? (
                  <MicIcon sx={{ fontSize: "40px", color: "black" }} />
                ) : (
                  <MicOffIcon sx={{ fontSize: "40px", color: "black" }} />
                )}
              </IconButton>
            </ButtonGroup>
            <ButtonWrap>
              <Button
                variant="contained"
                sx={{ height: 50, width: 200 }}
                onClick={handleEnter}
              >
                입장하기
              </Button>
            </ButtonWrap>
          </Box>
        </Container>
      </Wrap>
    </>
  );
};

const Styles = {
  Video: {
    background: "rgba(245, 240, 215, 0.5)",
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
  background-color: #f0effd;
`;

const Text = styled.h3`
  font-size: large;
  color: black;
  margin-bottom: 10px;
`;

const VideoWrap = styled.div`
  width: auto;
  height: 50px;
`;

const ButtonWrap = styled.div`
  height: 120px;
`;

export default CheckVideo;
