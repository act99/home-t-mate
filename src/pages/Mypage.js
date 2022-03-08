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
import Button from "../elements/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const Mypage = (props) => {
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
    console.log(e.dateStr);
  };
  React.useEffect(() => {
    return () => {};
  }, [todoList]);

  return (
    <Grid width="1200px" margin="auto">
      <Text F_size="36px" margin_bottom="80px">
        마이페이지
      </Text>
      <Text F_size="28px" margin_bottom="16px">
        반가워요 <span>유저닉네임</span>님:)
      </Text>
      <Text F_size="28px" margin_bottom="48px">
        오늘도 즐거운 <span>홈트</span>를 응원해요💪💪
      </Text>

      {/* userimg */}
      <Grid is_flex margin_bottom="100px">
        <Image
          src="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
          width="203px"
          height="203px"
          border_radius="20px"
          margin_right="48px"
        />
        <Grid margin_left="48px">
          <Text F_size="28px">유저닉네임</Text>
          <Grid is_flex margin_bottom="50px" margin_top="16px">
            <Text F_size="24px" margin_right="16px">
              123@naver.com
            </Text>
            <Grid width="184px" height="33px" B_radius="12px" BG_c="#ebc634">
              <Text F_size="14px">카카오톡으로 로그인됨</Text>
            </Grid>
          </Grid>
          <Button width="183px" height="52px" B_radius="20px">
            <Text F_size="20px">지금 방 만들기</Text>
          </Button>
        </Grid>

        <Grid margin_left="282px" margin_top="118px">
          <Text F_size="18px">홈트메이트로 친구 초대하기</Text>
          <Grid is_flex width="252px">
            <Image
              src="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
              shape="circle"
              size="48"
            />
            <Image
              src="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
              shape="circle"
              size="48"
            />
            <Image
              src="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
              shape="circle"
              size="48"
            />
            <Image
              src="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
              shape="circle"
              size="48"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* tab영역 */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={TabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "white" }}>
            <TabList
              onChange={TabhandleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="나의 캘린더" value="1" />
              <Tab label="내가 작성한 스토리" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: "0px" }}>
            <Grid margin="auto" position="relative">
              <FullCalendar
                height="800px"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dayMaxEvents={true} //일정 많아지면 +버튼 생성
                headerToolbar={{
                  right: "prev,next today",
                  center: "title",
                  left: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={todoList}
                dateClick={dateClickHandler}
                eventClick={eventClickHandler}
                locale="ko" //한국어변경
              />

              <Write onClick={() => setOpen(true)}></Write>
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
    </Grid>
  );
};

const Write = styled.div`
  width: 55px;
  height: 55px;
  background-color: rgb(255, 228, 228);
  border-radius: 100%;
  position: absolute;
  bottom: -3px;
  right: -3px;
  cursor: pointer;
  z-index: 1;
`;

export default Mypage;
