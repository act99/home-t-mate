import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import {
  CreateRoomButton,
  MCreateRoomButton,
} from "../elements/BootstrapButton";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import CreateRoomModal from "../containers/CreateRoomModal";
import useWindowSize from "../hooks/useWindowSize";
import Logo from "../assets/logo500300.png";
const NavBar = (props) => {
  // ** 채팅방 이동 시 네비게이션 바 변경
  const pathname = window.location.pathname;
  console.log(pathname);

  // ** 채팅방 이동 시 네비게이션 바 변경 끝

  const dispatch = useDispatch();
  const handleNavigate = (target) => {
    history.push(target);
  };
  // ** 윈도우 사이즈 핸들러
  const size = useWindowSize();
  const width = size.width;
  const height = size.height;
  console.log(width);
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

  // ** 로그인 시 아바타
  const settings = ["마이페이지", "로그아웃"];

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleMypage = (settings) => {
    if (settings === "마이페이지") {
      history.push("/mypage");
      handleCloseUserMenu();
    } else if (settings === "로그아웃") {
      handleCloseUserMenu();
      history.push("/logout");
    }
  };
  React.useEffect(() => {
    if (routeUrl === "/") {
      setValue("1");
    } else if (routeUrl.includes("/story")) {
      setValue("2");
    } else if (routeUrl.includes("/livenow")) {
      setValue("3");
    } else {
      setValue("0");
    }
  }, [routeUrl, pathname, width]);

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

  if (pathname.includes("checkvideo") || pathname.includes("/livenow/chat")) {
    return <div> </div>;
  }
  if (width <= 700) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "white",
            position: "sticky",
            zIndex: 100,
            top: 0,
            width: "100%",
          }}
        >
          <Container>
            <Toolbar disableGutters>
              <img
                alt=""
                src={Logo}
                height="40px"
                onClick={() => history.push("/")}
                style={{ cursor: "pointer", marginRight: 30 }}
              />
              <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
                <TabContext value={value}>
                  <Box sx={{}}>
                    <TabList
                      indicatorColor="secondary"
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        style={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: 8,
                        }}
                        label=""
                        value="0"
                        onClick={() => history.push("/")}
                      />
                      <Tab
                        style={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: 8,
                        }}
                        label="홈"
                        value="1"
                        onClick={() => history.push("/")}
                      />
                      <Tab
                        style={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: 8,
                        }}
                        label="스토리"
                        value="2"
                        onClick={() => history.push("/story")}
                      />
                      <Tab
                        style={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: 8,
                        }}
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
                  <MCreateRoomButton
                    variant="contained"
                    disableRipple
                    sx={{ fontSize: 8 }}
                    onClick={() => {
                      setCreateRoomOpen(true);
                    }}
                  >
                    지금 방 만들기
                  </MCreateRoomButton>
                  <CreateRoomModal
                    createRoomOpen={createRoomOpen}
                    setCreateRoomOpen={setCreateRoomOpen}
                  />
                  <Button
                    color="inherit"
                    onClick={logout}
                    sx={{ color: "#000000", fontWeight: "bold", fontSize: 8 }}
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
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          position: "sticky",
          zIndex: 100,
          top: 0,
          width: "100%",
        }}
      >
        <Container>
          <Toolbar disableGutters>
            <img
              alt=""
              src={Logo}
              height="50px"
              onClick={() => history.push("/")}
              style={{ cursor: "pointer", marginRight: 30 }}
            />
            <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
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
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleMypage(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default NavBar;
