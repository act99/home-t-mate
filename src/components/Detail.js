import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cardheader from "./Cardheader";
import LikeComment from "./LikeComment";
import CommentContents from "./CommentContents";
import Grid from "../elements/Grid";
import Img from "./Img";
import CommentBox from "./CommentBox";
import CardText from "./CardText";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: 740,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  display: "flex",
  padding: 0,
};

export default function Detail(props) {
  return (
    <div>
      <Box sx={style}>
        <div style={{ width: "800px", height: "450px" }}>
          <Img img="true" setHeight={"740px"} />
        </div>

        <Grid width="400px">

        <Cardheader>
            
        </Cardheader>

        <Typography variant="body2" color="black" align="justify" marginLeft={"16px"} >
          css...🔥🔥🔥🔥 안녕 말을 길게 쳐보자 말을 길게
          쳐보자말을 길게 쳐보자말을 길게 쳐보자말을 길게 쳐보자말을 길게
          쳐보자말을 길게 쳐보자말을 길게 쳐보자
        </Typography>

          <Grid position="absolute" bottom="0px" width="400px">
            <hr></hr>
            <LikeComment modal={false} />
            <CommentBox />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
