import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <>
      <Wrap>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://github.com/act99/mini_project">
            Frontend
          </Link>

          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}

          <Link
            color="inherit"
            href="https://github.com/hyeonjh/gongguri_backend"
          >
            Back end
          </Link>
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 200px;
  background-color: #e2f7de;
  margin: 0px;
`;

export default Footer;
