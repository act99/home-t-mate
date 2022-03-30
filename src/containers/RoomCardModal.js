import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { apis } from "../shared/api";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as selectedRoomActions } from "../redux/modules/selectedRoomReducer";
import FullErrorContainer from "./FullErrorContainer";
import useWindowSize from "../hooks/useWindowSize";

const RoomCardModal = (props) => {
  const size = useWindowSize();
  const { width, height } = size;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 720,
    bgcolor: "background.paper",
    border: "solid 0px",
    boxShadow: 24,
  };
  const mStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width * 0.8,
    height: width * 1.4,
    bgcolor: "background.paper",
    border: "solid 0px",
    boxShadow: 24,
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const is_login = user.is_login;
  const { clickCard, setClickCard, data } = props;
  const {
    roomId,
    roomName,
    content,
    roomImg,
    passCheck,
    userCount,
    profileImg,
    nickname,
  } = data;
  const history = useHistory();
  const passwordRef = React.useRef();
  const [password, setPassword] = React.useState("");
  const [errorGenerate, setErrorGenerate] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleEnterRoom = (e) => {
    e.preventDefault();
    if (is_login === false) {
      alert("로그인 후 입장 가능합니다.");
      history.replace("/login");
    } else {
      apis
        .enterRoom(roomId, password)
        .then((res) => {
          history.push({
            pathname: `/checkvideo`,
            state: {
              roomId: roomId,
              roomName: roomName,
              password: password,
              host: nickname,
              hostImg: profileImg,
            },
          });
          dispatch(
            selectedRoomActions.setRoom({ ...data, password: password })
          );
        })
        .catch((error) => {
          setErrorGenerate(true);
          setErrorMessage(error.response.data.message);
          // alert(error.response.data.message);
          console.log(error.response.data);
        });
    }
  };
  const modalOff = () => {
    setClickCard(false);
    setErrorGenerate(false);
  };

  React.useEffect(() => {
    return () => {};
  }, [errorGenerate]);

  if (width < height) {
    return (
      <Modal
        open={clickCard}
        onClose={() => modalOff()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {errorGenerate ? (
          <div>
            <FullErrorContainer
              width={width}
              mobile={true}
              modalOff={modalOff}
              errorMessage={errorMessage}
            />
          </div>
        ) : (
          <Box sx={mStyle}>
            <MTop height={width * 0.1}>
              <IconButton onClick={() => setClickCard(false)}>
                <CloseIcon sx={{ fontSize: `${width * 0.06}px`, mr: 1 }} />
              </IconButton>
            </MTop>
            <MTitleContainer height={width * 0.3}>
              <MTitleImage img={roomImg} height={width * 0.3}></MTitleImage>
              <MTitleImageText width={width * 0.05}>{roomName}</MTitleImageText>
              <MHostProfile width={width}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    mt: 0.3,
                    mr: 1,
                    fontFamily: "SuncheonR",
                  }}
                  alt="Remy Sharp"
                  src={profileImg}
                />
                by. {nickname}
              </MHostProfile>
            </MTitleContainer>

            <MMemberNum>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontSize: `${width * 0.04}px`,
                  fontFamily: "GmarketSansMedium",
                }}
              >
                현재 멤버 수
              </Typography>
              <PersonOutlineIcon
                sx={{ ml: 1 }}
                style={{
                  fontSize: `${width * 0.06}px`,
                  marginBottom: `${width * 0.01}px`,
                }}
              />
              <Typography
                id="modal-modal-description"
                sx={{
                  fontSize: `${width * 0.03}px`,
                  fontFamily: "GmarketSansMedium",
                }}
              >
                ({userCount === null ? 0 : userCount} / 5)
              </Typography>
            </MMemberNum>
            <MRoomInfo>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  fontSize: `${width * 0.04}px`,
                  fontFamily: "GmarketSansMedium",
                }}
              >
                방 정보
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ fontSize: `${width * 0.03}px`, fontFamily: "SuncheonR" }}
              >
                {content}
              </Typography>
            </MRoomInfo>
            <form onSubmit={handleEnterRoom}>
              {passCheck === false ? null : (
                <MPasswordWrap>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: `${width * 0.04}px`,
                      fontFamily: "GmarketSansMedium",
                      mb: 1,
                    }}
                  >
                    방 비밀번호
                  </Typography>
                  <MPasswordInput
                    placeholder="비밀번호를 입력 해 주세요 :)"
                    type="password"
                    ref={passwordRef}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    width={width}
                  />
                </MPasswordWrap>
              )}
              {passCheck === false ? (
                <Alert
                  severity="warning"
                  sx={{
                    height: width * 0.4,
                    fontSize: width * 0.03,
                  }}
                >
                  {/* <AlertTitle sx={{ fontSize: `${width * 0.03}px` }}> */}
                  경고
                  <br />
                  <br />
                  {/* </AlertTitle> */}
                  아래의 운영정책을 준수 해 주시기 바랍니다.
                  <br />
                  <br />
                  <strong>음란 행위, 성 매매 홍보 금지</strong>
                  <br />
                  <strong>도박행위 및, 도박 사이트 홍보 금지</strong>
                  <br />
                  <strong>미풍양속 행위 및 청소년 유해 행위 금지</strong>
                  <br />
                  <strong>욕설 및 명예훼손 금지</strong>
                </Alert>
              ) : (
                <Alert
                  severity="warning"
                  sx={{
                    height: width * 0.3,
                    fontSize: width * 0.03,
                  }}
                >
                  {/* <AlertTitle sx={{ fontSize: `${width * 0.03}px` }}> */}
                  경고
                  <br />
                  {/* </AlertTitle> */}
                  아래의 운영정책을 준수 해 주시기 바랍니다.
                  <br />
                  <strong>음란 행위, 성 매매 홍보 금지</strong>
                  <br />
                  <strong>도박행위 및, 도박 사이트 홍보 금지</strong>
                  <br />
                  <strong>미풍양속 행위 및 청소년 유해 행위 금지</strong>
                  <br />
                  <strong>욕설 및 명예훼손 금지</strong>
                </Alert>
              )}

              <MEnterButton type="submit" width={width}>
                이 방에 참여하기
              </MEnterButton>
            </form>
          </Box>
        )}
      </Modal>
    );
  }

  return (
    <Modal
      open={clickCard}
      onClose={() => modalOff()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {errorGenerate ? (
        <div>
          <FullErrorContainer
            modalOff={modalOff}
            errorMessage={errorMessage}
            width={width}
            mobile={false}
          />
        </div>
      ) : (
        <Box sx={style}>
          <Top>
            <IconButton onClick={() => setClickCard(false)}>
              <CloseIcon sx={{ height: "100%", fontSize: "40px", mr: 1 }} />
            </IconButton>
          </Top>
          <TitleContainer>
            <TitleImage img={roomImg}></TitleImage>{" "}
            <TitleImageText>{roomName}</TitleImageText>
            <HostProfile>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  mt: 0.3,
                  mr: 1,
                  fontFamily: "SuncheonR",
                }}
                alt="Remy Sharp"
                src={profileImg}
              />
              by. {nickname}
            </HostProfile>
          </TitleContainer>

          <MemberNum>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "SuncheonR",
              }}
            >
              현재 멤버 수
            </Typography>
            <PersonOutlineIcon sx={{ ml: 1 }} />

            <Typography
              id="modal-modal-description"
              sx={{
                fontSize: "12px",
                fontFamily: "SuncheonR",
                fontWeight: "bold",
              }}
            >
              ({userCount === null ? 0 : userCount} / 5)
            </Typography>
          </MemberNum>
          <RoomInfo>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                fontFamily: "SuncheonR",
              }}
            >
              방 정보
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ fontSize: "12px", fontFamily: "SuncheonR" }}
            >
              {content}
            </Typography>
          </RoomInfo>
          <form onSubmit={handleEnterRoom}>
            {passCheck === false ? null : (
              <PasswordWrap>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    fontFamily: "SuncheonR",
                    mb: 1,
                  }}
                >
                  방 비밀번호
                </Typography>
                <PasswordInput
                  placeholder="비밀번호를 입력 해 주세요 :)"
                  type="password"
                  ref={passwordRef}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </PasswordWrap>
            )}
            {passCheck === false ? (
              <Alert severity="warning" sx={{ height: 260, mt: 5 }}>
                <AlertTitle sx={{ fontFamily: "SuncheonR" }}>경고</AlertTitle>
                아래의 운영정책을 준수 해 주시기 바랍니다.
                <br />
                <br />
                <strong>음란 행위, 성 매매 홍보 금지</strong>
                <br />
                <strong>도박행위 및, 도박 사이트 홍보 금지</strong>
                <br />
                <strong>미풍양속 행위 및 청소년 유해 행위 금지</strong>
                <br />
                <strong>장애인 차별 및 비하</strong>
                <br />
                <strong>지역/종교/인종/성 차별 및 비하</strong>
                <br />
                <strong>타인 비하 및 불특정 다수 비하</strong>
                <br />
                <strong>폭력 영상물 게시</strong>
                <br />
                <br />
                <strong>자체기준 위반 : 1개의 계정으로 동시 접속</strong>
              </Alert>
            ) : (
              <Alert severity="warning" sx={{ height: 172, mt: 5 }}>
                <AlertTitle>경고</AlertTitle>
                아래의 운영정책을 준수 해 주시기 바랍니다.
                <br />
                <br />
                <strong>음란 행위, 성 매매 홍보 금지</strong>
                <br />
                <strong>도박행위 및, 도박 사이트 홍보 금지</strong>
                <br />
                <strong>미풍양속 행위 및 청소년 유해 행위 금지</strong>
                <br />
                <strong>욕설 및 명예훼손 금지</strong>
              </Alert>
            )}

            <EnterButton type="submit">이 방에 참여하기</EnterButton>
          </form>
        </Box>
      )}
    </Modal>
  );
};

const MTitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: aliceblue;
`;

const MTitleImage = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: white;
  opacity: 0.2;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.img}");
`;

const MTitleImageText = styled.h3`
  top: 0px;
  margin-left: ${(props) => props.width}px;
  padding: 5px;
  position: absolute;
  font-size: ${(props) => props.width}px;
  color: green;
  font-family: "SuncheonR";
`;

const MHostProfile = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  top: ${(props) => props.width * 0.15}px;
  right: ${(props) => props.width * 0.05}px;
  position: absolute;
  font-size: small;
  color: #000000;
`;

const MTop = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

const MMemberNum = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: md;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const MRoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: md;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const MPasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: md;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
`;

const MPasswordInput = styled.input`
  width: ${(props) => props.width * 0.5}px;
  height: ${(props) => props.width * 0.08}px;
  border-radius: 4px;
  border: solid 1px;
  padding-left: 12px;
  font-size: ${(props) => props.width * 0.03}px;
  ::placeholder {
  }
`;

const MEnterButton = styled.button`
  display: block;
  margin: auto;
  margin-top: ${(props) => props.width * 0.04}px;
  width: ${(props) => props.width * 0.5}px;
  height: ${(props) => props.width * 0.1}px;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: ${(props) => props.width * 0.04}px;
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

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

const TitleImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: white;
  opacity: 0.2;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.img}");
`;

const TitleImageText = styled.h3`
  top: 0px;
  margin-left: 20px;
  padding: 5px;
  position: absolute;
  font-size: 30px;
  color: green;
  font-family: "SuncheonR";
`;

const HostProfile = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  top: 90px;
  right: 16px;
  position: absolute;
  font-size: small;
  color: #000000;
`;

const Top = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

const MemberNum = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: md;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: md;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const PasswordWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: md;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const PasswordInput = styled.input`
  width: 70%;
  height: 44px;
  border-radius: 4px;
  border: solid 1px;
  padding-left: 12px;
  ::placeholder {
  }
`;

const EnterButton = styled.button`
  display: block;
  margin: auto;
  margin-top: 24px;
  width: 412px;
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

export default RoomCardModal;
