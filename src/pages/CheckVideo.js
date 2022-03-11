import styled from "@emotion/styled";
import { ButtonGroup, Container, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";

const CheckVideo = () => {
  const [video, setVideo] = React.useState(true);
  const [audio, setAudio] = React.useState(true);
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

  React.useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
    return () => {
      killVideo();
    };
  }, [audio]);

  // ** 페이지에서 나갈 시 비디오 죽이기
  const killVideo = () => {
    const s = videoRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
  };

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
            <Text>
              홈트를 시작하기 전 먼저 비디오와 마이크 상태를 확인 해 주세요.
            </Text>
            <video
              ref={videoRef}
              autoPlay
              style={Styles.Video}
              muted={!audio}
            />

            <ButtonGroup disableElevation variant="contained">
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

export default CheckVideo;
