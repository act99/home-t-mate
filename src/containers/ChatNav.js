import styled from "@emotion/styled";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const ChatNav = () => {
  const session = useSelector((state) => state.sessionReducer);
  const leaveSession = session.leaveSession;
  const mySessionId = session.mySessionId;
  const history = useHistory();
  const handleOut = () => {
    console.log("out");
    history.replace("/");
    leaveSession();
  };

  return (
    <>
      <NavBar>
        <TitleWrap>
          {mySessionId === null ? (
            <div></div>
          ) : (
            <TitleText>{mySessionId}</TitleText>
          )}
          <PersonOutlineIcon sx={{ fontSize: 28, ml: 3, mr: 1 }} />
          <MemberText>(0/5)</MemberText>
        </TitleWrap>
        <IconButton color="inherit" onClick={handleOut}>
          <LogoutIcon sx={{ fontSize: 36, mr: 4 }} />
        </IconButton>
      </NavBar>
    </>
  );
};

const NavBar = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  background-color: beige;
`;

const TitleText = styled.h3`
  font-weight: bold;
  font-size: 20px;
`;

const MemberText = styled.h5`
  font-weight: bold;
  font-size: 16px;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 56px;
`;

export default ChatNav;
