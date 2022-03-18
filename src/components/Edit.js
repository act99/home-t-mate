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
import { filterEventStoreDefs } from "@fullcalendar/react";
import { imageApis } from "../shared/formApi";

function Edit(props) {
  const dispatch = useDispatch();

  const { open, handleClose } = props;

  const fileInput = React.useRef();
  const contents = React.useRef();

  const [fileSelected, setFileSelected] = React.useState(false);
  const [preview, setPreview] = React.useState([]);
  const [tempFile, setTempFile] = React.useState([]);

  const _user = useSelector((state) => state.userReducer.user);

  let tempData = [];
  const formData = [];

  const selectFile = (e) => {
    console.log("e", e);
    const files = fileInput.current.files;

    setTempFile([...tempFile, files]);

    for (let i = 0; i < files.length; i++) {
      formData.push("imageUrl", files[i]);
      console.log("formdate확인용", files[i]);
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
  const editPost = () => {
    const changeImage = new FormData();
    for (let i = 0; i < tempFile[0].length; i++) {
      changeImage.append("file", tempFile[0][i]);
    }
    const changeContents = contents.current.value;
    // imageApis
    //   .postImage(changeImage)
    //   .then((res) => {
    //     dispatch(postActions.editPostDB(id, changeContents, res.data.file));
    //   })
    //   .catch((error) => console.log(error));
  };

  console.log("fileinput.current", fileInput.current);

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
            <Grid>
              <Grid
                B_bottom="1px solid #dbdbdb"
                is_flex
                // min_width="648px"
                // max_width="min(calc(100vw - 72px),1151px)"
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
                  <Text vertical_align="middle">게시물 수정하기</Text>
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
                    _onClick={editPost}
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
                <input
                  ref={fileInput}
                  onChange={selectFile}
                  type="file"
                  multiple
                  //   style={{ display: "none" }}
                />
                <Img
                  _onClick={() => {
                    fileInput.current.click();
                  }}
                  postImg={fileSelected ? preview : props.postImg}
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
                  <TextArea
                    defaultValue={props.content}
                    ref={contents}
                    rows="10"
                    wrap="hard"
                  ></TextArea>
                </Grid>
              </Grid>
            </Grid>
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
  border: "0px solid #000",
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

export default Edit;
