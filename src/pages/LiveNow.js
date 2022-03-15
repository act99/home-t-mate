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
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { AiOutlineLock } from "react-icons/ai";
import RoomCardModal from "../containers/RoomCardModal";

const LiveNow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);

  // ** 모달 생성
  const [clickCard, setClickCard] = React.useState(false);
  // ** 모달 props 전달
  const [modalData, setModalData] = React.useState({
    roomId: 0,
    roomName: "",
    content: "",
    member: 0,
    roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  });
  const cardOpenHandler = (roomId, roomName, content, roomImg) => {
    setClickCard(true);
    setModalData({
      ...modalData,
      roomId: roomId,
      roomName: roomName,
      content: content,
      roomImg: roomImg,
    });
  };
  React.useEffect(() => {
    dispatch(roomCreators.getRoomDB());
  }, []);
  return (
    <>
      <Container sx={{ py: 8, width: "100%" }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "bold", ml: 1, mb: 6, mt: 1 }}
        >
          🔥 Live Now 🔥
        </Typography>
        <Grid container spacing={7}>
          {roomList.map((item) => (
            <Grid item key={item.roomId + item.name} xs={12} sm={6} md={3}>
              <Card
                onClick={() => {
                  cardOpenHandler(
                    item.roomId,
                    item.name,
                    item.content,
                    item.roomImg
                  );
                }}
                sx={{
                  height: "352px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  borderRadius: "20px",
                }}
              >
                <CardMedia
                  sx={{ maxHeight: "50%", minHeight: "214.86px" }}
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
                    }}
                  >
                    <AiOutlineLock
                      style={{
                        marginRight: "5px",
                        marginLeft: "5px",
                      }}
                    />
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
                        sx={{ width: 30, height: 30, mr: 1 }}
                        alt="Remy Sharp"
                        src="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
                      />
                      by rlrl
                    </Nickname>
                    <MemberNum>
                      <PersonOutlineIcon />
                      (4/5)
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
    </>
  );
};

const CardBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  font-size: 14px;
  line-height: 24px;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: row;

  font-size: md;
`;

const MemberNum = styled.div`
  display: flex;
  flex-direction: row;
  font-size: md;
`;

export default LiveNow;
