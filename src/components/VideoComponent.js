import styled from "@emotion/styled";
import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";
import { IconButton } from "@mui/material";
import useWindowSize from "../hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as videoActions } from "../redux/modules/videoReducer";
const VideoComponent = (props) => {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer.video);
  const videoRef = React.useRef();
  const { streamManager, nickname, host, OV, me, session } = props;
  const size = useWindowSize();
  const { width, height } = size;

  const [mic, setMic] = React.useState(true);
  const [vid, setVid] = React.useState(true);

  React.useEffect(() => {
    // if (me === true) {
    //   setMic(videoReducer.audio);
    //   setVid(videoReducer.video);
    // }
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
    // if (session) {
    //   session.on("signal:userChanged", (event) => {
    //     const data = JSON.parse(event.data);
    //     if (nickname === data.nickname) {
    //       if (data.audio !== undefined) {
    //         setMic(data.audio);
    //       } else if (data.video !== undefined) {
    //         setVid(data.video);
    //       }
    //     }
    //   });
    // }
    return () => {};
  }, [streamManager, nickname, mic, vid]);

  const handleVideo = () => {
    // if (me === true) {
    //   if (vid === true) {
    //     dispatch(videoActions.setVideo({ ...videoReducer, video: false }));
    //   } else {
    //     dispatch(videoActions.setVideo({ ...videoReducer, video: true }));
    //   }
    //   setVid(!vid);
    // } else {
    //   setVid(!vid);
    // }
    setVid(!vid);
  };

  const handleMic = () => {
    // if (me === true) {
    //   if (mic === true) {
    //     dispatch(videoActions.setVideo({ ...videoReducer, audio: false }));
    //   } else {
    //     dispatch(videoActions.setVideo({ ...videoReducer, audio: true }));
    //   }
    //   setMic(!mic);
    // } else {
    //   setMic(!mic);
    // }
    setMic(!mic);
  };
  return (
    <>
      <VideoWrap height={height}>
        <NicknameTag height={height}>
          {nickname === host
            ? nickname.length > 5
              ? "👑" + nickname.slice(0, 5) + "..."
              : "👑" + nickname
            : nickname.length > 7
            ? nickname.slice(0, 7) + "..."
            : nickname}
        </NicknameTag>
        {me === true ? (
          <></>
        ) : (
          <ButtonTag id="buttondiv">
            <IconButton onClick={handleVideo}>
              {vid === true ? (
                <VideocamIcon sx={{ color: "white" }} />
              ) : (
                <VideocamOffIcon sx={{ color: "red" }} />
              )}
            </IconButton>
            <IconButton onClick={handleMic}>
              {mic === true ? (
                <MicIcon sx={{ color: "white" }} />
              ) : (
                <MicOffIcon sx={{ color: "red" }} />
              )}
            </IconButton>
          </ButtonTag>
        )}
        {/* <ButtonTag id="buttondiv">
          <IconButton onClick={handleVideo}>
            {vid === true ? (
              <VideocamIcon sx={{ color: "white" }} />
            ) : (
              <VideocamOffIcon sx={{ color: "red" }} />
            )}
          </IconButton>
          <IconButton onClick={handleMic}>
            {mic === true ? (
              <MicIcon sx={{ color: "white" }} />
            ) : (
              <MicOffIcon sx={{ color: "red" }} />
            )}
          </IconButton>
        </ButtonTag> */}

        <video autoPlay={true} ref={videoRef} muted={!mic} hidden={!vid} />
        <div
          style={{
            width: "100%",
            height: "100%",
            postion: "absolute",
            top: "0px",
            left: "0px",
            backgroundColor: "black",
            zIndex: 13000,
            borderRadius: "12px",
          }}
        ></div>
      </VideoWrap>
    </>
  );
};

const NicknameTag = styled.p`
  color: white;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -0%);
  font-size: 15px;
  z-index: 3;
`;

const ButtonTag = styled.div`
  color: white;
  /* background-color: green; */
  position: absolute;
  transform: translate(-50%, -0%);
  font-size: 15px;
  width: 100%;
  height: 50px;
`;

const NoCamera = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1300;
  background-color: black;
`;

const VideoWrap = styled.div`
  width: ${(props) => (((props.height - 56) / 5 / 1.11) * 4) / 3}px;
  height: ${(props) => (props.height - 56) / 5 / 1.11}px;
  position: relative;
  justify-content: center;
  margin: 4px auto;
  video {
    position: absolute;
    transition: 0.2s;
    border-radius: 12px;
  }
  #buttondiv {
    display: none !important;
    transition: 0.2s;
  }
  :hover {
    video {
      position: absolute;
      transition: filter 0.2s;
      filter: brightness(40%);
    }
    #buttondiv {
      transition: filter 0.2s;
      display: flex !important;
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -0%);
      z-index: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* background-color: green; */
    }
  }
`;

export default VideoComponent;
