import React from "react";
import YouTube from "react-youtube";

const YoutubeVideo = () => {
  const [url, setUrl] = React.useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const _onReady = (e) => {
    e.target.pauseVideo();
  };
  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        required
        placeholder="유튜브 Url"
      />
      <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={_onReady} />
    </div>
  );
};

export default YoutubeVideo;
