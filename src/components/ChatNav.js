import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
const ChatNav = (props) => {
  const { mySessionId, leaveSession, chatNum } = props;
  const handleOut = () => {
    console.log("out");
    leaveSession();
  };
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
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6">{mySessionId}</Typography>
            <PersonOutlineIcon sx={{ ml: 2 }} />
            <Typography>( {chatNum} / 5 )</Typography>
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
};
export default ChatNav;
