import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Grid from "../elements/Grid";
import "react-datetime/css/react-datetime.css";
import "moment/locale/ko";
// import React from "react";
import CalendarModal from "../components/CalendarModal";
import Text from "../elements/Text";
import Image from "../elements/Image";
import * as React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import "../styles/fullcalendar.css";
import CreateRoomModal from "../containers/CreateRoomModal";
import { StyledTab, StyledTabs } from "../styles/tabStyle";
import KakaoShareButton from "../shared/Kakao-shared-btn";
import { actionCreators as todoActions } from "../redux/modules/todoReducer";
import ChangeProfileModal from "../containers/ChangeProfileModal";
import ProfileImage from "../elements/ProfileImage";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoReducer.list);
  const [open, setOpen] = React.useState(false);
  // ** event 를 클릭했을 때
  const [events, setEvents] = React.useState({});
  const eventClickHandler = (e) => {
    setEvents({
      id: e.event.id,
      title: e.event.title,
      start: e.event.start,
      end: e.event.end,
      time: e.event.time,
    });
    console.log(e.event.title);
    setOpen(true);
  };
  const handleClose = () => {
    setEvents({});
    setOpen(false);
  };
  const [TabValue, setTabValue] = React.useState("1");
  const TabhandleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const dateClickHandler = (e) => {
    setEvents({
      start: e.dateStr,
    });
    setOpen(true);
  };

  const user = useSelector((state) => state.userReducer.user);
  const { nickname, profileImg } = user;
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);

  // ** 프로필 이미지 수정
  const [openProfile, setOpenProfile] = React.useState(false);

  React.useEffect(() => {
    dispatch(todoActions.getTodoDB());
    console.log(todoList);
    return () => {};
  }, []);

  return (
    <Grid width="1200px" margin="auto">
      <UserContainer>
        <Title
          F_size="28px"
          margin_bottom="16px"
          style={{ fontFamily: "GmarketSansMedium" }}
        >
          <h3>
            반가워요 <span>{nickname}</span> 님 :)
          </h3>
          <h5>
            오늘도 즐거운 <span>홈트</span>를 응원해요💪💪
          </h5>
        </Title>

        <UserInfoContainer>
          <UserDataContainer>
            <ProfileImage
              src={profileImg}
              onClick={() => setOpenProfile(true)}
            />
            <UserNameContainer style={{ marginLeft: "40px", marginTop: "32x" }}>
              <Text F_size="28px" F_weight="bold" margin_top="16px">
                {nickname}
              </Text>
              <div
                style={{
                  width: "200px",
                  height: "36px",
                  backgroundColor: "#fee500",
                  borderRadius: "16px",
                  display: "flex",
                  justifyContent: "center",
                  justifyItems: "center",
                  marginTop: "12px",
                  marginBottom: "56px",
                }}
              >
                <h3 style={{ margin: "auto", fontSize: "16px" }}>
                  카카오톡으로 로그인 됨
                </h3>
              </div>
              <CreateButton
                onClick={() => {
                  setCreateRoomOpen(true);
                }}
              >
                지금 방 만들기
              </CreateButton>
              <CreateRoomModal
                createRoomOpen={createRoomOpen}
                setCreateRoomOpen={setCreateRoomOpen}
              />
            </UserNameContainer>
          </UserDataContainer>
          <InviteContainer>
            <div
              style={{
                width: "200px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                justifyItems: "center",
                // marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <h3 style={{ margin: "auto", fontSize: "16px" }}>
                홈트메이트로 친구 초대하기
              </h3>
            </div>
            <KakaoShareButton />
          </InviteContainer>
        </UserInfoContainer>
      </UserContainer>

      {/* userimg */}

      {/* tab영역 */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={TabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "white", mb: 4 }}>
            <StyledTabs
              onChange={TabhandleChange}
              aria-label="lab API tabs"
              TabIndicatorProps={{
                children: <span className="MuiTabs-indicatorSpan" />,
              }}
            >
              <StyledTab
                label="나의 캘린더"
                value="1"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "SuncheonR",
                }}
              />
              <StyledTab
                label="내가 작성한 스토리"
                value="2"
                sx={{ fontWeight: "bold", fontFamily: "SuncheonR" }}
              />
            </StyledTabs>
          </Box>
          <TabPanel value="1" sx={{ p: "0px" }}>
            <Grid margin="auto" position="relative">
              <FullCalendar
                height="960px"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayMaxEvents={true} //일정 많아지면 +버튼 생성
                customButtons={{
                  myCustomButton: {
                    text: " + 할 일 추가하기 ",
                    click: function () {
                      setOpen(true);
                    },
                  },
                }}
                headerToolbar={{
                  right: "myCustomButton",
                  center: "title",
                  left: "prev,next",
                }}
                events={todoList}
                dateClick={dateClickHandler}
                eventClick={eventClickHandler}
                locale="ko" //한국어변경
              />
              <CalendarModal
                events={events}
                open={open}
                handleClose={handleClose}
              ></CalendarModal>
            </Grid>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
      <ChangeProfileModal
        setOpenProfile={setOpenProfile}
        openProfile={openProfile}
        profileImg={profileImg}
      />
    </Grid>
  );
};

const UserContainer = styled.div`
  width: 1200px;
  height: 320px;
  margin-top: 120px;
  margin-bottom: 100px;
`;

const UserInfoContainer = styled.div`
  width: 1200px;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const UserDataContainer = styled.div`
  width: 700px;
  height: 200px;
  display: flex;
  flex-direction: row;
`;

const UserNameContainer = styled.div`
  width: 440px;
  height: 176px;
`;

const InviteContainer = styled.div`
  width: 252px;
  height: 88px;
  margin-top: 76px;
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 160px;
  height: 40px;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 8px;
  border: solid 2px green;
  background-color: rgb(0, 0, 0, 0);
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: 16px;
  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;

const Title = styled.div`
  h3 {
    font-size: 32px;
    font-family: "GmarketSansMedium";
  }
  h5 {
    font-size: 16px;
    font-family: "GmarketSansLight";
  }
  span {
    font-size: 32px;
    font-family: "GmarketSansMedium";
  }
`;

export default Mypage;
