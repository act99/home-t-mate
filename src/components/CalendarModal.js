import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ko } from "date-fns/esm/locale";
import Grid from "../elements/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 13000,
};

export default function TransitionsModal(props) {
  const { open, handleClose, todoEvent, setTodoEvent } = props;
  const { id, title, start, end, time } = todoEvent;

  if (id === undefined) {
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
                <input required type="text" placeholder="오늘의 운동 목표는?" />
              </Grid>

              <Grid margin_bottom="10px">
                <label>운동 시작일</label>
                <DatePicker
                  locale={ko}
                  selected={start}
                  onChange={(date) =>
                    setTodoEvent({ ...todoEvent, start: date })
                  }
                />
              </Grid>

              <Grid margin_bottom="10px">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopTimePicker
                    label="운동 시작시간"
                    value={time}
                    onChange={(newValue) => {
                      console.log(newValue);
                      setTodoEvent({ ...todoEvent, time: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid margin_bottom="10px">
                <label>운동 종료일</label>
                <DatePicker
                  locale={ko}
                  selected={end}
                  onChange={(date) => setTodoEvent({ ...todoEvent, end: date })}
                />
              </Grid>

              <button>추가하기</button>
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
              <input required type="text" placeholder="오늘의 운동 목표는?" />
            </Grid>

            <Grid margin_bottom="10px">
              <label>운동 시작일</label>
              <DatePicker
                locale={ko}
                selected={start}
                onChange={(date) => setTodoEvent({ ...todoEvent, start: date })}
              />
            </Grid>

            <Grid margin_bottom="10px">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopTimePicker
                  label="운동 시작시간"
                  value={time}
                  onChange={(newValue) => {
                    setTodoEvent({ ...todoEvent, time: newValue });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid margin_bottom="10px">
              <label>운동 종료일</label>
              <DatePicker
                locale={ko}
                selected={end}
                onChange={(date) => setTodoEvent({ ...todoEvent, end: date })}
              />
            </Grid>

            <button>수정하기</button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
