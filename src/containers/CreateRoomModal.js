import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import RoomImage from "../elements/RoomImage";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { imageApis } from "../shared/formApi";
import Logo from "../assets/imageupload.png";
import useWindowSize from "../hooks/useWindowSize";
import CreateRoomImage from "../elements/CreateRoomImage";
const CreateRoomModal = (props) => {
  const size = useWindowSize();
  const { width, height } = size;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width * 0.3,
    height: width * 0.45,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
  };

  const Mstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width * 0.6,
    height: width * 1,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
  };

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
    console.log(file);
    if (file === undefined) {
      roomCreators.createRoomDB(
        data.get("title"),
        password,
        data.get("content"),
        undefined
      );
    }
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
            password,
            data.get("content"),
            res.data.file[0]
          )
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setPassword("");
    handleClose();
  };
  const handleClose = () => {
    setPreview(null);
    setPassword("");
    setCreateRoomOpen(false);
  };
  // ** 패스워드 설정
  const [passwordOn, setPasswordOn] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const handlePassword = () => {
    if (passwordOn === true) {
      setPasswordOn(false);
      setPassword("");
    } else {
      setPasswordOn(true);
    }
  };

  if (width < height) {
    return (
      <Modal
        open={createRoomOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <WrapCreateBox
          width={width * 0.8}
          height={width * 1.2}
          onSubmit={handleSubmit}
        >
          <Top>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ height: "100%", fontSize: "40px" }} />
            </IconButton>
          </Top>
          <MImageWrap>
            <MImageInputStyle
              width={width * 0.4}
              height={width * 0.3}
              type="file"
              ref={fileInputRef}
              onChange={selectFile}
            />
            <CreateRoomImage
              width={width * 0.4}
              height={width * 0.3}
              src={preview ? preview : Logo}
            />
          </MImageWrap>
          <MInputWrap>
            <h3>방 제목 : </h3>
            <InputStlye
              required
              maxLength={28}
              name="title"
              placeholder="방 이름"
              style={{ marginLeft: 0, marginTop: 0, width: "282px" }}
            />
          </MInputWrap>
          <MInputWrap>
            <h3>비밀번호 : </h3>
            <MYestButton
              onClick={() => setPasswordOn(true)}
              type="button"
              password={passwordOn}
            >
              Yes
            </MYestButton>
            <MNoButton
              onClick={handlePassword}
              type="button"
              password={passwordOn}
            >
              No
            </MNoButton>
          </MInputWrap>
          {passwordOn === true ? (
            <InputStlye
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              maxLength={12}
              style={{
                marginLeft: "12px",
                marginTop: "24px",
                width: "364px",
              }}
            />
          ) : (
            <InputStlye
              required
              disabled
              value={password}
              type="password"
              name="password"
              placeholder="비밀번호 X"
              maxLength={12}
              style={{
                marginLeft: "12px",
                marginTop: "24px",
                backgroundColor: "#e2e2e2",
                width: "364px",
              }}
            />
          )}
          <MInputWrap>
            <h3>방에 대해 설명해주세요 </h3>
          </MInputWrap>
          <TextAreaStyle
            required
            name="content"
            placeholder="하고 싶은 말을 적어주세요. (최대 100자)"
            maxLength={100}
            style={{
              width: "364px",
              height: "84px",
              marginLeft: "12px",
              marginTop: 0,
              paddingTop: "8px",
            }}
          />
          <MCreateButton type="submit">지금 방 만들기</MCreateButton>
        </WrapCreateBox>
      </Modal>
    );
  }
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
            <CloseIcon sx={{ height: "100%", fontSize: "40px" }} />
          </IconButton>
        </Top>
        <ContentWrap>
          <Box
            sx={{ width: "100%", maxWidth: 320, maxHeight: 240, mx: "auto" }}
          >
            <FileInput type="file" ref={fileInputRef} onChange={selectFile} />
            <RoomImage src={preview ? preview : Logo} />
          </Box>
          <TitleWrap style={{ marginTop: "56px" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: 16,
                my: 0,
                mr: 2,
                fontFamily: "SuncheonR",
              }}
            >
              방 제목 :
            </Typography>
            <InputStlye
              required
              maxLength={28}
              name="title"
              placeholder="방 이름"
              style={{ marginLeft: 0, marginTop: 0, width: "382px" }}
            />
          </TitleWrap>
          <TitleWrap>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: "bold", fontSize: 16, fontFamily: "SuncheonR" }}
            >
              비밀번호 설정 :
            </Typography>
            <YestButton
              onClick={() => setPasswordOn(true)}
              type="button"
              password={passwordOn}
            >
              Yes
            </YestButton>
            <NoButton
              onClick={handlePassword}
              type="button"
              password={passwordOn}
            >
              No
            </NoButton>
          </TitleWrap>
          {passwordOn === true ? (
            <InputStlye
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              maxLength={12}
              style={{ marginLeft: 0, marginTop: "24px" }}
            />
          ) : (
            <InputStlye
              required
              disabled
              value={password}
              type="password"
              name="password"
              placeholder="비밀번호 X"
              maxLength={12}
              style={{
                marginLeft: 0,
                marginTop: "24px",
                backgroundColor: "#e2e2e2",
              }}
            />
          )}

          <TitleWrap
            style={{ justifyContent: "space-between", width: "456px" }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: 16,
                mb: 2,
                fontFamily: "SuncheonR",
              }}
            >
              방에 대해 설명해주세요.{" "}
            </Typography>
          </TitleWrap>
          <TextAreaStyle
            required
            name="content"
            placeholder="하고 싶은 말을 적어주세요. (최대 100자)"
            maxLength={100}
            style={{
              marginLeft: 0,
              marginTop: 0,
              paddingTop: "8px",
            }}
          />

          <CreateButton type="submit">지금 방 만들기</CreateButton>
        </ContentWrap>
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
  /* height: 100%; */
  height: 100%;
  min-height: 240px;
  max-width: 320px;
  /* min-height: 150px;
  max-height: 150px;
  max-width: 200px; */
  height: auto;
  cursor: pointer;
