import styled from "@emotion/styled";
import React, { useRef } from "react";
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
  const userReducer = useSelector((state) => state.userReducer.user);
  const videoRef = React.useRef();
  const { streamManager, nickname, host, OV, me, session } = props;
  const size = useWindowSize();
  const { width, height } = size;

  const [mic, setMic] = React.useState(true);
  const [vid, setVid] = React.useState(true);
  const [myMic, setMyMic] = React.useState(true);
  const [myVid, setMyVid] = React.useState(true);
  React.useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
      // setMic(videoReducer.audio);
      // setVid(videoReducer.video);
    }
    if (session) {
      session.on("signal:userChanged", (event) => {
        const data = JSON.parse(event.data);
        console.log(nickname, data.nickname);
        if (nickname === data.nickname) {
          if (data.audio !== undefined) {
            setMyMic(data.audio);
            setMic(data.audio);
          } else if (data.video !== undefined) {
            setMyVid(data.video);
            setVid(data.video);
          }
        }
      });
    }
    return () => {};
  }, [streamManager, nickname, mic, vid, myVid, myMic, session]);

  const handleVideo = () => {
    console.log("비디오");
    if (vid === false) {
      if (nickname === userReducer.nickname) {
        dispatch(
          videoActions.setVideo({ audio: videoReducer.audio, video: true })
        );
        setMyVid(true);
        setVid(true);
      }
      if (myVid === false) {
      } else {
        setVid(true);
      }
    } else {
      if (nickname === userReducer.nickname) {
        dispatch(
          videoActions.setVideo({ audio: videoReducer.audio, video: false })
        );
        setMyVid(false);
        setVid(false);
      }
      if (myVid === false) {
      } else {
        setVid(false);
      }
    }
  };

  const handleMic = () => {
    console.log("마이크");
    if (mic === false) {
      if (nickname === userReducer.nickname) {
        dispatch(
          videoActions.setVideo({ video: videoReducer.video, audio: true })
        );
        setMyMic(true);
        setMic(true);
      }
      if (myMic === false) {
      } else {
        setMic(true);
      }
    } else {
      if (nickname === userReducer.nickname) {
        dispatch(
          videoActions.setVideo({ video: videoReducer.video, audio: false })
        );
        setMyMic(false);
        setMic(false);
      }
      if (myMic === false) {
      } else {
        setMic(false);
      }
    }
  };
  if (!session) {
    return <VideoWrap></VideoWrap>;
  }

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
          <>
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
          </>
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
