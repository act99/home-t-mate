//import Library
import React from "react";

import { CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { Text, Grid } from "../elements";
import Edit from "./Edit";
import { actionCreators as postActions } from "../redux/modules/postReducer";

import { Image } from "../elements";
export default function Cardheader(props) {
  const dispatch = useDispatch();
  const _user = useSelector((state) => state.userReducer.user);
  const _post = useSelector((state) => state.postReducer.list);

  const deletePostDB = () => {
    dispatch(postActions.deletePostDB(props.id));
    setAnchorEl(null);
    // window.alert("포스트가 정상적으로 삭제되었습니다.");
    // window.location.reload();
  };
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x));

  /* 삭제하기,수정하기,취소하기 dropdown modal open, close */
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

  // 글 작성자한테만 ... 아이콘 보이게하기
  return _user.id === thisPost.userId ? (
    <CardHeader
      style={{
        backgroundColor: "white",
        borderTopRightRadius: "20px",
        padding: "0px",
        paddingLeft: "32px",
        height: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      avatar={<Image shape="circle" src={props.userImg} size="40" />}
      action={
        //...아이콘 부분
        <>
          <Grid is_flex align_items="center" height="64px">
            <MoreHorizIcon
              onClick={handleClick}
              style={{
                fontSize: "30px",
                paddingRight: "30px",
                cursor: "pointer",
              }}
            />
          </Grid>
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
              style: { width: "200px", height: "140px" },
            }}
          >
            <Grid
              is_flex
              flex_direction="column"
              padding="10px"
              height="140px"
              // align_content="space-between"
              // align_items="center"
              justify_content="center"
            >
              <Grid margin="auto" text_align="start" cursor="pointer">
                <Text F_size="16px" _onClick={edithandleOpen}>
                  이 스토리 수정하기
                </Text>
              </Grid>
              <Grid margin="auto" cursor="pointer">
                <Text F_size="16px" _onClick={deletePostDB}>
                  이 스토리 삭제하기
                </Text>
              </Grid>
              <Grid margin="auto" cursor="pointer">
                <Text F_size="16px" _onClick={handleClose}>
                  취소하기
                </Text>
              </Grid>
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
        fontSize: 18,
        color: "black",
        fontFamily: "GmarketSansMedium",
      }}
      title={props.username}
    />
  ) : (
    // 글 작성자가 아니면 ... 아이콘 안보이게하기
    <CardHeader
      // style={{ backgroundColor: "#587730", borderTopRightRadius: "20px" }}
      style={{
        backgroundColor: "#587730",
        borderTopRightRadius: "20px",
        padding: "0px",
        paddingLeft: "32px",
        height: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
      avatar={<Image shape="circle" src={props.userImg} size="40" />}
      titleTypographyProps={{
        fontSize: 18,
        color: "#ffffff",
        fontFamily: "GmarketSansMedium",
      }}
      title={props.username}
    />
  );
}
