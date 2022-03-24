import React from "react";
import { Grid, Image, Text } from "../elements";
import moment from "moment";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Detail from "../components/Detail.js";
import "../App.css";

function MypagePost(props) {
  console.log("mypagepost props확인용", props);

  const time = moment(props.createdAt).format("YYYY.MM.DD a h:mm");

  //detail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);

  return (
    <Grid margin_top="24px">
      <Grid is_flex>
        <Grid>
          <input
          onClick={()=> props.setData(props.id)}
            type="checkbox"
            id="horns"
            name="horns"
            value={props.id}
            style={{
              width: "24px",
              height: "24px",
              // marginRight: "48px",
            }}
          />
        </Grid>

        <Grid
          B_radius="20px"
          margin_left="48px"
          is_flex
          width="580px"
          height="160px"
          box_shadow="2px 5px 12px 6px rgba(0,0,0,0.05)"
          _onClick={handleOpen}
          cursor="pointer"
        >
          <Image
            margin="0px 30px 0px 0px"
            width="160px"
            height="160px"
            border_radius="20px 0px 0px 20px"
            src={props.photoResponseDto[0].postImg}
          ></Image>

          <Grid
            width="360px"
            hegith="112px"
            B_radius="5px"
            Border="2px solid #757575"
            padding="24px"
          >
            <div className="overFlowTextTwo" style={{cursor:"pointer"}}>{props.content}</div>
          </Grid>
        </Grid>

        <Grid>
          <Text F_size="18px" F_color="#555555" margin_left="92px">
            {time}에 작성됨
          </Text>
        </Grid>
      </Grid>

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
    </Grid>
  );
}

export default MypagePost;
