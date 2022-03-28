import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginImage from "../assets/loginimage.png";
import CreateImage from "../assets/createimage.png";
import EnterRoomImage from "../assets/enterroomimage.png";
import AcceptCam from "../assets/acceptcam.png";
import CheckCam from "../assets/checkcam.png";
import Waiting from "../assets/waiting.png";
import Working from "../assets/working.png";
const HowtoUse = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ width: "100%", maxWidth: 1200, mb: 16 }}>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{ fontWeight: "bold", mt: 12, fontFamily: "GmarketSansLight" }}
          >
            사용 방법
          </Typography>
          <br />
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ fontFamily: "GmarketSansLight" }}
          >
            <strong>여러분을 환영합니다.</strong>
            <br />
            <br />
            홈트메이트 서비스를 이용해주시는 여러분 환영합니다! 지금부터
            홈트메이트의 서비스 이용방법을 간략하게 설명해드리겠습니다.
          </Typography>
          <br />
          <br />
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ fontFamily: "GmarketSansLight" }}
          >
            <strong>1. 로그인 하기</strong>
            <br />
            <br />
            <img src={LoginImage} alt="" width="70%" />
            <br /> <br />
            홈트메이트 서비스를 사용하려면 로그인이 필요합니다.
            <br /> 우측 상단에 있는 로그인 버튼을 클릭한 후, 카카오 로그인을
            해주세요.
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ marginTop: "96px", fontFamily: "GmarketSansLight" }}
          >
            <strong>2. 방 만들기</strong>
            <br />
            <br />
            <img src={CreateImage} alt="" width="70%" />
            <br /> <br />
            우측 상단에 있는 방 만들기 버튼을 클릭하신 후, 원하시는 방 제목과
            방에 대한 설명을 작성해주세요.
            <br /> 작성이 완료되시면 "지금 방 만들기" 버튼을 클릭해주세요.
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ marginTop: "96px", fontFamily: "GmarketSansLight" }}
          >
            <strong>3. 방 들어가기</strong>
            <br />
            <br />
            <img src={EnterRoomImage} alt="" width="70%" />
            <br /> <br />
            LiveNow 페이지에서 원하시는 방을 클릭하신 후,
            <br /> 이 방에 참여하기 버튼을 눌러 방에 참여해주세요.
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ marginTop: "96px", fontFamily: "GmarketSansLight" }}
          >
            <strong>4. 카메라 체크하기</strong>
            <br />
            <br />
            <img src={AcceptCam} alt="" width="70%" />
            <br /> <br />
            카메라 사용 및 마이크 사용을 허용해주신 후 카메라 상태를
            확인해주세요
            <br />
            <br />
            <img src={CheckCam} alt="" width="70%" />
            <br /> 카메라 상태를 다 확인하셨으면, 방 입장 버튼을 눌러주세요.
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            sx={{ marginTop: "96px", fontFamily: "GmarketSansLight" }}
          >
            <strong>5. 유튜브 url 넣고 운동 시작하기</strong>
            <br />
            <br />
            <img src={Waiting} alt="" width="70%" />
            <br /> <br />
            방에 입장하시면 카메라 또는 마이크 설정을 하신 후, <br /> 모든
            참여자들이 접속할 때 까지 기다려주세요.
            <br />
            <br />
            <storng
              style={{
                fontFamily: "GmarketSansLight",
                fontWeight: "bold",
                color: "red",
              }}
            >
              경고!
              <br />
              운동이 시작되면 더 이상 카메라 또는 마이크 설정을 하실 수
              없습니다.
              <br />
              카메라 또는 마이크 설정은 운동 종료 후, 또는 영상을 일시정지 한 후
              카메라 또는 마이크를 다시 설정해주세요.
            </storng>
            <br />
            <img src={Working} alt="" width="70%" />
            <br /> 모든 참여자들이 접속하면 유튜브 url 을 넣고 유튜브 url
            제출버튼을 눌러주세요.
            <br />
            <storng
              style={{
                fontFamily: "GmarketSansLight",
                fontWeight: "bold",
                color: "red",
              }}
            >
              <br /> 1. 유튜브 url 제출 버튼을 누르면 모든 유저들이 유튜브
              화면을 공유하게 됩니다.
              <br /> 2. 유튜브를 재생시키면 모든 유저들의 유튜브 영상이
              재생됩니다.
              <br /> 3. 유튜브 재생 또는 일시정지버튼을 누르면 모든 유저들의
              유튜브 영상이 재생 또는 일시정지 됩니다.
            </storng>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default HowtoUse;
