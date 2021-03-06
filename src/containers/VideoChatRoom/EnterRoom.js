import React, { Component } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import "../../App.css";
import WebRTCContainer from "./WebRTCContainer";
import url from "../../shared/url";
const OPENVIDU_SERVER_URL = url.OPEN_VIDU;
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPEN_VIDU_SECRET;

class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      OV: undefined,
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      sessionToken: undefined,
      audio: this.props.audio,
      video: this.props.video,
      userModel: undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.video !== this.props.video) {
      this.sendSignalUserVideo(this.props.video);
    }
    if (prevProps.audio !== this.props.audio) {
      this.sendSignalUserAudio(this.props.audio);
    }
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  sendSignalUserAudio(audio) {
    const data = {
      Saudio: audio,
      nickname: this.state.myUserName + "OV",
    };
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }
  sendSignalUserVideo(video) {
    const data = {
      Svideo: video,
      nickname: this.state.myUserName + "OV",
    };
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  joinSession() {
    // ** setState ??? ????????? async ??? ?????? ??????

    this.OV = new OpenVidu();

    // ** session ?????????

    this.setState(
      {
        OV: this.OV,
        mySessionId: `Session${this.props.roomId}`,
        myUserName: `${this.props.nickname}`,
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        // ** ????????? ????????? ??????

        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState(
            {
              subscribers: subscribers,
            },
            () => {
              this.sendSignalUserVideo(this.props.video);
              this.sendSignalUserAudio(this.props.audio);
            }
          );
        });

        // ** ????????? ??????
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });
        // ** ?????? ???????????? ???????????? session ??? token ??? ???????????? return  ??????.
        // ** ??? ???, ????????? ????????? ????????? ????????? WebScoket??? ????????? ????????????, sdp ????????? ????????????.
        this.getToken().then((token) => {
          this.setState({
            sessionToken: token,
          });
          // ** ??? ?????? param??? OV Server ?????? ?????? ?????? ?????????, ??? ?????? param??? ?????? ????????? "streamCreated"??? ??????
          // ** ?????? ???????????????. ????????? ????????? ?????? ??????????????? DOM ??? ????????????.
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(() => {
              // ** ????????? ????????? stream (sdp ?????? ?????? ??????) ??? ????????????.
              let publisher = this.OV.initPublisher(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "240x180", // The resolution of your video "640x480", "1280x720"
                // frameRate: 30, // The frame rate of your video
                frameRate: 16, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // ** ????????? ????????? publishing ??????.
              mySession.publish(publisher);
              // ** ??? ?????? ?????? ???????????? ????????? ???????????? ??????????????? ???
              // ** ????????? ???????????? ????????? ???.
              this.setState({
                mainStreamManager: publisher,
                publisher: publisher,
              });
              // this.sendSignalUserVideo(this.props.video);
              // this.sendSignalUserAudio(this.props.audio);
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
              this.sendSignalUserVideo(this.props.video);
              this.sendSignalUserAudio(this.props.audio);
            });
        });
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <>
        {this.state.session === undefined ? (
          <div id="join"></div>
        ) : (
          <WebRTCContainer
            publisher={this.state.publisher}
            subscribers={this.state.subscribers}
            leaveSession={this.leaveSession}
            session={this.state.session}
            OV={this.state.OV}
            mySessionId={this.state.mySessionId}
            host={this.props.host}
          />
        )}

        {/* {this.state.session === undefined ? <div id="join"></div> : null}

        {this.state.session !== undefined ? (
          this.props.width < this.props.height ? (
            <MVideoTest width={this.props.width}>
              <WebRTCContainer
                publisher={this.state.publisher}
                subscribers={this.state.subscribers}
                leaveSession={this.leaveSession}
                session={this.state.session}
                OV={this.state.OV}
                mySessionId={this.state.mySessionId}
                host={this.props.host}
              />
            </MVideoTest>
          ) : (
            <VideoTest height={this.props.height}>
              <WebRTCContainer
                publisher={this.state.publisher}
                subscribers={this.state.subscribers}
                leaveSession={this.leaveSession}
                session={this.state.session}
                OV={this.state.OV}
                mySessionId={this.state.mySessionId}
                host={this.props.host}
              />
            </VideoTest>
          )
        ) : null} */}
      </>
    );
  }

  async getToken() {
    const gogo = await this.createSession(this.state.mySessionId).then(
      (sessionId) => this.createToken(sessionId)
    );
    return gogo;
  }
  // /openvidu/api/sessions
  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = {};
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

export default VideoContainer;
