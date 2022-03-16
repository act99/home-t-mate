//react-floating-button사용

import React from "react";
import StoryCard from "../components/StoryCard";
import Grid from "../elements/Grid";
import { positions } from "@mui/system";
import Write from "../components/Write";
import styled from "@emotion/styled";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { useDispatch, useSelector } from "react-redux";

function Story() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  },[]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const _post = useSelector((state) => state.postReducer);
  console.log("post확인용", _post);

  return (
    <React.Fragment>
      <Grid margin_top="120px" />

      {_post.list.map((v, i) => (
        <Grid key={i} margin_bottom="8px">
          <StoryCard key={i} {...v} />
        </Grid>
      ))}

      <WriteButton onClick={() => setOpen(true)}></WriteButton>
      <Write open={open} handleClose={handleClose}></Write>
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
