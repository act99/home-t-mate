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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 695,
  bgcolor: "background.paper",
  border: "solid 0px",
  boxShadow: 24,
};

const RoomCardModal = (props) => {
  const { clickCard, setClickCard, data } = props;
  const { roomId, roomName, content, member, roomImg } = data;
  const history = useHistory();
  const passwordRef = React.useRef();
  const handleEnterRoom = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.value);
    apis
      .enterRoom(roomId, passwordRef.current.value)
      .then((res) => {
        history.push({
          pathname: `/checkvideo`,
          state: {
            roomId: roomId,
            roomName: roomName,
            password: passwordRef.current.value,
          },
        });
      })
      .catch((error) => {
        alert("잘못된 비밀번호입니다.");
        console.log(error);
      });
  };

  return (
    <Modal
      open={clickCard}
      onClose={() => setClickCard(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Top>
          <IconButton onClick={() => setClickCard(false)}>
            <CloseIcon sx={{ height: "100%", fontSize: "35px", mr: 1 }} />
          </IconButton>
        </Top>
        <TitleContainer>
          <TitleImage img={roomImg}></TitleImage>{" "}
          <TitleImageText>{roomName}</TitleImageText>
          <HostProfile>
            <Avatar
              sx={{ width: 30, height: 30, mt: 0.3, mr: 1 }}
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
            />
            by. 안뇽22
          </HostProfile>
        </TitleContainer>

        <MemberNum>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "17px", fontWeight: "bold" }}
          >
            현재 멤버 수
          </Typography>
          <PersonOutlineIcon sx={{ ml: 1 }} />
          (4/5)
        </MemberNum>
        <RoomInfo>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "17px", fontWeight: "bold" }}
          >
            방 정보
          </Typography>
          <Typography id="modal-modal-description" sx={{ fontSize: "13px" }}>
            {content}
          </Typography>
        </RoomInfo>
        <form onSubmit={handleEnterRoom}>
          <PasswordWrap>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "17px", fontWeight: "bold" }}
            >
              방 비밀번호
            </Typography>

            <PasswordInput
              placeholder="비밀번호를 입력 해 주세요 :)"
              type="password"
              ref={passwordRef}
            />
          </PasswordWrap>
          <Alert severity="warning" sx={{ height: 160, mt: 5 }}>
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
          <Button
            sx={{
              display: "block",
              width: "90%",
              py: 1.5,
              borderRadius: "15px",
              mx: "auto",
              mt: 3,
              fontWeight: "bold",
              border: "solid 1px #ff9234",
              color: "#ff9234",
              "&:hover": {
                backgroundColor: "#ffffff",
                boxShadow: "none",
                border: "solid 1px #ff9234",
              },
            }}
            variant="outlined"
            type="submit"
            // onClick={() => {}}
          >
            이 방에 참여하기
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

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
  color: #ff9234;
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
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

const MemberNum = styled.div`
  display: flex;
  flex-direction: row;
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
  height: 30px;
  border-radius: 3px;
  border: solid 1px;
  padding-left: 10px;
  ::placeholder {
  }
`;

export default RoomCardModal;
