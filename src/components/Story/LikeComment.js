//import Library
//react-icons, mui/icons-material
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { history } from "../../redux/store";
import { FaRegComment } from "react-icons/fa";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postAcions } from "../../redux/modules/postReducer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { Grid, Text, Button } from "../../elements";

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
    dispatch(postAcions.likePostDB(thisPost.id, _user.id, _user.nickname));
    if (like === true) {
      setLike(false);
    } else {
      setLike(true);
    }
    return;
  };

  //detail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);

  //좋아요눌렀을때 로그인 안했으면 로그인modal창 open, close
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      <Grid
        is_flex
        justify_content="space-between"
        margin="10px"
        margin_top="24px"
      >
        <Grid is_flex flex_wrap="nowrap">
          {/* 좋아요버튼 */}
          <Button
            _onClick={_user.is_login ? likePost : handleLoginOpen}
            border="0px"
            BG_color="white"
            padding="0px"
            margin="0px 15px 0px 0px"
            width="1%"
            height="1%"
          >
            {like ? (
              <AiFillHeart size={props.size} color="red" />
            ) : (
              <AiOutlineHeart size={props.size} />
            )}
          </Button>

          {/* 댓글버튼 => 상세페이지로 이동 */}
          <Button
            _onClick={handleOpen}
            border="0px"
            BG_color="white"
            padding="0px"
            width="28px"
            height="28px"
          >
            <FaRegComment
              size="28"
              onClick={handleOpen}
              display={props.none}
              cursor={props.none}
            />
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
          <Detail
            id={props.id}
            commentUserDto={props.commentUserDto}
            likeUserDto={props.likeUserDto}
          />
          <Grid position="absolute" right="0">
            <CloseIcon
              sx={{ color: "white", fontSize: 40 }}
              onClick={handleClose}
            />
          </Grid>
        </div>
      </Modal>

      {/* login modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Box sx={stylenoborder}>
            <Grid
              width="420px"
              height="220px"
              is_flex
              flex_direction="column"
              justify_content="center"
              align_items="center"
            >
              <Text F_size="24px" F_align="center" margin="0px 70px 12px 70px">
                홈트메이트를 즐기기 위해 로그인이 필요해요
              </Text>
              <Text F_size="16px" margin_bottom="32px">
                로그인 후 더 재미있게 놀아볼까요?
              </Text>

              <Grid is_flex>
                <Button
                  _onClick={handleLoginClose}
                  font_size="20px"
                  font_color="#757575"
                  font_weight="400"
                  B_radius="20px"
                  border="2px solid #757575"
                  width="120px"
                  height="50px"
                  BG_color="white"
                  margin="0px 30px 0px 0px"
                >
                  취소하기
                </Button>
                <Button
                  _onClick={() => {
                    history.push("/login");
                  }}
                  font_size="20px"
                  font_color="#587730"
                  font_weight="400"
                  B_radius="20px"
                  border="2px solid #587730"
                  width="120px"
                  height="50px"
                  BG_color="white"
                >
                  로그인하기
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const stylenoborder = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  zIndex: 13000,
  padding: 0,
  outline: "none",
};
