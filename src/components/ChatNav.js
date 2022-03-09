import styled from "@emotion/styled";
import React from "react";

const ChatNav = (props) => {
  const { mySessionId, leaveSession } = props;
  return (
    <NavWrap>
      <NavHeader id="session-header">
        <h1 id="session-title">{mySessionId}</h1>
        <input
          className="btn btn-large btn-danger"
          type="button"
          id="buttonLeaveSession"
          onClick={leaveSession}
          value="Leave session"
        />
      </NavHeader>
    </NavWrap>
  );
};

const NavWrap = styled.div`
  width: 100%;
  height: 6vh;
  background-color: black;
  margin: 0px;
`;

const NavHeader = styled.div`
  margin-bottom: 20px;
  h1 {
    display: inline-block;
  }
`;

const RoomName = styled.h1`
  color: white;
  font-size: 20px;
`;
export default ChatNav;
