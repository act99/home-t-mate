import React from "react";
import { Grid, Button, Text } from "../elements";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Img from "../components/Img";
import Avatar from "@mui/material/Avatar";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useWindowSize from "../hooks/useWindowSize";
import { Divider } from "@mui/material";

function Edit(props) {
  const dispatch = useDispatch();
  const { id, open, handleClose, photoResponseDto, content } = props;
  const fileInput = React.useRef();
  const contentsRef = React.useRef();
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
        }
      });
    }
  };

  const editPost = () => {
    if (tempFile.length <= 0 || tempFile[0] === undefined) {
      alert("사진을 선택해주세요.");
    } else {
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
    // photoResponseDto.map((item, index) =>
    //   setPreview([...preview, item.postImg])
    // );
    // setPreview([...item])

    return () => {};
  }, [content]);

  const handleOnClose = () => {
    setPreview([]);
    setContents(content);
    tempData = [];
    handleClose();
  };

  const previewImage = (v) => {
    if (preview.length === 0) {
      return v.postImg;
    } else {
      return preview;
    }
  };

  const size = useWindowSize();
  const { width, height } = size;
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
              <Grid
                is_flex
                width={width * 0.7 + "px"}
                height={width * 0.4 + "px"}
                B_radius="20px"
              >
                <input
                  ref={fileInput}
                  onChange={selectFile}
                  type="file"
                  multiple
                  style={{ display: "none" }}
                />

                {preview.length <= 0 ? (
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    height={width * 0.4 + "px"}
                    width={width * 0.4 + "px"}
                  >
                    {photoResponseDto &&
                      photoResponseDto.map((v, i) => (
                        <Img
                          key={i}
                          size={width * 0.4 + "px"}
                          border="20px"
                          _onClick={() => {
                            fileInput.current.click();
                          }}
                          postImg={previewImage(v)}
                        />
                      ))}
                  </Carousel>
                ) : (
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    height={width * 0.4 + "px"}
                    width={width * 0.4 + "px"}
                  >
                    {preview.map((item, index) => (
                      <Img
                        cursor="pointer"
                        key={index}
                        postImg={item}
                        size={width * 0.4 + "px"}
                        border="20px"
                      />
                    ))}
                  </Carousel>
                )}

                <Grid
                  width={width * 0.3 + "px"}
                  position="absolute"
                  top="0px"
                  right="0px"
                >
                  <Grid is_flex justify_content="flex-start">
                    <Avatar
                      alt="Remy Sharp"
                      src={_user.profileImg ? _user.profileImg : ""}
                      sx={{ margin: "10px 20px", width: 50, height: 50 }}
                    />
                    <Text F_size="20px">
                      {_user.nickname ? _user.nickname : ""}
                    </Text>
                  </Grid>
                  <Divider />
                  <TextArea
                    value={contents}
                    ref={contentsRef}
                    rows="10"
                    wrap="hard"
                    maxLength={600}
                    style={{
                      marginTop: "16px",
                      marginLeft: "20px",
                      height: `${width * 0.2}px`,
                    }}
                    onChange={(e) => setContents(e.target.value)}
                  ></TextArea>
                  <WriteButton onClick={editPost} width={width}>
                    수정완료
                  </WriteButton>
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

const WriteButton = styled.button`
  display: block;
  width: ${(props) => props.width * 0.1 + "px"};
  height: ${(props) => props.width * 0.03 + "px"};
  margin-left: auto;
  margin-top: ${(props) => props.width * 0.08 + "px"};
  margin-right: ${(props) => props.width * 0.02 + "px"};
  border-radius: 20px;
  border: solid 2px green;
  background-color: white;
  color: green;
  font-weight: bold;
  font-size: ${(props) => props.width * 0.01 + "px"};
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

export default Edit;
