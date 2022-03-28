import React from "react";
import { Grid, Image, Text } from "../elements";
import moment from "moment";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Detail from "../components/Detail.js";
import "../App.css";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/postReducer";
function MypagePost(props) {
  const dispatch = useDispatch();
  const time = moment(props.createdAt).format("YYYY.MM.DD a h:mm");
  //detail modal open,close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    return props.modal ? setOpen(true) : setOpen(false);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteData = (e) => {
    const filtering = props.delData.filter(
      (item) => item.postId === e.target.value * 1
    );
    if (filtering.length === 0) {
      props.setDelData([...props.delData, { postId: e.target.value }]);
    } else {
      props.setDelData([
        ...props.delData.filter((item) => item.postId !== e.target.value),
      ]);
    }
  };
  const handleDelete = (id) => {
    dispatch(postActions.deletePostDB(id));
  };
  return (
    <Grid margin_top="24px">
      <Grid is_flex>
        <Grid
          B_radius="20px"
          margin_left="48px"
          is_flex
          width="480px"
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
            width="280px"
            hegith="112px"
            B_radius="5px"
            Border="2px solid #757575"
            padding="24px"
          >
            <div className="overFlowTextTwo" style={{ cursor: "pointer" }}>
              {props.content.length > 25
                ? props.content.slice(0, 25) + "..."
                : props.content}
            </div>
          </Grid>
        </Grid>
        <Grid>
          <Text F_size="18px" F_color="#555555" margin_left="92px">
            {time}에 작성됨
          </Text>
        </Grid>
        <Grid>
          <DeleteButton onClick={() => handleDelete(props.id)}>
            <h3>삭제</h3>
          </DeleteButton>
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

const DeleteButton = styled.div`
  width: 100%;
  height: auto;
  margin-left: 92px;
  text-align: center;
  cursor: pointer;
  h3 {
    font-size: 18px;
    color: #555555;
  }
`;
export default MypagePost;
