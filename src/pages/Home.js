import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import { useHistory } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  rgbToHex,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { AiOutlineLock } from "react-icons/ai";
import RoomCardModal from "../containers/RoomCardModal";
import BxSlide from "../assets/bxslide.png";
import HowToUse from "../assets/howtouse.png";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);
  const roomEight = roomList.slice(0, 8);

  // ** 모달 생성
  const [clickCard, setClickCard] = React.useState(false);
  // ** 모달 props 전달
  const [modalData, setModalData] = React.useState({
    userCount: null,
    passCheck: false,
    roomId: 0,
    roomName: "",
    content: "",
    member: 0,
    nickname: "",
    profileImg: "",
    workOut: false,
    roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  });
  const cardOpenHandler = (
    roomId,
    roomName,
    content,
    roomImg,
    passCheck,
    userCount,
    profileImg,
    nickname,
    workOut
  ) => {
    setClickCard(true);
    setModalData({
      ...modalData,
      roomId: roomId,
      roomName: roomName,
      content: content,
      roomImg: roomImg,
      passCheck: passCheck,
      userCount: userCount,
      profileImg: profileImg,
      nickname: nickname,
      workOut: workOut,
    });
  };
  React.useEffect(() => {
    dispatch(roomCreators.getRoomDB());
  }, []);
  return (
    <>
      <Wrap>
        <BxSlideCon>
          <img alt="" src={BxSlide} width="100%" />
        </BxSlideCon>
        <Container sx={{ py: 8, width: "100%" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontWeight: "bold", ml: 1, mb: 6, mt: 1, color: "#FF9234" }}
          >
            LIVE NOW 🔥
          </Typography>
          <Grid container spacing={7}>
            {roomEight.map((item) => (
              <Grid item key={item.roomId + item.name} xs={12} sm={6} md={3}>
                <Card
                  onClick={() => {
                    cardOpenHandler(
                      item.roomId,
                      item.name,
                      item.content,
                      item.roomImg,
                      item.passCheck,
                      item.userCount,
                      item.profileImg,
                      item.nickname,
                      item.workOut
                    );
                  }}
                  sx={{
                    height: "280px",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  <CardMedia
                    sx={{ maxHeight: "50%", minHeight: "172px" }}
                    component="img"
                    image={item.roomImg}
                    alt="random"
                  />
                  <CardContent
                    sx={{ flexGrow: 1, minHeight: "186px", paddingLeft: 0.5 }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        paddingTop: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: "5px",
                      }}
                    >
                      {item.passCheck === true ? (
                        <AiOutlineLock
                          style={{
                            marginRight: "5px",
                          }}
                        />
                      ) : null}
                      {item.name.length > 10
                        ? item.name.slice(0, 10) + "..."
                        : item.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 12, paddingTop: 1, paddingBottom: 1 }}
                    ></Typography>
                    <CardBottom>
                      <Nickname>
                        <Avatar
                          sx={{ width: 30, height: 30, mr: 1, zIndex: 1 }}
                          alt="Remy Sharp"
                          src={
                            item.profileImg === null ||
                            item.profileImg === undefined
                              ? null
                              : item.profileImg
                          }
                        />
                        by.{"  "}
                        {item.nickname === null || item.nickname === undefined
                          ? null
                          : item.nickname.length === undefined
                          ? null
                          : item.nickname.length > 7
                          ? item.nickname.slice(0, 6) + "..."
                          : item.nickname}
                        {/* {item.nickname !== null ||
                      item.nickname.length !== undefined
                        ? item.nickname.length > 7
                          ? item.nickname.slice(0, 6) + "..."
                          : item.nickname
                        : null} */}
                      </Nickname>
                      <MemberNum>
                        <PersonOutlineIcon />(
                        {item.userCount === null ? 0 : item.userCount}/5)
                      </MemberNum>
                    </CardBottom>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <RoomCardModal
          clickCard={clickCard}
          setClickCard={setClickCard}
          data={modalData}
        />
        <BxSlideCon>
          <img alt="" src={HowToUse} width="100%" />
        </BxSlideCon>
      </Wrap>
    </>
  );
};

const BxSlideCon = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
`;

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  font-size: 14px;
  line-height: 24px;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: md;
`;

const MemberNum = styled.div`
  display: flex;
  flex-direction: row;
  font-size: md;
`;

export default Home;
