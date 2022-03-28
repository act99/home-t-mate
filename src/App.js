import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";
import LiveNow from "./pages/LiveNow";
import { actionCreators as userActions } from "./redux/modules/userReducer";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Mypage from "./pages/Mypage";
import styled from "@emotion/styled";
import Story from "./pages/Story";
import VideoChatRoom from "./pages/VideoChatRoom";
import CheckVideo from "./pages/CheckVideo";
import Logout from "./pages/Logout";
import Footer from "./components/Footer";
import TermsOfUse from "./pages/TermsOfUse";
import Privacy from "./pages/Privacy";
import SearchingLiveNow from "./pages/SearchingLiveNow";
import ReEnterKeyword from "./pages/ReEnterKeyword";
import ScrollToTop from "./hooks/scrollToTop";
import { deleteCookie } from "./shared/Cookie";
import { actionCreators as videoActions } from "./redux/modules/videoReducer";
const App = () => {
  const dispatch = useDispatch();
  const videoReducer = useSelector((state) => state.videoReducer.video);
  React.useEffect(() => {
    // if (videoReducer !== undefined) {
    //   if (videoReducer.video === undefined) {
    //     dispatch(videoActions.setVideo({ ...videoReducer, video: true }));
    //   } else if (videoReducer.audio === undefined) {
    //     dispatch(videoActions.setVideo({ ...videoReducer, audio: true }));
    //   }
    // } else {
    //   dispatch(videoActions.setVideo({ video: true, audio: true }));
    // }
    if (document.cookie) {
      dispatch(userActions.userinfoDB());
    }
    // if ()
    // window.addEventListener("beforeunload", dispatch(userActions.logout()));
    // window.addEventListener("beforeunload", alert("종료!!"));
    return () => {
      // if (window.location.reload) {
      // } else {
      //   window.removeEventListener(
      //     "beforeunload",
      //     dispatch(userActions.logout())
      //   );
      // }
    };
  }, [dispatch]);

  return (
    <>
      <div className="App">
        <NavBar />
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/mypage" exact component={Mypage} />
            <Route path="/user/kakao/callback" exact component={KakaoOauth} />
            <Route path="/story" exact component={Story} />
            <Route path="/livenow" exact component={LiveNow} />
            <Route
              path="/livenow/:keyword"
              exact
              component={SearchingLiveNow}
            />
            <Route path="/reenterkeyword" exact component={ReEnterKeyword} />

            <Route path="/checkvideo" exact component={CheckVideo} />
            <Route
              path="/livenow/chat/:roomId"
              exact
              component={VideoChatRoom}
            />
            <Route path="/logout" exact component={Logout} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/termsofuse" exact component={TermsOfUse} />

            <Route path="*" exact component={NotFound} />
          </Switch>
        </ConnectedRouter>
        <Footer />
      </div>
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
