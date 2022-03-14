//import Library
import React from "react";

import { CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//import Actions

//import elements
import { Image } from "../elements";
{/* <Cardheader id={props.id} username={props.nickname} userImg={props.userImg}  /> */}

function Cardheader(props) {
  return (
    <CardHeader
      sx={{ width: 40 }}
      avatar={
        <Image
          shape="circle"
          src={props.userImg}
          size="35"
          margin="0"
        />
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      titleTypographyProps={{
        fontWeight: 600,
      }}
      title={props.username}
    />

    // <Text width="auto" padding_left="16px">yejin</Text>
  );
}

export default Cardheader;
