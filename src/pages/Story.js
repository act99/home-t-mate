//react-floating-button사용

import React from "react";
import StoryCard from "../components/Story/StoryCard";
import Grid from "../elements/Grid";
import Write from "../components/Story/Write";
import styled from "@emotion/styled";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfinityPost from "../shared/InfinityPost";

function Story() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const _post = useSelector((state) => state.postReducer);
  const { list, is_loading } = _post;
  const handleNext = () => {
    dispatch(postActions.getPostDB());
  };

  return (
    <>
      <Grid BG_c="#f9f9f9" height="60px" />

      <InfinityPost callNext={handleNext} loading={is_loading}>
        {list.map((v, i) => (
          <Grid key={i} padding="15px 0px" BG_c="#f9f9f9">
            <StoryCard key={i} {...v} />
          </Grid>
        ))}
      </InfinityPost>

      <WriteButton onClick={() => setOpen(true)}>
        <AddCircleIcon style={{ fontSize: "56px" }} />
      </WriteButton>

      <Write open={open} handleClose={handleClose}></Write>
    </>
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
