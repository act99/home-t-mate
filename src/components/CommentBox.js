//import Library
import React from "react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { Button, Typography, Box, Modal } from "@mui/material";

//import Actions

//import elements
import Grid from "../elements/Grid";

//import Icon

// impot Component
//import Actions

//import axios

export default function CommentBox(props) {
  return (
    <Grid is_flex margin_left="16px" justify_content="space-between">
      <SentimentSatisfiedAltIcon className="SmileButton" fontSize="medium" />
      <input className="CommentInputBox" placeholder="댓글 달기..."></input>
      <Button variant="text">게시</Button>
    </Grid>
  );
}
