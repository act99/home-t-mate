import styled from "@emotion/styled";
import { ButtonGroup, Container, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";

const CheckVideo = () => {
  // const [playing, setPlaying] = React.useState(undefined);
  const [video, setVideo] = React.useState(true);
  const [audio, setAudio] = React.useState(false);
  const videoRef = React.useRef(null);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
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
    return () => {};
  }, []);

  const videoOnOff = () => {
    if (video) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
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
    if (audio) {
      const video = videoRef.current;
      video.muted = false;
    } else {
      const video = videoRef.current;
      video.muted = true;
    }
    setAudio(!audio);
  };

  return (
    <>
      <Wrap>
        <Container maxWidth="md">
          <Box
            sx={{
              bgcolor: "#cfe8fc",
              height: "60vh",
              borderRadius: "20px",
              textAlign: "center",
              p: 5,
            }}
          >
            <Text>
              홈트를 시작하기 전 먼저 비디오와 마이크 상태를 확인 해 주세요.
            </Text>
            <video ref={videoRef} autoPlay style={Styles.Video} />

            <ButtonGroup disableElevation variant="contained">
              <IconButton onClick={videoOnOff}>
                {video ? (
                  <VideocamIcon sx={{ fontSize: "50px", color: "black" }} />
                ) : (
                  <VideocamOffIcon sx={{ fontSize: "50px", color: "black" }} />
                )}
              </IconButton>
              <IconButton onClick={audioOnOff}>
                {audio ? (
                  <MicIcon sx={{ fontSize: "50px", color: "black" }} />
                ) : (
                  <MicOffIcon sx={{ fontSize: "50px", color: "black" }} />
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
`;

export default CheckVideo;
