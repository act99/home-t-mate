import React from "react";
import { Image } from "../../elements";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/postReducer";
import { Grid } from "../../elements";
import { Modal } from "@mui/material";
import Detail from "../Story/Detail";
import CloseIcon from "@mui/icons-material/Close";
import useWindowSize from "../../hooks/useWindowSize";

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
  const size = useWindowSize();
  const { width, height } = size;
  return (
    <>
      <Image
        _onClick={handleOpen}
        width={width * 0.12 + "px"}
        height={width * 0.12 + "px"}
        margin={`${width * 0.005}px ${width * 0.005}px ${width * 0.005}px ${
          width * 0.005
        }px`}
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
