import styled from "@emotion/styled";
import React, { Component } from "react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <Video autoPlay={true} ref={this.videoRef} />;
  }
}

const Video = styled.video`
  position: relative;
  float: left;
  cursor: pointer;
  /* border-radius: 50px; */
`;
