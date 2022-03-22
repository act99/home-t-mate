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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Edit(props) {
  const dispatch = useDispatch();
  console.log(props);
  const { id, open, handleClose, photoResponseDto, content } = props;
  const fileInput = React.useRef();
  const contentsRef = React.useRef();
  const [fileSelected, setFileSelected] = React.useState(false);
  const [preview, setPreview] = React.useState([]);
  const [tempFile, setTempFile] = React.useState([]);
  const [contents, setContents] = React.useState("");
  const _user = useSelector((state) => state.userReducer.user);

  let tempData = [];
  const formData = new FormData();

  const selectFile = (e) => {
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
        }
      });
    }
  };

  const editPost = () => {
    console.log(tempFile);
    if (tempFile.length <= 0 || tempFile[0] === undefined) {
      alert("사진을 선택해주세요.");
    } else {
      console.log("hi");
      // const imgData = new FormData();
      const contentData = new FormData();
      for (let i = 0; i < tempFile[0].length; i++) {
        contentData.append("image", tempFile[0][i]);
      }
      contentData.append("content", contents);
      dispatch(postActions.editPostDB(id, contentData));
      setContents("");
    }
  };
  React.useEffect(() => {
    setContents(content);

    return () => {};
  }, [content]);

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
                  <button
                    style={{
                      margin: "7px 0 0 0",
                      border: "solid 0px",
                      backgroundColor: "white",
                      width: "30px",
                      cursor: "pointer",
                    }}
                    onClick={editPost}
                  >
                    {" "}
                    <CheckIcon />
                  </button>
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
                  style={{ display: "none" }}
                />
                {tempFile.length <= 0 ? (
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    height="648px"
                    width="648px"
                  >
                    {photoResponseDto &&
                      photoResponseDto.map((v, i) => (
                        <Img
                          key={i}
                          size="648px"
                          border="20px"
                          _onClick={() => {
                            fileInput.current.click();
                          }}
                          fileSelected={fileSelected}
                          postImg={fileSelected ? preview : v.postImg}
                        />
                      ))}
                  </Carousel>
                ) : (
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    height="648px"
                    width="648px"
                  >
                    {preview.map((item, index) => (
                      <Img
                        key={index}
                        postImg={item}
                        size="max(348px,min(calc(100vmin - 219px),min(calc(100vw - 372px),855px)))"
                      />
                    ))}
                  </Carousel>
                )}

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
                    value={contents}
                    ref={contentsRef}
                    rows="10"
                    wrap="hard"
                    onChange={(e) => setContents(e.target.value)}
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
