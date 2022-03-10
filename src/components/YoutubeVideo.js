import styled from "@emotion/styled";
import React from "react";
import YouTube from "react-youtube";
import useWindowSize from "../hooks/useWindowSize";

const YoutubeVideo = () => {
  const [url, setUrl] = React.useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  const size = useWindowSize();
  console.log(size);
  const youtubeRef = React.useRef();
  const opts = {
    width: `${size.width / 2}`,
    height: `${((size.width / 2) * 9) / 16}`,

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const _onReady = (e) => {
    e.target.pauseVideo();
  };
  console.log(youtubeRef.current);
  return (
    <Wrap>
      {/* <input
        type="text"
        onChange={handleChange}
        required
        placeholder="유튜브 Url"
      /> */}
      <YouTube
        videoId="2g811Eo7K8U"
        opts={opts}
        onReady={_onReady}
        ref={youtubeRef}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 80vw;
  height: 45vw;
`;

export default YoutubeVideo;
