import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let contents = {
      title: data.get("title"),
      password: data.get("password"),
      contents: data.get("content"),
    };
    // ** 임시로 방 제목만으로
    dispatch(roomCreators.createRoomDB(data.get("title")));
    console.log(contents);
  };
  return (
    <Modal
      open={createRoomOpen}
      onClose={() => setCreateRoomOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" sx={style} onSubmit={handleSubmit}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", ml: 1, mb: 6, mt: 1 }}
        >
          🌊 방 만들기 🌊
        </Typography>
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
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
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
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
          sx={{ fontWeight: "bold", ml: 1, my: 3 }}
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

export default CreateRoomModal;
