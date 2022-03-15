//import Library
import React from "react";

import { CardHeader, IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {useDispatch, useSelector} from "react-redux";

//import Actions

//import elements
import { Image } from "../elements";
{/* <Cardheader id={props.id} username={props.nickname} userImg={props.userImg}  /> */}

function Cardheader(props) {
  const _user = useSelector(state=>state.userReducer.user);

  return (
    _user.is_login ? (
      // 로그인상태면 헤더에 ... 아이콘 보이게하기
    <CardHeader style={{backgroundColor: "#FF9234",borderTopRightRadius:"20px"}}
      avatar={
        <Image
          shape="circle"
          src={props.userImg}
          size="40"
          margin="0"
        />
      }
      action={
        //...아이콘 부분
        <IconButton aria-label="settings">
          <MoreHorizIcon />
        </IconButton>
      }
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />
    ) : (
      // 로그인상태가 아니면 ... 아이콘 안보이게하기
      <CardHeader style={{backgroundColor: "#FF9234",borderTopRightRadius:"20px"}}
      avatar={
        <Image
          shape="circle"
          src={props.userImg}
          size="40"
          margin="0"
        />
      }
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />

    )
  );
}

export default Cardheader;
