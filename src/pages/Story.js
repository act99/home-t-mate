//react-floating-button사용

import React from "react";
import StoryCard from "../components/StoryCard";
import Grid from "../elements/Grid";
import { positions } from "@mui/system";
import Write from "../components/Write";
import styled from "@emotion/styled";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Story() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const _post = useSelector((state) => state.postReducer.list);
  const test = useSelector((state) => state);
  console.log("state확인용", test);

  return (
    <React.Fragment>
      <Grid margin_top="120px" />

      {_post.map((v, i) => (
        <Grid key={i} margin_bottom="15px">
          <StoryCard key={i} {...v} />
        </Grid>
      ))}

      <WriteButton onClick={() => setOpen(true)}>
        <AddCircleIcon style={{ fontSize: "56px" }} />
      </WriteButton>

      <Write open={open} handleClose={handleClose}></Write>
    </React.Fragment>
  );
}

const WriteButton = styled.div`
  position: fixed;
  right: 16px;
  bottom: 32px;
  cursor: pointer;
  z-index: 1;
`;

export default Story;
