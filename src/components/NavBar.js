import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { MCreateRoomButton } from "../elements/BootstrapButton";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateRoomModal from "../containers/CreateRoomModal";
import useWindowSize from "../hooks/useWindowSize";
import Logo from "../assets/logo500300.png";
import "../App.css";
import styled from "@emotion/styled";
import { Avatar, IconButton } from "@mui/material";

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
  const profileImg = user.profileImg;

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
        light: "#000000",
        main: "#008000",
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
                      {/* <Tab
                        style={{
                          color: "#000000",
                          fontSize: 8,
                          fontFamily: "GmarketSansMedium",
                        }}
                        label=""
                        value="0"
                        onClick={() => history.push("/")}
                      /> */}
                      <Tab
                        style={{
                          color: "#000000",
                          fontWeight: "bold",
                          fontSize: 8,
                          fontFamily: "GmarketSansMedium",
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
                          fontFamily: "GmarketSansMedium",
                        }}
                        label="스토리"
                        value="2"
                        onClick={() => history.push("/story")}
                      />
                      <Tab
                        style={{
                          color: "#ff0000",
                          fontWeight: "bold",
                          fontSize: 8,
                          fontFamily: "GmarketSansMedium",
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
          left: 0,
          width: "100%",
          height: "72px",
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
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
                      style={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontFamily: "GmarketSansMedium",
                      }}
                      label="홈"
                      value="1"
                      onClick={() => history.push("/")}
                    />
                    <Tab
                      style={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontFamily: "GmarketSansMedium",
                      }}
                      label="스토리"
                      value="2"
                      onClick={() => history.push("/story")}
                    />
                    <Tab
                      style={{
                        color: "#ff0000",
                        fontWeight: "bold",
                        fontFamily: "GmarketSansMedium",
                      }}
                      label="LIVE NOW 🔥"
                      value="3"
                      onClick={() => history.push("/livenow")}
                    />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Toolbar>
          {user.is_login === false ? (
            <>
              <LoginButton
                color="inherit"
                onClick={() => handleNavigate("/login")}
                sx={{ color: "#000000", fontWeight: "bold" }}
              >
                로그인
              </LoginButton>
            </>
          ) : (
            <>
              <AvatarButton
                onClick={() => history.push("/mypage")}
                sx={{ p: 0 }}
              >
                <Avatar alt="Remy Sharp" src={profileImg} />
              </AvatarButton>
              <CreateButton
                onClick={() => {
                  setCreateRoomOpen(true);
                }}
              >
                지금 방 만들기
              </CreateButton>

              <CreateRoomModal
                createRoomOpen={createRoomOpen}
                setCreateRoomOpen={setCreateRoomOpen}
              />
              <Button
                color="inherit"
                onClick={() => history.push("/logout")}
                sx={{
                  color: "#000000",
                  fontWeight: "bold",
                  fontFamily: "GmarketSansMedium",
                }}
              >
                로그아웃
              </Button>
            </>
          )}
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

const LoginButton = styled.button`
  display: block;
  margin: auto;
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: solid 0px black;
  background-color: white;
  font-size: 16px;
  color: black;
  font-weight: bold;
  margin-right: 16px;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 160px;
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 8px;
  border: solid 2px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: 16px;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const AvatarButton = styled.button`
  display: block;
  margin: auto;
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: 32px;
  border: solid 0px;
  cursor: pointer;
`;

export default NavBar;
