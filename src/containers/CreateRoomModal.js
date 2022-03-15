import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import RoomImage from "../elements/RoomImage";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { imageApis } from "../shared/formApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "50px",
  boxShadow: 24,
  p: 4,
};

const CreateRoomModal = (props) => {
  const { createRoomOpen, setCreateRoomOpen } = props;
  const dispatch = useDispatch();

  // ** 이미지 업로드에 필요한 Func
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
    const data = new FormData(event.currentTarget);
    const file = fileInputRef.current.files[0];
    formData.append("file", file);
    imageApis
      .postImage(formData)
      .then((res) => {
        console.log(
          data.get("title"),
          data.get("password"),
          data.get("content"),
          res.data.file[0]
        );
        dispatch(
          roomCreators.createRoomDB(
            data.get("title"),
            data.get("password"),
            data.get("content"),
            res.data.file[0]
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // ** 게시물 쪽
    // const data = new FormData(event.currentTarget);
    // let contents = {
    //   title: data.get("title"),
    //   password: data.get("password"),
    //   content: data.get("content"),
    //   roomImg: data.get("dummyImg"),
    // };
    // ** 임시로 방 제목만으로
    // dispatch(
    //   roomCreators.createRoomDB(
    //     data.get("title"),
    //     data.get("password"),
    //     data.get("content"),
    //     data.get("dummyImg")
    //   )
    // );
  };
  const handleClose = () => {
    setPreview(null);
    setCreateRoomOpen(false);
  };
  return (
    <Modal
      open={createRoomOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        <Top>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ height: "100%", fontSize: "35px", mr: 1 }} />
          </IconButton>
        </Top>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", ml: 1, mb: 2, mt: 1, fontSize: 25 }}
        >
          🌊 방 만들기 🌊
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3, fontSize: 20 }}
        >
          이미지를 선택해주세요.
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 200, maxHeight: 150 }}>
          <FileInput type="file" ref={fileInputRef} onChange={selectFile} />
          <RoomImage
            src={
              preview
                ? preview
                : "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAw7S4%2Fbtrv3hi828F%2F9Ke2HIWCc1EqZmoE5TuSbk%2Fimg.jpg"
            }
          />
        </Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3, fontSize: 20 }}
        >
          만드실 방 이름을 적어주세요.
        </Typography>
        <TextField
          required
          id="outlined-required"
          name="title"
          label="방 이름"
          style={{
            width: "50%",
            minWidth: "470px",
          }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3, fontSize: 20 }}
        >
          비밀번호를 입력해주세요.
        </Typography>

        <TextField
          required
          id="outlined-required"
          name="password"
          label="비밀번호"
          style={{
            width: "50%",
            minWidth: "470px",
          }}
        />
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3, fontSize: 20 }}
        >
          간단한 운동 설명을 적어주세요.
        </Typography>

        <TextField
          id="outlined-required"
          name="content"
          label="운동 설명"
          style={{
            width: "50%",
            minWidth: "470px",
          }}
        />
        <TextField
          id="outlined-required"
          name="dummyImg"
          label="테스트 이미지 url"
          style={{
            width: "50%",
            minWidth: "470px",
          }}
        />
        <Button
          type="submit"
          fullWidth
          color="error"
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: "#f86453", py: 1.5 }}
        >
          <Typography
            component="h2"
            variant="h6"
            sx={{ fontWeight: "bold", ml: 1 }}
          >
            방 만들기
          </Typography>
        </Button>
      </Box>
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
  height: 100%;
  min-height: 150px;
  max-height: 150px;
  max-width: 200px;
  height: auto;
  cursor: pointer;
`;

const Top = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

export default CreateRoomModal;
