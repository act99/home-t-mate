import React from "react";
import { Image } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { Grid } from "../elements";
import { Modal } from "@mui/material";
import Detail from "./Detail";
import CloseIcon from "@mui/icons-material/Close";

function HomeImg(props) {
  const { photoResponseDto } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!photoResponseDto) {
      dispatch(postActions.getPostDB());
    }
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Image
        _onClick={handleOpen}
        width="224px"
        height="224px"
        margin="0px 20px 0px 0px"
        src={photoResponseDto && photoResponseDto[0].postImg}
      ></Image>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Detail
            id={props.id}
            commentUserDto={props.commentUserDto}
            likeUserDto={props.likeUserDto}
          />
          <Grid position="absolute" right="0">
            <CloseIcon
              sx={{ color: "white", fontSize: 40 }}
              onClick={handleClose}
            />
          </Grid>
        </div>
      </Modal>
    </>
  );
}

export default HomeImg;
