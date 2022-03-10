//react-floating-button사용

import React from "react";
import StoryCard from "../components/StoryCard";
import Grid from "../elements/Grid";
import styled from "styled-components";
import { positions } from "@mui/system";

function Story() {
  return (
    <React.Fragment>
      {/* map으로 storycard생성예정 */}
      <Grid margin_top="120px"/>
      <Grid margin_bottom="8px">
          <StoryCard/>
          <Write/>
      </Grid>
    </React.Fragment>
  );
}

const Write = styled.div`
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
