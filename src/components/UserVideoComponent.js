import styled from "@emotion/styled";
import React from "react";
import VideoComponent from "./VideoComponent";
import "./UserVideo.css";

const UserVideoComponent = (props) => {
  const getNicknameTag = () =>
    JSON.parse(props.streamManager.stream.connection.data).clientData;

  return (
    <div>
      {props.streamManager !== undefined ? (
        <>
          <VideoComponent streamManager={props.streamManager} />
          <Nickname>
            <p>{getNicknameTag()}</p>
          </Nickname>
        </>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

const Nickname = styled.div`
  p {
    text-align: center;
    position: absolute;
    width: auto;
    background-color: rgba(0, 0, 0, 0.5);
    font-weight: bold;
    color: white;
  }
`;
