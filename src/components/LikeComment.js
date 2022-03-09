//import Library
//react-icons, mui/icons-material
import React from "react";

import { CardHeader, Avatar, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BsChat } from "react-icons/bs";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//import Actions

//import elements
import { Grid, Text } from "../elements";

//import Icon

// impot Component
import Detail from "./Detail";
//import Actions

//import axios

export default function LikeComment(props) {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <IconButton
        sx={{ pl: 2, pb: 2 }}
        aria-label="add to favorites"
        onClick={() => console.log("hi")}
      >
        <FavoriteBorderIcon />
      </IconButton>
      <IconButton sx={{ pb: 2 }} aria-label="chat" onClick={handleOpen}>
        <BsChat size="22" border="3px" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Detail />
          <Grid position="absolute" right="0">
            <CloseIcon
              sx={{ color: "white", fontSize: 40 }}
              onClick={handleClose}
            />
          </Grid>
        </div>
      </Modal>
      <Text padding_left="16px" F_weight="bold">
        좋아요0개
      </Text>
    </>
  );
}
