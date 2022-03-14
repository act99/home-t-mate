import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 665,
  bgcolor: "background.paper",
  border: "solid 0px",
  boxShadow: 24,
};

const RoomCardModal = (props) => {
  const { clickCard, setClickCard, data } = props;
  const { roomId, roomName, content, member, img } = data;
  const history = useHistory();

  console.log(data);
  console.log(clickCard);
  return (
    <Modal
      open={clickCard}
      onClose={() => setClickCard(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Top>
          <CloseIcon sx={{ height: "100%", fontSize: "35px", mr: 1 }} />
        </Top>
        <TitleImage img={img}>
          <TitleImageText>{roomName}</TitleImageText>
          <HostProfile>
            <Avatar
              sx={{ width: 40, height: 40, mb: 1 }}
              alt="Remy Sharp"
              src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
            />
            호스트: 안뇽22
          </HostProfile>
        </TitleImage>

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
          />
        </PasswordWrap>
        <Alert severity="warning" sx={{ height: 120, mt: 5 }}>
          <AlertTitle>경고</AlertTitle>
          This is a warning alert — <strong>check it out!</strong>
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
          }}
          variant="outlined"
          onClick={() => {
            history.push({
              pathname: `/checkvideo`,
              state: { roomId: roomId, roomName: roomName },
            });
          }}
        >
          이 방에 참여하기
        </Button>
      </Box>
    </Modal>
  );
};

const TitleImage = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.img}");
`;

const TitleImageText = styled.h3`
  margin-left: 15px;
  padding: 5px;
  background-color: white;
  position: absolute;
  font-size: large;
  color: #ff9234;
`;

const HostProfile = styled.div`
  display: flex;
  border-radius: 10px;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  top: 8px;
  right: 16px;
  background-color: rgb(255, 255, 255, 0.7);
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
