import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import TextField from "@mui/material/TextField";
import { ko } from "date-fns/esm/locale";
import Grid from "../elements/Grid";
import moment from "moment";
import { useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todoReducer";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   // border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   zIndex: 13000,
// };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 560,
  height: 688,
  bgcolor: "background.paper",
  border: "solid 0px",
  boxShadow: 24,
};

export default function TransitionsModal(props) {
  const dispatch = useDispatch();
  const { open, handleClose, events } = props;
  console.log(events.id);
  // ** 달력 세팅
  const [changeStart, setChangeStart] = React.useState(new Date());
  const [changeEnd, setChangeEnd] = React.useState(new Date());
  const [changeTitle, setChangeTitle] = React.useState("");
  const [changeTime, setChangeTime] = React.useState("00:00");
  const addClickHandler = () => {
    console.log(
      moment(changeStart).format().split("T")[0] + "T" + changeTime + ":00",
      moment(changeEnd).format().split("T")[0] + "T" + changeTime + ":00",
      changeTime
    );
    dispatch(
      todoActions.addTodo({
        id: 5,
        title: changeTitle,
        start:
          moment(changeStart).format().split("T")[0] + "T" + changeTime + ":00",
        end:
          moment(changeEnd).format().split("T")[0] + "T" + changeTime + ":00",
        time: changeTime,
      })
    );
    handleClose();
  };
  const editClickHandler = () => {
    dispatch(
      todoActions.editTodo(events.id, {
        id: events.id,
        title: changeTitle,
        start:
          moment(changeStart).format().split("T")[0] + "T" + changeTime + ":00",
        end:
          moment(changeEnd).format().split("T")[0] + "T" + changeTime + ":00",
        time: changeTime,
      })
    );
    handleClose();
  };
  const deleteClickHandler = () => {
    dispatch(todoActions.deleteTodo(events.id));
  };
  React.useEffect(() => {
    if (events.title !== undefined) {
      setChangeTitle(events.title);
      setChangeStart(new Date(events.start));
      setChangeEnd(new Date(events.end));
      setChangeTime(
        moment(events.start)
          .format()
          .split("T")[1]
          .split("+")[0]
          .slice(
            0,
            moment(events.start).format().split("T")[1].split("+")[0].length - 3
          )
      );
    } else {
      if (events.start !== undefined) {
        setChangeStart(new Date(events.start));
      }
    }
    return () => {};
  }, [events]);

  if (events.title === undefined) {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Top>
                <IconButton onClick={() => handleClose(false)}>
                  <CloseIcon sx={{ height: "100%", fontSize: "40px", mr: 1 }} />
                </IconButton>
              </Top>
              <Row>
                <WrapDate>
                  <h3>운동 시작 날짜</h3>
                  <DatePicker
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}
                    selected={changeStart}
                    onChange={(date) => setChangeStart(date)}
                  />
                </WrapDate>
                <WrapDate>
                  {" "}
                  <h3>운동 종료일</h3>
                  <DatePicker
                    dateFormat="yyyy년 MM월 dd일"
                    locale={ko}
                    selected={changeEnd}
                    onChange={(date) => setChangeEnd(date)}
                  />
                </WrapDate>
              </Row>
              <Row>
                <WrapDate>
                  <h3>운동 종료일</h3>
                  <TextField
                    id="time"
                    type="time"
                    defaultValue={changeTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    sx={{
                      width: 250,
                      height: 56,
                      border: "solid 1px",
                      borderRadius: "4px",
                    }}
                    onChange={(e) => setChangeTime(e.currentTarget.value)}
                  />
                </WrapDate>
              </Row>
              <TodoWrap>
                <h3 style={{ margin: "0px" }}>이 날의 할 일</h3>
                <br></br>
                <TextAreaStyle
                  required
                  type="text"
                  placeholder="이 날의 운동 목표는?"
                  value={changeTitle}
                  onChange={(e) => setChangeTitle(e.target.value)}
                />
              </TodoWrap>
              <CreateButton onClick={addClickHandler}>
                할 일 추가하기
              </CreateButton>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid margin_bottom="10px">
              <label>할일</label>
              <br></br>
              <input
                required
                type="text"
                placeholder="오늘의 운동 목표는?"
                value={changeTitle}
                onChange={(e) => setChangeTitle(e.target.value)}
              />
            </Grid>

            <Grid margin_bottom="10px">
              <label>운동 시작일</label>
              <DatePicker
                locale={ko}
                selected={changeStart}
                onChange={(date) => setChangeStart(date)}
              />
            </Grid>
            <Grid margin_bottom="10px">
              <TextField
                id="time"
                type="time"
                defaultValue={changeTime}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                sx={{ width: 150 }}
                onChange={(e) => setChangeTime(e.currentTarget.value)}
              />
            </Grid>
            <Grid margin_bottom="10px">
              <label>운동 종료일</label>
              <DatePicker
                locale={ko}
                selected={changeEnd}
                onChange={(date) => setChangeEnd(date)}
              />
            </Grid>

            <button onClick={editClickHandler}>수정하기</button>
            <button onClick={deleteClickHandler}>삭제하기</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const Top = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  background-color: white;
`;

const Row = styled.div`
  width: 90%;
  height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  h3 {
    font-size: 20px;
    font-family: "GmarketSansMedium";
    margin: 0px;
  }
`;

const WrapDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 120px;
`;

const TodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 240px;
  margin-top: 32px;
  h3 {
    font-size: 20px;
    font-family: "GmarketSansMedium";
    margin: 0px;
  }
`;

const TextAreaStyle = styled.textarea`
  width: 80%;
  height: 240px;
  resize: none;
  padding: 8px;
  border: solid 2px black;
  :focus {
    border: solid 2px black;
  }
`;

const CreateButton = styled.button`
  display: block;
  /* margin: auto; */
  width: 85%;
  height: 56px;
  margin-top: 24px;
  margin-bottom: auto;
  border-radius: 10px;
  border: solid 2px green;
  background-color: white;
  font-size: 16px;
  color: green;
  font-weight: bold;
  margin-right: auto;
  margin-left: auto;

  /* font-weight: bold; */
  cursor: pointer;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    background-color: green;
    color: white;
  }
`;
