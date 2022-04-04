import React from "react";
import moment from "moment";

import { CardHeader } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import Popover from "@mui/material/Popover";
import { Text, Grid } from "../../elements";
import Edit from "./Edit";
import { actionCreators as postActions } from "../../redux/modules/postReducer";
import useWindowSize from "../../hooks/useWindowSize";
import { Image } from "../../elements";
import { useMediaQuery } from "react-responsive";

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

  const time = moment(props.createdAt).format("YYYY.MM.DD a h:mm");

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

  const size = useWindowSize();
  const { width, height } = size;

  const isMobile = useMediaQuery({ query: "(max-width: 1209px" });

  // 글 작성자한테만 ... 아이콘 보이게하기
  return _user.id === thisPost.userId ? (
    <Grid is_flex>
      <CardHeader
        style={{
          padding: "0px",
          paddingLeft: "16px",
          height: isMobile ? "50px" : `${width * 0.04}px`,
        }}
        avatar={<Image shape="circle" src={props.userImg} size="40" />}
        titleTypographyProps={{
          fontWeight: 400,
          fontSize: isMobile ? "16px" : "2vmin",
          fontFamily: "GmarketSansMedium",
        }}
        title={props.username}
        action={
          //...아이콘 부분
          <>
            <Grid
              is_flex
              align_items="center"
              // height="64px"
              height={isMobile ? "50px" : width * 0.04 + "px"}
              position="absolute"
              right="0px"
            >
              <MoreHorizIcon
                onClick={handleClick}
                style={{ fontSize: "1.5em", paddingRight: "1em" }}
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
                style: { width: "15vmax", height: "10vmax" },
              }}
            >
              <Grid
                is_flex
                flex_direction="column"
                padding="10px"
                height="10vmax"
                align_content="space-around"
                // align_items="center"
                justify_content="center"
              >
                <Grid margin="auto" cursor="pointer">
                  <Text F_size="1vmax" _onClick={edithandleOpen}>
                    이 스토리 수정하기
                  </Text>
                </Grid>
                <Grid margin="auto" cursor="pointer">
                  <Text F_size="1vmax" _onClick={deletePostDB}>
                    이 스토리 삭제하기
                  </Text>
                </Grid>
                <Grid margin="auto" cursor="pointer">
                  <Text F_size="1vmax" _onClick={handleClose}>
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
      />
      <Text margin_left="20px" F_size={isMobile ? "0.7rem" : "0.9vmax"} F_color="#757575">
        {isMobile ? time : time + "에 작성됨"}
      </Text>
    </Grid>
  ) : (
    // 글 작성자가 아니면 ... 아이콘 안보이게하
    <Grid is_flex>
      <CardHeader
        style={{
          borderTopRightRadius: "20px",
          padding: "0px",
          paddingLeft: "16px",
          height: isMobile ? "50px" : `${width * 0.04}px`,
        }}
        avatar={<Image shape="circle" src={props.userImg} size="40" />}
        titleTypographyProps={{
          fontWeight: 400,
          fontSize: isMobile ? "16px" : "2vmin",
          fontFamily: "GmarketSansMedium",
        }}
        title={props.username}
      />
      <Text margin_left="20px" F_size="0.9vmax" F_color="#757575">
        {isMobile ? time : time + "에 작성됨"}
      </Text>
    </Grid>
  );
}
