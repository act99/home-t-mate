import React from "react";
import OpenViduVideoComponent from "./OpenViduVideoComponent";

const UserVideoComponent = (props) => {
  const getNicknameTag = () => {
    // ** 유저 닉네임 태그 가져오기
    return JSON.parse(props.streamManager.stream.connection.data).clientData;
  };
  return (
    <div>
      {this.props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={props.streamManager} />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
