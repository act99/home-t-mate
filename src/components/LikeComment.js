//import Library
//react-icons, mui/icons-material
import React from "react";

import { CardHeader, Avatar, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaRegComment } from "react-icons/fa";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAcions } from "../redux/modules/postReducer";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
//import Actions

//import elements
import { Grid, Text, Button } from "../elements";

//import Icon

// impot Component
import Detail from "./Detail";
//import Actions

//import axios

export default function LikeComment(props) {
  const dispatch = useDispatch();

  const _post = useSelector((state) => state.postReducer.list);
  const _user = useSelector((state) => state.userReducer.user);

  //post id와 props받아온 해당 post의 id가 서로 일치하는지
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x), "");

  // ** likeUserDto안에있는 키값 userId만 추출해서 배열로 만들기
  // const likeUserList = thisPost.likeUserDto.map((a) => a.userId);
  const [like, setLike] = React.useState(false);

  React.useEffect(() => {
    if (thisPost.likeUserDto) {
      let result = thisPost.likeUserDto.filter(
        (item) => item.userId === _user.id
      );
      if (result.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    }

    return () => {};
  }, [thisPost.likeUserDto, like]);

  // includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별
  // user가 좋아요 눌렀는지 안눌렀는지 판단

  const likePost = () => {
    if (!_user.is_login) {
      alert("로그인을 해주세요");
      return;
    } else {
      dispatch(postAcions.likePostDB(thisPost.id, _user.id));
      if (like === true) {
        setLike(false);
      } else {
        setLike(true);
      }
    }
  };

  //detail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid
        is_flex
        justify_content="space-between"
        margin="10px"
        margin_top="30px"
      >
        <Grid is_flex flex_wrap="nowrap">
          {/* 좋아요버튼 */}
          <Button
            _onClick={likePost}
            border="0px"
            BG_color="white"
            padding="0px"
            margin="0px 15px 0px 0px"
            width="28px"
            height="28px"
          >
            {like ? <FavoriteOutlinedIcon style={{fontSize:"40px", color:"#587730"}} /> : <FavoriteBorderOutlinedIcon style={{fontSize:"40px"}} />}
          </Button>

          {/* 댓글버튼 => 상세페이지로 이동 */}
          <Button
            _onClick={handleOpen}
            border="0px"
            BG_color="white"
            padding="0px"
            width="28px"
            margin="0px 5px 4px 5px"
            height="28px"
          >
            <FaRegComment size="35" border="3px" onClick={handleOpen} />
          </Button>
        </Grid>
      </Grid>

      {/* 상세페이지 modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Detail id={props.id} commentUserDto={props.commentUserDto} />
          <Grid position="absolute" right="0">
            <CloseIcon
              sx={{ color: "white", fontSize: 40 }}
              onClick={handleClose}
            />
          </Grid>
        </div>
      </Modal>
    </>
  );
}
