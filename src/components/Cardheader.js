//import Library
import React from "react";

import { CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import {Text} from "../elements";
// import Edit from "./Edit";
// import Write from "./Write";

//import Actions

//import elements
import { Image } from "../elements";
{
  /* <Cardheader id={props.id} username={props.nickname} userImg={props.userImg}  /> */
}

function Cardheader(props) {
  const _user = useSelector((state) => state.userReducer.user);

  //dropmodal open, close
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //수정하기 modal open,close
  const [editOpen, setEditOpen] = React.useState(false);
  const edithandleOpen = () => setEditOpen(true);
  const edithandleClose = () => setEditOpen(false);

  return _user.is_login ? (
    // 로그인상태면 헤더에 ... 아이콘 보이게하기
    <CardHeader
      style={{ backgroundColor: "#FF9234", borderTopRightRadius: "20px" }}
      avatar={<Image shape="circle" src={props.userImg} size="40" margin="0" />}
      action={
        //...아이콘 부분
        <>
          <IconButton aria-label="settings">
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </Button>

            {/* 삭제하기,수정하기,취소하기 dropdown modal부분 */}
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Text _onClick={edithandleOpen}>수정하기</Text>
              <Text>삭제하기</Text>
              <Text>취소하기</Text>
            </Popover>
          </IconButton>
          {/* 수정하기를 눌렀을때 Edit(수정)페이지로 이동 */}
          {/* <Edit open={editOpen} handleClose={edithandleClose}></Edit> */}
          </>
      }
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />
  ) : (
    // 로그인상태가 아니면 ... 아이콘 안보이게하기
    <CardHeader
      style={{ backgroundColor: "#FF9234", borderTopRightRadius: "20px" }}
      avatar={<Image shape="circle" src={props.userImg} size="40" margin="0" />}
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />
  );
}

export default Cardheader;
