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

  const _user = useSelector((state) => state.userReducer);
  console.log('_user확인용', _user);

  let tempData = [];
  const formData = new FormData();

  const selectFile = (e) => {
    console.log('e',e);
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
          console.log("formdata", formData);
          // console.log("fileinput", fileInput); //current: null

          // console.log("filescurrent = fileInput.current",filescurrent);// <input type="file" multiple="" style="display: none;"></input>

          // console.log("files = fileInput.current.files;", files);
          /*FileList {0: File, 1: File, length: 2}
          0: File {name: 'maxresdefault.jpg', lastModified: 1643269878752, lastModifiedDate: Thu Jan 27 2022 16:51:18 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 85294, …}
          1: File {name: '7ae844bf2c880c0d6bc4818020f242fd.jpg', lastModified: 1642166898501, lastModifiedDate: Fri Jan 14 2022 22:28:18 GMT+0900 (한국 표준시), webkitRelativePath: '', size: 40941, …}
          length: 2
          [[Prototype]]: FileList*/

          
        }
      });
    }
  };

  const addPost = () => {
    const postData = new FormData();
    for (let i = 0; i < tempFile[0].length; i++) {
      postData.append("imgUrl", tempFile[0][i]);
      console.log(tempFile[0][i]);
    }
    postData.append("postContents", contents.current.value);
    // console.log('contents',contents);
    /*
    {current: textarea.css-u3azhh}
      current: textarea.css-u3azhh
      value: "안녕하세요라고 입력했을경우 안녕하세요라고 value값에 뜸"
      __reactEvents$46et5833op: Set(1) {'invalid__bubble'}
      __reactFiber$46et5833op: FiberNode {tag: 5, key: null, elementType: 'textarea', type: 'textarea', stateNode: textarea.css-u3azhh, …}
      __reactProps$46et5833op: {rows: '10', wrap: 'hard', className: 'css-u3azhh'}
      _valueTracker: {getValue: ƒ, setValue: ƒ, stopTracking: ƒ}
      _wrapperState: {initialValue: ''}
      */
    // postData.append("postImgCount", preview.length);
    // postData.append("postTag", []);

    dispatch(postActions.addPostDB(postData));
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
                        src={_user.user.userImg ? _user.user.userImg : ""}
                        sx={{ margin: "20px", width: 50, height: 50 }}
                      />
                      <Text>{_user.user.nickname ? _user.user.nickname : ""}</Text>
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
