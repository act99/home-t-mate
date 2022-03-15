import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { CreateRoomButton } from "../elements/BootstrapButton";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreateRoomModal from "../containers/CreateRoomModal";
import useWindowSize from "../hooks/useWindowSize";
import Logo from "../assets/logo500300.png";
const NavBar = (props) => {
  // ** leaveSession 가져오기 위해
  const leaveSession = useSelector(
    (state) => state.sessionReducer.leaveSession
  );
  // ** 채팅방 이동 시 네비게이션 바 변경
  const { mySessionId, chatNum } = props;
  const pathname = window.location.pathname;
  console.log(pathname);
  const handleOut = () => {
    console.log("out");
    history.replace("/");
    leaveSession();
  };
  // ** 채팅방 이동 시 네비게이션 바 변경 끝

  const dispatch = useDispatch();
  const handleNavigate = (target) => {
    history.push(target);
  };
  // ** 윈도우 사이즈 핸들러
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;

  const logout = () => {
    dispatch(userActions.logout());
    history.replace("/");
    history.go(0);
  };
  const user = useSelector((state) => state.userReducer.user);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const routeUrl = useSelector((state) => state.router.location.pathname);

  // ** 방 만들기 모달
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);
  React.useEffect(() => {
    if (routeUrl === "/") {
      setValue("1");
    } else if (routeUrl.includes("/story")) {
      setValue("2");
    } else if (routeUrl.includes("/livenow")) {
      setValue("3");
    } else {
      setValue("1");
    }
  }, [routeUrl, pathname]);

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  if (pathname.includes("checkvideo")) {
    return <div> </div>;
  }
  if (pathname.includes("livenow/")) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "black",
            width: `${width}px`,
            height: `${height * 0.065}px`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6">{mySessionId}</Typography>
              <PersonOutlineIcon sx={{ ml: 2 }} />
              <Typography>( {chatNum + 1} / 5 )</Typography>
              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
              <IconButton color="inherit" onClick={handleOut}>
                <LogoutIcon sx={{ fontSize: 35 }} />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={Logo}
              height="50px"
              onClick={() => history.push("/")}
              style={{ cursor: "pointer", marginRight: 30 }}
            />
            {/* <Button
              onClick={() => history.push("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                backgroundColor: "white",
              }}
            >
              Logo
            </Button> */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <TabContext value={value}>
                <Box sx={{}}>
                  <TabList
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      style={{ color: "#000000", fontWeight: "bold" }}
                      label="홈"
                      value="1"
                      onClick={() => history.push("/")}
                    />
                    <Tab
                      style={{ color: "#000000", fontWeight: "bold" }}
                      label="스토리"
                      value="2"
                      onClick={() => history.push("/story")}
                    />
                    <Tab
                      style={{ color: "#000000", fontWeight: "bold" }}
                      label="LIVE NOW"
                      value="3"
                      onClick={() => history.push("/livenow")}
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
            {user.is_login === false ? (
              <Button
                color="inherit"
                onClick={() => handleNavigate("/login")}
                sx={{ color: "#000000", fontWeight: "bold" }}
              >
                로그인
              </Button>
            ) : (
              <>
                <CreateRoomButton
                  variant="contained"
                  disableRipple
                  onClick={() => {
                    setCreateRoomOpen(true);
                  }}
                >
                  지금 방 만들기
                </CreateRoomButton>
                <CreateRoomModal
                  createRoomOpen={createRoomOpen}
                  setCreateRoomOpen={setCreateRoomOpen}
                />
                <Button
                  color="inherit"
                  onClick={logout}
                  sx={{ color: "#000000", fontWeight: "bold" }}
                >
                  로그아웃
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
