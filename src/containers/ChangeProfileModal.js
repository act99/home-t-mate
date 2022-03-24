import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "@emotion/styled";
import ProfileImage from "../elements/ProfileImage";
import { imageApis } from "../shared/formApi";
import { ProfileStyle } from "../styles/profileImg";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const ChangeProfileModal = (props) => {
  const { openProfile, setOpenProfile, profileImg } = props;
  const dispatch = useDispatch();
  const [preview, setPreview] = React.useState(null);
  const fileInputRef = React.useRef();
  const selectFile = () => {
    const reader = new FileReader();
    const previewFile = fileInputRef.current.files[0];
    console.log(previewFile);
    reader.readAsDataURL(previewFile);
    reader.onloadend = () => {
      // console.log(reader.result);
      setPreview(reader.result);
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // ** 이미지 업로드
    let formData = new FormData();
    const file = fileInputRef.current.files[0];
    formData.append("profileImg", file);
    console.log(file);
    imageApis
      .editProfile(formData)
      .then((res) => {
        console.log(res.data);
        dispatch(userActions.login({ ...res.data, is_login: true }));
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };
  const handleClose = () => {
    setPreview(null);
    setOpenProfile(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openProfile}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openProfile}>
        <Box sx={ProfileStyle} component="form" onSubmit={handleSubmit}>
          <Top>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ height: "100%", fontSize: "40px" }} />
            </IconButton>
          </Top>
          <Box
            sx={{ width: "100%", maxWidth: 320, maxHeight: 240, mx: "auto" }}
          >
            <FileInput type="file" ref={fileInputRef} onChange={selectFile} />
            <ProfileImage src={preview ? preview : profileImg} />
          </Box>
          <button type="submit">버튼</button>
        </Box>
      </Fade>
    </Modal>
  );
};

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  /* top: 100px;
  left: 0;
  bottom: 0;
  right: 0;  */
  width: 100%;
  /* height: 100%; */
  height: 100%;
  min-height: 200px;
  max-width: 200px;
  /* min-height: 150px;
  max-height: 150px;
  max-width: 200px; */
  height: auto;
  cursor: pointer;
`;

const Top = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

export default ChangeProfileModal;
