import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styled from "@emotion/styled";
import ProfileImage from "../../elements/ProfileImage";
import { imageApis } from "../../shared/formApi";
import { ProfileStyle } from "../../styles/profileImg";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/userReducer";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Grid, Text } from "../../elements";
import { border } from "@mui/system";

const ChangeProfileModal = (props) => {
  const { openProfile, setOpenProfile, profileImg } = props;
  const dispatch = useDispatch();
  const [preview, setPreview] = React.useState(null);
  const fileInputRef = React.useRef();
  const selectFile = () => {
    const reader = new FileReader();
    const previewFile = fileInputRef.current.files[0];
    reader.readAsDataURL(previewFile);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // ** 이미지 업로드
    let formData = new FormData();
    const file = fileInputRef.current.files[0];
    formData.append("profileImg", file);
    imageApis
      .editProfile(formData)
      .then((res) => {
        dispatch(userActions.login({ ...res.data, is_login: true }));
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
      sx={{ p: 0 }}
    >
      <Fade in={openProfile}>
        <Box sx={ProfileStyle} component="form" onSubmit={handleSubmit}>
          <Grid
            is_flex
            justify_content="space-between"
            BG_c="#597731"
            height="53px"
            padding="0px 30px 0px 30px"
          >
            <Text
              _onClick={handleClose}
              cursor="pointer"
              F_size="16px"
              F_family="SuncheonR"
              F_color="white"
            >
              취소
            </Text>
            <Text F_size="16px" F_family="SuncheonR" F_color="white">
              이미지 수정
            </Text>
            <button
              type="submit"
              style={{
                backgroundColor: "#597731",
                border: "none",
                padding: "0px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  fontFamily: "SuncheonR",
                  color: "white",
                }}
              >
                완료
              </p>
            </button>
          </Grid>

          {/* 이미지 선택하는부분 */}
          <Grid
            is_flex
            width="200px"
            height="350px"
            margin="auto"
            align_items="center"
          >
            <FileInput type="file" ref={fileInputRef} onChange={selectFile} />
            <ProfileImage src={preview ? preview : profileImg} />
          </Grid>
          <Grid is_flex position="absolute" bottom="0px" margin_left="33%">
            {preview === null ? (
              <Text
                F_size="16px"
                F_align="center"
                margin_bottom="90px"
                F_family="SuncheonB"
              >
                이미지를 넣어주세요.
              </Text>
            ) : (
              <Text
                F_size="16px"
                F_align="center"
                margin_bottom="90px"
                F_family="SuncheonB"
              >
                이미지가 등록되었어요.
              </Text>
            )}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 200px;
  max-width: 200px;
  height: auto;
  cursor: pointer;
`;

export default ChangeProfileModal;
