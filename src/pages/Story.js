//react-floating-button사용

import React from "react";
import StoryCard from "../components/StoryCard";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { positions } from "@mui/system";
import Write from "../components/Write";

function Story() {
  
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      {/* map으로 storycard생성예정 */}
      <Grid margin_top="120px" />
      <Grid margin_bottom="8px">
        <StoryCard />

        <WriteButton onClick={() => setOpen(true)}></WriteButton>
        <Write open={open} handleClose={handleClose}></Write>
      </Grid>
    </React.Fragment>
  );
}

const WriteButton = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgb(255, 228, 228);
  border-radius: 100%;
  position: fixed;
  right: 0px;
  bottom: 0px;
  cursor: pointer;
  z-index: 1;
`;

export default Story;
