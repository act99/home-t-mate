import styled from "@emotion/styled";

const BodyWrap = styled.div`
  width: 100vw;
`;

const MainVideoWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const MainVideo = styled.div`
  height: auto;
  p {
    /* position: absolute; */
    display: inline-block;
    background: #f8f8f8;
    padding-right: 5px;
    padding-left: 5px;
    /* left: 800px; */
    font-size: 22px;
    color: #777777;
    font-weight: bold;
    border-bottom-right-radius: 4px;
  }
  video {
    cursor: initial;
  }
`;

const StreamContainer = styled.div`
  padding: 0;
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: row;
`;

export { BodyWrap, MainVideo, StreamContainer, VideoList, MainVideoWrap };
