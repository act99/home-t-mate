import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { apis } from "../../shared/api";

const ChatNav = (props) => {
  const { roomName, roomId, width, height } = props;
  const history = useHistory();
  const handleOut = () => {
    apis
      .leaveRoom(roomId)
      .then((res) => {})
      .catch((error) => console.log(error));
    history.replace("/");
    // handleQuit();
  };
  React.useEffect(() => {
    return () => {};
  }, []);
  const subscribers = useSelector(
    (state) => state.subscriberReducer.subscribers
  );

  if (width < height) {
    return (
      <>
        <MNavBar width={width}>
          <MTitleWrap width={width}>
            {roomName === null || roomName === undefined ? (
              <div></div>
            ) : (
              <MTitleText width={width}>
                {roomName.length > 8 ? roomName.slice(0, 8) + "..." : roomName}
              </MTitleText>
            )}
            <PersonOutlineIcon
              sx={{ fontSize: width * 0.05, ml: 3, mr: 0.1, mb: 0.5 }}
            />
            <MMemberText>( {subscribers.length} / 5 )</MMemberText>
          </MTitleWrap>
          <IconButton
            color="inherit"
            onClick={handleOut}
            sx={{ mr: width * 0.005 }}
          >
            <LogoutIcon sx={{ fontSize: width * 0.05, margin: 0 }} />
          </IconButton>
        </MNavBar>
      </>
    );
  }

  return (
    <>
      <NavBar>
        <TitleWrap>
          {roomName === null || roomName === undefined ? (
            <div></div>
          ) : (
            <TitleText>
              {roomName.length > 8 ? roomName.slice(0, 8) + "..." : roomName}
            </TitleText>
          )}
          <PersonOutlineIcon sx={{ fontSize: 32, ml: 3, mr: 1 }} />
          <MemberText>( {subscribers.length} / 5 )</MemberText>
        </TitleWrap>
        <IconButton color="inherit" onClick={handleOut}>
          <LogoutIcon sx={{ fontSize: 36, mr: 4 }} />
        </IconButton>
      </NavBar>
    </>
  );
};

const MNavBar = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.12}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
`;

const MTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 50%;
  height: auto;
  margin-left: ${(props) => props.width * 0.05}px;
`;

const MTitleText = styled.h3`
  font-weight: bold;
  font-size: ${(props) => props.width * 0.03}px;
  font-family: "GmarketSansMedium";
`;

const MMemberText = styled.h5`
  font-weight: bold;
  font-size: ${(props) => props.width * 0.03}px;
  font-family: "GmarketSansMedium";
`;

const NavBar = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  background-color: #ffffff;
`;

const TitleText = styled.h3`
  font-weight: bold;
  font-size: 20px;
  font-family: "GmarketSansMedium";
`;

const MemberText = styled.h5`
  font-weight: bold;
  font-size: 16px;
  font-family: "GmarketSansMedium";
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
