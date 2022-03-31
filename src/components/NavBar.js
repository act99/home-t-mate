import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { history } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateRoomModal from "../containers/CreateRoomModal";
import useWindowSize from "../hooks/useWindowSize";
import Logo from "../assets/mainlogo.png";
import "../App.css";
import styled from "@emotion/styled";
import {
  Avatar,
  Divider,
  IconButton,
  ListSubheader,
  Menu,
} from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PeopleIcon from "@mui/icons-material/People";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = (props) => {
  // ** 모바일 전용
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ** 채팅방 이동 시 네비게이션 바 변경
  const pathname = window.location.pathname;

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
  const profileImg = user.profileImg;

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const routeUrl = useSelector((state) => state.router.location.pathname);

  //스크롤 event
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const updateScroll = () => {
      setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  }
  React.useEffect(()=>{
      window.addEventListener('scroll', updateScroll);
  });


  // ** 방 만들기 모달

  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);

  const handleMMenu = (url) => {
    history.push(`/${url}`);
    handleClose();
  };

  React.useEffect(() => {
    if (routeUrl === "/") {
      setValue("1");
    } else if (routeUrl.includes("/howtouse")) {
      setValue("2");
    } else if (routeUrl.includes("/story")) {
      setValue("3");
    } else if (routeUrl.includes("/livenow")) {
      setValue("4");
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
  if (width < height) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: scrollPosition < 500 ? "rgba( 255, 255, 255, 0 )" : "white", //배경 투명하게
            boxShadow: "0px 0px 0px 0px rgba( 255, 255, 255, 0 )", //boxshoadow효과 없애기
            position: "sticky",
            zIndex: 100,
            top: 0,
            width: "100%",
          }}
        >
          <Container>
            <Toolbar disableGutters>
              <div>
                <IconButton
                  id="basic-button"
                  aria-controls={anchorEl ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{ mt: 1, ml: 0 }}
                >
                  <Box
                    sx={{
                      width: "30vh",
                      height: "50vh",
                    }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                    >
                      <Top>
                        <h3>메뉴</h3>
                        <IconButton onClick={handleClose}>
                          <CloseIcon sx={{ fontSize: "24px", margin: "0px" }} />
                        </IconButton>
                      </Top>
                      <Divider />
                      <ListItemButton onClick={() => handleMMenu("")}>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="홈" />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={() => handleMMenu("howtouse")}>
                        <ListItemIcon>
                          <QuestionMarkIcon />
                        </ListItemIcon>
                        <ListItemText primary="사용 방법" />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={() => handleMMenu("story")}>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="스토리" />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={() => handleMMenu("livenow")}>
                        <ListItemIcon>
                          <OndemandVideoIcon />
                        </ListItemIcon>
                        <ListItemText primary="LiveNow" />
                      </ListItemButton>
                    </List>
                  </Box>
                  {/* <MenuItem onClick={() => handleMMenu("howtouse")}>
                    사용 방법
                  </MenuItem>
                  <MenuItem onClick={() => handleMMenu("story")}>
                    스토리
                  </MenuItem>
                  <MenuItem onClick={() => handleMMenu("livenow")}>
                    LiveNow
                  </MenuItem> */}
                </Menu>
              </div>
              <Box sx={{ flexGrow: 1, display: { md: "flex" } }}>
                <img
                  alt=""
                  src={Logo}
                  height="32px"
                  onClick={() => history.push("/")}
                  style={{ cursor: "pointer", marginRight: 30, marginLeft: 8 }}
                />
              </Box>
              {user.is_login === false ? (
                <Button
                  color="inherit"
                  onClick={() => handleNavigate("/login")}
                  sx={{ color: "#000000", fontWeight: "bold", fontSize: 8 }}
                >
                  로그인
                </Button>
              ) : (
                <>
                  <MCreateButton
                    width={width * 0.2}
                    height="30"
                    onClick={() => {
                      setCreateRoomOpen(true);
                    }}
                  >
                    방 만들기
                  </MCreateButton>
                  <CreateRoomModal
                    createRoomOpen={createRoomOpen}
                    setCreateRoomOpen={setCreateRoomOpen}
                  />
                  <Button
                    color="inherit"
                    onClick={() => history.push("/logout")}
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
    //컴퓨터 화면일때
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: scrollPosition < 500 ? "rgba( 255, 255, 255, 0 )" : "white", //배경 투명하게
          boxShadow: "0px 0px 0px 0px rgba( 255, 255, 255, 0 )", //boxshoadow효과 없애기
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
                      label="사용 방법"
                      value="2"
                      onClick={() => history.push("/howtouse")}
                    />
                    <Tab
                      style={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontFamily: "GmarketSansMedium",
                      }}
                      label="스토리"
                      value="3"
                      onClick={() => history.push("/story")}
                    />
                    <Tab
                      style={{
                        color: "#ff0000",
                        fontWeight: "bold",
                        fontFamily: "GmarketSansMedium",
                      }}
                      label="LIVE NOW 🔥"
                      value="4"
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
  background-color: rgba( 255, 255, 255, 0 );
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

//방만들기 컴퓨터화면 버튼
const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 160px;
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 8px;
  border: solid 2px green;
  background-color: rgba( 255, 255, 255, 0 );
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

//방만들기 모바일화면 버튼
const MCreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 8px;
  border: solid 2px green;
  background-color: rgba( 255, 255, 255, 0 );
  font-size: 8px;
  color: green;
  font-weight: bold;
  margin-right: 8px;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

//마이페이지 버튼
const AvatarButton = styled.button`
  display: block;
  margin: auto;
  width: 56px;
  height: 56px;
  border-radius: 10px;
  background-color: rgba( 255, 255, 255, 0 );
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: 32px;
  border: solid 0px;
  cursor: pointer;
`;

const LogoButton = styled.div`
  cursor: pointer;
  width: 100px;
  height: 40px;
  background-image: url("${(props) => props.src}");
  background-size: 80% auto;
  background-position: center;
  background-repeat: no-repeat;
`;
const Top = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  h3 {
    font-size: 16px;
    margin-left: 16px;
  }
`;

export default NavBar;