`;

const ContentWrap = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin: auto;
`;

const Top = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin-top: 24px;
  /* margin-bottom: 24px; */
`;

const InputStlye = styled.input`
  width: 464px;
  height: 44px;
  border-radius: 4px;
  border: solid 1px #757575;
  margin-left: 8px;
  padding-left: 12px;
`;

const TextAreaStyle = styled.textarea`
  width: 464px;
  height: 88px;
  border-radius: 4px;
  border: solid 1px #757575;
  margin-left: 8px;
  padding-left: 12px;
  resize: none;
  margin-bottom: 16px;
`;

const NoButton = styled.button`
  width: 164px;
  height: 48px;
  border-radius: 10px;
  border: solid 0px green;
  background-color: ${(props) =>
    props.password === false ? "green" : "#8f8f8f"};
  font-size: 16px;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
  }
`;

const YestButton = styled.button`
  margin-right: 20px;
  margin-left: 20px;
  width: 164px;
  height: 48px;
  border-radius: 10px;
  border: solid 0px green;
  background-color: ${(props) =>
    props.password === true ? "green" : "#8f8f8f"};
  font-size: 16px;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
  }
`;

const CreateButton = styled.button`
  display: block;
  margin: auto;
  margin-top: 24px;
  width: 484px;
  height: 50px;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const MCreateButton = styled.button`
  display: block;
  margin: auto;
  width: 320px;
  height: 40px;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: 12px;
  color: green;
  font-weight: bold;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const WrapCreateBox = styled.form`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MImageWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MImageInputStyle = styled.input`
  position: absolute;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 4px;
  border: solid 1px #757575;
  margin-left: 8px;
  padding-left: 12px;
  cursor: pointer;
  opacity: 0;
`;

const MInputWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 16px;
  margin-left: 16px;
  h3 {
    font-size: 16px;
    margin-right: 16px;
    font-family: "GmarketSansLight";
  }
`;

const MYestButton = styled.button`
  margin-right: 20px;
  margin-left: 20px;
  width: 96px;
  height: 48px;
  border-radius: 10px;
  border: solid 0px green;
  background-color: ${(props) =>
    props.password === true ? "green" : "#8f8f8f"};
  font-size: 16px;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
  }
`;

const MNoButton = styled.button`
  width: 96px;
  height: 48px;
  border-radius: 10px;
  border: solid 0px green;
  background-color: ${(props) =>
    props.password === false ? "green" : "#8f8f8f"};
  font-size: 16px;
  color: white;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
  }
`;

export default CreateRoomModal;
