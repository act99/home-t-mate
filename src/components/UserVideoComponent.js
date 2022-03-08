import styled from "@emotion/styled";
import React, { Component } from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";
import "./UserVideo.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <WrapVideo>
        {this.props.streamManager !== undefined ? (
          <StreamComponent className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <Nickname>{this.getNicknameTag()}</Nickname>
          </StreamComponent>
        ) : null}
      </WrapVideo>
    );
  }
}

const WrapVideo = styled.div`
  width: 100%;
`;

const StreamComponent = styled.div`
  width: 300px;
  display: flex;
  flex-direction: row;
  margin: 0px 10px;
`;

const Nickname = styled.div`
  text-align: center;
  position: absolute;
  width: auto;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
`;
