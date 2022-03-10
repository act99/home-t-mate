import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";
import Rooms from "./pages/Rooms";
import ChattingRoom from "./pages/ChattingRoom";
import { actionCreators as userActions } from "./redux/modules/userReducer";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Container from "@mui/material/Container";
import Mypage from "./pages/Mypage";
import VideoContainer from "./containers/VideoContainer";
import styled from "@emotion/styled";
import Story from "./pages/Story";
import Test from "./pages/Test";
const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(window.location.href);
    console.log(window.location.host);
    if (document.cookie) {
      dispatch(userActions.userinfoDB());
    }
  }, []);

  return (
    <>
      {/* 배포 전 */}
      {window.location.href === `http://${window.location.host}/test` ? null : (
        <NavBar />
      )}
      {/* 배포 후 */}
      {/* {window.location.href === `https://${window.location.host}/test` ? null : (
        <NavBar />
      )} */}
      <ConnectedRouter history={history}>
        <Switch>
          <WrapWide>
            <Route path="/test" exact component={VideoContainer} />
            <Route path="/test2" exact component={Test} />
            <WrapMedium>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/mypage" exact component={Mypage} />
              <Route
                path="/user/kakao/callback/"
                exact
                component={KakaoOauth}
              />
              <Route path="/story" exact component={Story} />
              {/* 채팅방 입장 */}
              <Route path="/rooms" exact component={Rooms} />
              <Route path="/rooms/:roomId" exact component={ChattingRoom} />

              {/* <Route path="*" exact component={NotFound} /> */}
            </WrapMedium>
          </WrapWide>
        </Switch>
      </ConnectedRouter>
    </>
  );
};

const WrapMedium = styled.div`
  margin: auto;
  width: 1200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WrapWide = styled.div`
  margin: auto;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
