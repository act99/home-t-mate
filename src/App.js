import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";
import LiveNow from "./pages/LiveNow";
import ChattingRoom from "./pages/ChattingRoom";
import { actionCreators as userActions } from "./redux/modules/userReducer";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Mypage from "./pages/Mypage";
import styled from "@emotion/styled";
import Story from "./pages/Story";
import VideoChatRoom from "./pages/VideoChatRoom";
import CheckVideo from "./pages/CheckVideo";

const App = () => {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user.is_login === false) {
      dispatch(userActions.userinfoDB());
    }
    // if (document.cookie) {
    //   dispatch(userActions.userinfoDB());
    // }
  }, [user.is_login]);

  return (
    <>
      {/* 배포 전 */}
      <NavBar />
      {/* 배포 후 */}
      {/* {window.location.href === `https://${window.location.host}/test` ? null : (
        <NavBar />
      )} */}
      <ConnectedRouter history={history}>
        <Switch>
          <WrapWide>
            <Route path="/checkvideo" exact component={CheckVideo} />
            <Route
              path="/livenow/chat/:roomId"
              exact
              component={VideoChatRoom}
            />
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
              <Route path="/livenow" exact component={LiveNow} />
            </WrapMedium>
          </WrapWide>
          {/* <Route path="*" exact component={NotFound} /> */}
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
