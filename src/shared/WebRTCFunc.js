export const sendSignalUserVideo = (video, session) => {
  const data = {
    Svideo: video,
    nickname: this.state.myUserName + "OV",
  };
  const signalOptions = {
    data: JSON.stringify(data),
    type: "userChanged",
  };
  session.signal(signalOptions);
};

export const sendSignalUserAudio = (audio, session) => {
  const data = {
    Saudio: audio,
    nickname: this.state.myUserName + "OV",
  };
  const signalOptions = {
    data: JSON.stringify(data),
    type: "userChanged",
  };
  session.signal(signalOptions);
};
