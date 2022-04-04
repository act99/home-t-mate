import React from "react";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../../redux/modules/roomReducer";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { imageApis } from "../../shared/formApi";
import Logo from "../../assets/imageupload.png";
import useWindowSize from "../../hooks/useWindowSize";
import CreateRoomImage from "../../elements/CreateRoomImage";
const CreateRoomModal = (props) => {
  const size = useWindowSize();
  const { width, height } = size;

  const { createRoomOpen, setCreateRoomOpen } = props;
  const dispatch = useDispatch();

  // ** 이미지 업로드에 필요한 Func
  const [preview, setPreview] = React.useState(null);
  const fileInputRef = React.useRef();
  const selectFile = () => {
    const reader = new FileReader();
    const previewFile = fileInputRef.current.files[0];
    if (previewFile.name.includes("jpg") || previewFile.name.includes("png")) {
      reader.readAsDataURL(previewFile);
      reader.onloadend = () => {
        // console.log(reader.result);
        setPreview(reader.result);
      };
    } else {
      alert("사진(jpg 또는 png)을 넣어주세요");
    }
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
          height={width * 1.4}
          onSubmit={handleSubmit}
        >
          <Top>
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{ height: "100%", fontSize: `${width * 0.1}px` }}
              />
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
          <MInputWrap width={width}>
            <h3>방 제목 : </h3>
            <InputStlye
              required
              maxLength={28}
              name="title"
              placeholder="방 이름"
              style={{
                marginLeft: 0,
                marginTop: 0,
                width: `${width * 0.55}px`,
                height: `${width * 0.07}px`,
              }}
            />
          </MInputWrap>
          <MInputWrap width={width}>
            <h3>비밀번호 : </h3>
            <MYestButton
              width={width}
              onClick={() => setPasswordOn(true)}
              type="button"
              password={passwordOn}
            >
              Yes
            </MYestButton>
            <MNoButton
              width={width}
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
                marginLeft: `${width * 0.03}px`,
                marginTop: `${width * 0.03}px`,
                width: `${width * 0.69}px`,
                height: `${width * 0.08}px`,
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
                backgroundColor: "#f2f2f2",
                marginLeft: `${width * 0.03}px`,
                marginTop: `${width * 0.03}px`,
                width: `${width * 0.69}px`,
                height: `${width * 0.08}px`,
              }}
            />
          )}
          <MInputWrap width={width}>
            <h3>방에 대해 설명해주세요 </h3>
          </MInputWrap>
          <TextAreaStyle
            required
            name="content"
            placeholder="하고 싶은 말을 적어주세요. (최대 100자)"
            maxLength={100}
            style={{
              marginLeft: `${width * 0.03}px`,
              marginTop: `${width * 0.01}px`,
              width: `${width * 0.69}px`,
              height: `${width * 0.08}px`,
              fontSize: `${width * 0.02}px`,
              fontFamily: "GmarketSansMedium",
            }}
          />
          <MCreateButton type="submit" width={width}>
            지금 방 만들기
          </MCreateButton>
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
      <WrapCreateBox
        width={width * 0.3}
        height={width * 0.45}
        onSubmit={handleSubmit}
      >
        <Top>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ height: "100%", fontSize: `${width * 0.05}px` }} />
          </IconButton>
        </Top>
        <MImageWrap>
          <MImageInputStyle
            width={width * 0.15}
            height={width * 0.1125}
            type="file"
            ref={fileInputRef}
            onChange={selectFile}
          />
          <CreateRoomImage
            width={width * 0.15}
            height={width * 0.1125}
            src={preview ? preview : Logo}
          />
        </MImageWrap>
        <MInputWrap width={width * 0.3}>
          <h3>방 제목 : </h3>
          <InputStlye
            required
            maxLength={28}
            name="title"
            placeholder="방 이름"
            style={{
              marginLeft: 0,
              marginTop: 0,
              width: `${width * 0.22}px`,
              height: `${width * 0.02}px`,
            }}
          />
        </MInputWrap>
        <MInputWrap width={width * 0.3}>
          <h3>비밀번호 : </h3>
          <MYestButton
            width={width * 0.4}
            onClick={() => setPasswordOn(true)}
            type="button"
            password={passwordOn}
          >
            Yes
          </MYestButton>
          <MNoButton
            width={width * 0.4}
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
              marginLeft: `${width * 0.01}px`,
              marginTop: `${width * 0.01}px`,
              width: `${width * 0.26}px`,
              height: `${width * 0.02}px`,
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
              backgroundColor: "#f2f2f2",
              marginLeft: `${width * 0.01}px`,
              marginTop: `${width * 0.01}px`,
              width: `${width * 0.26}px`,
              height: `${width * 0.02}px`,
            }}
          />
        )}
        <MInputWrap width={width * 0.3}>
          <h3>방에 대해 설명해주세요 </h3>
        </MInputWrap>
        <TextAreaStyle
          required
          name="content"
          placeholder="하고 싶은 말을 적어주세요. (최대 100자)"
          maxLength={100}
          style={{
            marginLeft: `${width * 0.01}px`,
            marginTop: `${width * 0.001}px`,
            width: `${width * 0.26}px`,
            height: `${width * 0.08}px`,
            fontSize: `${width * 0.008}px`,
            fontFamily: "GmarketSansMedium",
          }}
        />
        <MCreateButton type="submit" width={width * 0.3}>
          지금 방 만들기
        </MCreateButton>
      </WrapCreateBox>
    </Modal>
  );
};

const Top = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
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
  padding-top: 12px;
`;

const MCreateButton = styled.button`
  display: block;
  margin: auto;
  width: ${(props) => props.width * 0.5}px;
  height: ${(props) => props.width * 0.1}px;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: ${(props) => props.width * 0.03}px;
  color: green;
  font-weight: bold;
  font-family: "GmarketSansMedium";
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
  align-items: center;
  margin-top: ${(props) => props.width * 0.02}px;
  margin-left: ${(props) => props.width * 0.03}px;
  h3 {
    font-size: ${(props) => props.width * 0.03}px;
    margin-right: ${(props) => props.width * 0.03}px;
    font-family: "GmarketSansLight";
  }
`;

const MYestButton = styled.button`
  margin-right: ${(props) => props.width * 0.03}px;
  margin-left: ${(props) => props.width * 0.03}px;
  width: ${(props) => props.width * 0.2}px;
  height: ${(props) => props.width * 0.08}px;
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
  margin-right: ${(props) => props.width * 0.03}px;
  margin-left: ${(props) => props.width * 0.03}px;
  width: ${(props) => props.width * 0.2}px;
  height: ${(props) => props.width * 0.08}px;
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
