//import Library
//react-icons, mui/icons-material
import React from "react";

import { CardHeader, Avatar, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { BsChat } from "react-icons/bs";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useDispatch, useSelector} from "react-redux";
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
  // commentUserDto={props.commentUserDto}
  // likeUserDto={props.likeUserDto}
  // likeCount={props.likeCount}
  // id={props.id}
  // modal={true}
  console.log(props);
  const dispatch = useDispatch();

  const _post = useSelector((state) => state.postReducer.list);
  const _user = useSelector((state) => state.userReducer.user);

  //post id와 props받아온 해당 post의 id가 서로 일치하는지
  const thisPost = _post.reduce(
    (x, v, i) => (v.id === props.id ? v : x),
    ""
  );

  console.log('like thispost' ,thisPost);

  // includes() 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.
  // user가 좋아요 눌렀는지 안눌렀는지 판단
  // const [like, setLike] = React.useState(
  //   thisPost.likeUserDto.includes(_user.id) ? setLike(true) : setLike(false)
  // );

  // const likePost = () => {
  //   if (!_user.is_login) {
  //     alert("로그인을 해주세요");
  //     return;
  //   } else {
  //     dispatch(postAcions.likePostDB(thisPost.id, _user.id));
  //     setLike(!like); //이미 누른 좋아요를 다시누르면 취소됨
  //   }
  // };

  //detail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
    <Grid
        B_top="1px solid #efefef"
        is_flex
        justify_content="space-between"
        margin="10px"
        margin_top="0px"
      >
        <Grid is_flex flex_wrap="nowrap" width="auto">
          {/* 좋아요버튼 */}
          <Button
            // _onClick={likePost}
            border="0px"
            BG_color="white"
            padding="0px"
            margin="0px 5px"
            width="28px"
            height="28px"
          >
           {/* {like ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
          </Button> */}
            <FavoriteBorderOutlinedIcon />
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
            <BsChat size="22" border="3px" onClick={handleOpen}
            
            />
          </Button>

        </Grid>
      </Grid>

        {/* 좋아요버튼
          <IconButton
            sx={{ pl: 2, pb: 2 }}
            aria-label="add to favorites"
            onClick={() => console.log("hi")}
          >
            <FavoriteBorderIcon />
          </IconButton>

          댓글버튼 => 상세페이지로 이동
          <IconButton sx={{ pb: 2 }} aria-label="chat" onClick={handleOpen}>
            <BsChat size="22" border="3px" />
          </IconButton> */}

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
