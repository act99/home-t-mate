import React from "react";
import { Grid, Button, Text } from "../../elements";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Img from "../common/Img";
import Avatar from "@mui/material/Avatar";
import { history } from "../../redux/store";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/postReducer";
import { Carousel } from "react-responsive-carousel";
import { BiImage } from "react-icons/bi";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton } from "@mui/material";
import useWindowSize from "../../hooks/useWindowSize";
import { useMediaQuery } from "react-responsive";

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

  const handleOnClose = () => {
    setTempFile([]);
    handleClose();
    setPreview([]);
    setFileSelected(false);
  };
  const addPost = () => {
    const postData = new FormData();
    for (let i = 0; i < tempFile[0].length; i++) {
      postData.append("imageUrl", tempFile[0][i]);
    }
    postData.append("content", contents.current.value);
    dispatch(postActions.addPostDB(postData));
    handleOnClose();
  };

  const size = useWindowSize();
  const { width, height } = size;

  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });

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
                isMobile ? (
                  // width 1100px이하면//////////////////////////////////////

                  <>
                    <Carousel
                      showThumbs={false}
                      infiniteLoop={true}
                      width="50vmax"
                    >
                      {preview.map((item, index) => (
                        <Img
                          key={index + item}
                          postImg={item}
                          size="50vmax"
                          border_radius="20px 20px 0px 0px"
                        />
                      ))}
                    </Carousel>
                    <Grid>
                      {/* <Divider /> */}
                      <TextArea
                        ref={contents}
                        placeholder="게시글을 작성해주세요"
                        rows="10"
                        wrap="hard"
                        maxLength={600}
                        style={{
                          marginTop: "16px",
                          marginLeft: "20px",
                          height: `${height * 0.15}px`,
                          fontFamily: "GmarketSansLight",
                        }}
                      ></TextArea>
                      <WriteButton
                        onClick={addPost}
                        width={width}
                        height={height}
                        style={{
                          minWidth: "100px",
                          minHeight: "30px",
                          marginBottom: "5px",
                        }}
                      >
                        스토리 작성완료
                      </WriteButton>
                    </Grid>
                  </>
                ) : (
                  // width 1100px이상이면//////////////////////////////////////
                  <Grid>
                    <Grid
                      is_flex
                      width={width * 0.7 + "px"}
                      height={width * 0.4 + "px"}
                      B_radius="20px"
                    >
                      <Carousel
                        showThumbs={false}
                        infiniteLoop={true}
                        height={width * 0.4 + "px"}
                        width={width * 0.4 + "px"}
                      >
                        {preview.map((item, index) => (
                          <Img
                            key={item + index}
                            postImg={item}
                            size={width * 0.4 + "px"}
                            border="20px"
                          />
                        ))}
                      </Carousel>

                      <Grid
                        width={width * 0.3 + "px"}
                        height={"100%"}
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
                          <Text F_size="20px" F_family="GmarketSansMedium">
                            {_user.nickname ? _user.nickname : ""}
                          </Text>
                        </Grid>
                        <Divider />
                        <TextArea
                          ref={contents}
                          placeholder="게시글을 작성해주세요"
                          rows="10"
                          wrap="hard"
                          maxLength={600}
                          style={{
                            marginTop: "16px",
                            marginLeft: "20px",
                            height: `${width * 0.2}px`,
                            fontFamily: "GmarketSansLight",
                          }}
                        ></TextArea>
                        <WriteButton
                          onClick={addPost}
                          width={width}
                          // height={height}
                          // style={{ minHeight: "30px" }}
                        >
                          스토리 작성완료
                        </WriteButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )
              ) : (
                <Grid>
                  <Grid
                    is_flex
                    flex_direction="column"
                    justify_content="center"
                    align_items="center"
                    height="420px"
                    width="500px"
                    B_radius="20px"
                    BG_c="white"
                  >
                    <Top>
                      <IconButton onClick={handleClose}>
                        <CloseIcon sx={{ height: "100%", fontSize: "40px" }} />
                      </IconButton>
                    </Top>
                    <BiImage size="120" />
                    <Text
                      F_size="20px"
                      F_color="#757575"
                      F_family="GmarketSansMedium"
                    >
                      pc에 있는 사진을 올려주세요
                    </Text>
                    <Text
                      F_size="20px"
                      F_color="#757575"
                      margin_bottom="24px"
                      F_family="GmarketSansMedium"
                    >
                      (최대 4개까지 가능해요.)
                    </Text>
                    <CreateButton
                      onClick={() => {
                        fileInput.current.click();
                      }}
                    >
                      사진 올리기
                    </CreateButton>
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
              <Box sx={stylenoborder}>
                <Grid
                  width="420px"
                  height="220px"
                  is_flex
                  flex_direction="column"
                  justify_content="center"
                  align_items="center"
                >
                  <Text
                    F_size="24px"
                    F_align="center"
                    margin="0px 70px 12px 70px"
                  >
                    홈트메이트를 즐기기 위해 로그인이 필요해요
                  </Text>
                  <Text F_size="16px" margin_bottom="32px">
                    로그인 후 더 재미있게 놀아볼까요?
                  </Text>

                  <Grid is_flex>
                    <Button
                      _onClick={handleOnClose}
                      font_size="20px"
                      font_color="#757575"
                      font_weight="400"
                      B_radius="20px"
                      border="2px solid #757575"
                      width="120px"
                      height="50px"
                      BG_color="white"
                      margin="0px 30px 0px 0px"
                    >
                      취소하기
                    </Button>
                    <Button
                      _onClick={() => {
                        history.push("/login");
                      }}
                      font_size="20px"
                      font_color="#587730"
                      font_weight="400"
                      B_radius="20px"
                      border="2px solid #587730"
                      width="120px"
                      height="50px"
                      BG_color="white"
                    >
                      로그인하기
                    </Button>
                  </Grid>
                </Grid>
              </Box>
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
  outline: "none",
};

const stylenoborder = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 13000,
  padding: 0,
  outline: "none",
};

const TextArea = styled.textarea`
  width: 90%;
  height: 300px;
  border: solid 0px;
  font-size: 16px;
  line-height: 24px;
  resize: none;
  &:focus-visible {
    outline-color: white;
  }
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 200px;
  height: 60px;
  border-radius: 16px;
  border: solid 2px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  /* font-weight: bold; */
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
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

const Top = styled.div`
  position: absolute;
  border-radius: 20px;
  top: 0;
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

export default Write;
