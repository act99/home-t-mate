import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "solid 0px",
  boxShadow: 24,
  p: 4,
};

const RoomCardModal = (props) => {
  const { clickCard, setClickCard, data } = props;
  const { roomId, roomName, content, member } = data;
  const history = useHistory();

  console.log(data);
  console.log(clickCard);
  return (
    <Modal
      open={clickCard}
      onClose={() => setClickCard(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Top>gd</Top>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button
          sx={{ width: "100%", py: 1, borderRadius: "15px" }}
          variant="outlined"
          onClick={() => {
            history.push({
              pathname: `/checkvideo`,
              state: { roomId: roomId, roomName: roomName },
            });
          }}
        >
          이 방에 참여하기
        </Button>
      </Box>
    </Modal>
  );
};

const Top = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
`;

export default RoomCardModal;
