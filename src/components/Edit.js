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
            <Grid>
              <Grid is_flex width="1345px" height="800px" B_radius="20px">
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
                    height="800px"
                    width="800px"
                  >
                    {photoResponseDto &&
                      photoResponseDto.map((v, i) => (
                        <Img
                          key={i}
                          size="800px"
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
                    height="800px"
                    width="800px"
                  >
                    {preview.map((item, index) => (
                      <Img
                        key={index}
                        postImg={item}
                        size="800px"
                        border="20px"
                      />
                    ))}
                  </Carousel>
                )}

                <Grid width="545px" position="absolute" top="0px" right="0px">
                  <Grid is_flex justify_content="flex-start">
                    <Avatar
                      alt="Remy Sharp"
                      src={_user.userImg ? _user.userImg : ""}
                      sx={{ margin: "20px", width: 50, height: 50 }}
                    />
                    <Text F_size="20px">
                      {_user.nickname ? _user.nickname : ""}
                    </Text>
                  </Grid>

                  <TextArea
                    value={contents}
                    ref={contentsRef}
                    rows="10"
                    wrap="hard"
                    style={{ marginLeft: "20px", height: "500px" }}
                    onChange={(e) => setContents(e.target.value)}
                  ></TextArea>

                  <Button
                    _onClick={editPost}
                    font_size="20px"
                    font_color="#587730"
                    font_weight="700"
                    B_radius="20px"
                    border="2px solid #587730"
                    width="197px"
                    height="52px"
                    BG_color="white"
                    position="absolute"
                    bottom="-140px"
                    right="40px"
                  >
                    수정완료
                  </Button>
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
  borderRadius: "20px",
  outline: "none",
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
