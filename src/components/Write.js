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
import { Carousel } from "react-responsive-carousel";
import Imageupload from "../assets/imageupload.png";

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
      formData.append("file", files[i]);
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
    const postData = new FormData();
    for (let i = 0; i < tempFile[0].length; i++) {
      postData.append("imageUrl", tempFile[0][i]);
      console.log(tempFile[0][i]);
      console.log(postData);
    }
    postData.append("content", contents.current.value);

    dispatch(postActions.addPostDB(postData));
  };

  const handleOnClose = () => {
    handleClose();
    setPreview([]);
    setFileSelected(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {_user.is_login ? (
              fileSelected ? (
                <Grid>

                  <Grid
                    is_flex
                    flex_direction="row"
                    justify_content="center"
                    align_items="center"
                    width="1345px"
                    height="800px"
                    B_bottom_left_radius="15px"
                    B_bottom_right_radius="15px"
                    BG_c="white"
                  >
                    <Carousel
                      showThumbs={false}
                      infiniteLoop={true}
                      height="800px"
                      width="800px"
                    >
                      {preview.map((item, index) => (
                        <Img
                          postImg={item}
                          size="800px"
                        />
                      ))}
                    </Carousel>
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
                    is_flex
                    flex_direction="column"
                    justify_content="center"
                    align_items="center"
                    height="720px"
                    width="1200px"
                    B_radius="20px"
                    BG_c="white"
                  >
                    <ImageIcon style={{width:"103px", height:"103px"}} />
                    
                    <Text F_size="20px" F_color="#757575">
                      pc에 있는 사진을 올려주세요
                    </Text>
                    <Text F_size="20px" F_color="#757575" margin_bottom="24px" >
                      (최대 4개까지 가능해요).
                    </Text>

                    <Button
                      _onClick={() => {
                        fileInput.current.click();
                      }}
                      font_size="20px"
                      font_color="#587730"
                      font_weight="700"
                      B_radius="20px"
                      border="2px solid #587730"
                      width="204px"
                      height="60px"
                      BG_color="white"

                    >
                      사진 올리기
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
              )
            ) : (
              <Grid width="420px" height="220px">
                <Text F_size="24px">
                  홈트메이트를 즐기기 위해 로그인이 필요해요
                </Text>
                <Text F_size="16px">로그인 후 더 재미있게 놀아볼까요?</Text>
                <Button>취소하기</Button>
                <Button>로그인하기</Button>
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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 13000,
  padding: 0,
  borderRadius: "20px",
  outline:"none",
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
