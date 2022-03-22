//import Library
import React from "react";

import { CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Text,Grid } from "../elements";
import Edit from "./Edit";
import { actionCreators as postActions } from "../redux/modules/postReducer";

import { Image } from "../elements";
export default function Cardheader(props) {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.userReducer.user);
  const _post = useSelector((state) => state.postReducer.list);
  const deletePostDB = () => {
    dispatch(postActions.deletePostDB(props.id));
    window.alert("포스트가 정상적으로 삭제되었습니다.");
    window.location.reload();
  };
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x));

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

  return _user.id === thisPost.userId ? (
    // 글 작성자한테만 ... 아이콘 보이게하기
    <CardHeader
      style={{ backgroundColor: "#587730", borderTopRightRadius: "20px" }}
      avatar={<Image shape="circle" src={props.userImg} size="40" margin="0" />}
      action={
        //...아이콘 부분
        <>
          <MoreHorizIcon onClick={handleClick} />

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
            PaperProps={{
              style: { width: "200px", height: "200px" },
            }}
          >
            <Grid
              is_flex
              flex_direction="column"
              justify_content="center"
              align_items="center"
            >
              <Text F_size="16px" _onClick={edithandleOpen}>
                수정하기
              </Text>
              <Text F_size="16px" _onClick={deletePostDB}>
                삭제하기
              </Text>
              <Text F_size="16px" _onClick={handleClose}>
                취소하기
              </Text>
            </Grid>
          </Popover>

          {/* 수정하기를 눌렀을때 Edit(수정)페이지로 이동 */}
          <Edit
            {...thisPost}
            open={editOpen}
            handleClose={edithandleClose}
          ></Edit>
        </>
      }
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />
  ) : (
    // 글 작성자가 아니면 ... 아이콘 안보이게하기
    <CardHeader
      style={{ backgroundColor: "#587730", borderTopRightRadius: "20px" }}
      avatar={<Image shape="circle" src={props.userImg} size="40" margin="0" />}
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />
  );
}
