import React from "react";
import { Grid, Image, Button, Text } from "../elements";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ImageIcon from "@mui/icons-material/Image";
import Img from "../components/Img";
import CheckIcon from "@mui/icons-material/Check";
import Avatar from "@mui/material/Avatar";
import { history } from "../redux/store";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";

function Write(props) {
  const dispatch = useDispatch();

  const { open, handleClose } = props;

  const fileInput = React.useRef();
  const contents = React.useRef();

  const [fileSelected, setFileSelected] = React.useState(false);
  const [preview, setPreview] = React.useState([]);
  const [tempFile, setTempFile] = React.useState([]);

  const _user = useSelector((state) => state.userReducer.user);

  let tempData = [];
  const formData = new FormData();

  const selectFile = (e) => {
    console.log("e", e);
    const files = fileInput.current.files;

    setTempFile([...tempFile, files]);

    for (let i = 0; i < files.length; i++) {
      formData.append("imgUrl", files[i]);
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.addEventListener("load", function () {
        tempData.push(reader.result);
        if (tempData.length === files.length) {
          setPreview([...preview, ...tempData]);
          setFileSelected(true);
          console.log("selectFile입니다", formData);
        }
      });
    }
  };

  const addPost = () => {
    const imgForm = new FormData();
    for (let i = 0; i < tempFile[0].length; i++) {
      imgForm.append("postImg", tempFile[0][i]);
      console.log(tempFile[0][i]);
      console.log(imgForm);
    }
    const userImage =
      _user.userImg === undefined
        ? "https://t1.daumcdn.net/cfile/tistory/214D86345702231338"
        : _user.userImg;
    const content = {
      content: contents.current.value,
      username: _user.username,
      nickname: _user.nickname,
      userImg: userImage,
      createdAt: "",
      modifiedAt: "",
    };
    console.log(imgForm);
    dispatch(postActions.addPostDB(content, imgForm));
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {fileSelected ? (
              <Grid>
                <Grid
                  B_bottom="1px solid #dbdbdb"
                  is_flex
                  min_width="648px"
                  max_width="min(calc(100vw - 72px),1151px)"
                  width="1151px"
                  justify_content="space-between"
                  height="42px"
                  BG_c=""
                >
                  <Grid
                    width="42px"
                    height="42px"
                    B_top_left_radius="15px"
                    BG_c="white"
                  />
                  <Grid
                    is_flex
                    width="100%"
                    height="42px"
                    BG_c="white"
                    justify_content="center"
                    vertical_align="middle"
                    align_items="center"
                  >
                    <Text vertical_align="middle">새 게시물 만들기</Text>
                  </Grid>
                  <Grid
                    width="42px"
                    height="42px"
                    B_top_right_radius="15px"
                    BG_c="white"
                  >
                    <Button
                      margin="7px 0 0 0"
                      border="0px"
                      BG_color="white"
                      width="30px"
                      _onClick={addPost}
                    >
                      <CheckIcon />
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  is_flex
                  flex_direction="row"
                  justify_content="center"
                  align_items="center"
                  min_width="648px"
                  min_height="348px"
                  max_width="min(calc(100vw - 72px),1151px)"
                  max_height="min(calc(100vw - 372px),855px)"
                  width="1151px"
                  height="calc(100vmin - 219px)"
                  B_bottom_left_radius="15px"
                  B_bottom_right_radius="15px"
                  BG_c="white"
                >
                  <Img
                    postImg={preview}
                    size="max(348px,min(calc(100vmin - 219px),min(calc(100vw - 372px),855px)))"
                  ></Img>
                  <Grid is_flex flex_direction="column" width="100%">
                    <Grid
                      is_flex
                      justify_content="flex-start"
                      min_width="300px"
                      width="100%"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={_user.userImg ? _user.userImg : ""}
                        sx={{ margin: "20px", width: 50, height: 50 }}
                      />
                      <Text>{_user.nickname ? _user.nickname : ""}</Text>
                    </Grid>
                    <TextArea ref={contents} rows="10" wrap="hard"></TextArea>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid>
                <Grid
                  B_bottom="1px solid #dbdbdb"
                  is_flex
                  min_width="348px"
                  max_width="min(calc(100vw - 372px),855px)"
                  width="751px"
                  justify_content="space-between"
                  height="42px"
                  BG_c=""
                >
                  <Grid
                    width="42px"
                    height="42px"
                    B_top_left_radius="15px"
                    BG_c="white"
                  />
                  <Grid
                    is_flex
                    width="100%"
                    height="42px"
                    BG_c="white"
                    justify_content="center"
                    vertical_align="middle"
                    align_items="center"
                  >
                    <Text vertical_align="middle">새 게시물 만들기</Text>
                  </Grid>
                  <Grid
                    width="42px"
                    height="42px"
                    B_top_right_radius="15px"
                    BG_c="white"
                  />
                </Grid>
                <Grid
                  is_flex
                  flex_direction="column"
                  justify_content="center"
                  align_items="center"
                  min_width="348px"
                  min_height="348px"
                  max_width="min(calc(100vw - 372px),855px)"
                  max_height="min(calc(100vw - 372px),855px)"
                  width="751px"
                  height="calc(100vmin - 219px)"
                  B_bottom_left_radius="15px"
                  B_bottom_right_radius="15px"
                  BG_c="white"
                >
                  <ImageIcon />
                  <Text margin="20px" F_size="22px">
                    버튼을 눌러 사진을 추가하세요
                  </Text>
                  <Button
                    _onClick={() => {
                      fileInput.current.click();
                    }}
                    font_weight="600"
                    font_color="white"
                    B_radius="5px"
                    border="0px solid #0095f6"
                    BG_color="#0095f6"
                    width="120px"
                    height="30px"
                  >
                    컴퓨터에서 선택
                  </Button>
                  <input
                    ref={fileInput}
                    onChange={selectFile}
                    type="file"
                    multiple
                    style={{ display: "none" }}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1200px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 13000,
};

const TextArea = styled.textarea`
  width: 90%;
  height: 300px;
  border: 0px;
  font-size: 16px;
  line-height: 24px;
  &:focus-visible {
    outline-color: white;
  }
`;

export default Write;
