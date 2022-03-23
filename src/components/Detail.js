import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DetailCardheader from "./DetailCardheader";
import LikeComment from "./LikeComment";
import CommentContents from "./CommentContents";
import Grid from "../elements/Grid";
import Img from "./Img";
import CommentBox from "./CommentBox";
// import CardText from "./CardText";
import { useDispatch, useSelector } from "react-redux";
import { borderRadius } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { actionCreators as commentActions } from "../redux/modules/commentReducer";
import { BsChat } from "react-icons/bs";
import { Text, Button } from "../elements";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { actionCreators as postAcions } from "../redux/modules/postReducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1345,
  height: 800,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  padding: 0,
};

export default function Detail(props) {
  const dispatch = useDispatch();
  const { commentUserDto } = props;
  // id={props.id}
  console.log("Detail props용", props); //post id값, comment어쩌구

  const _user = useSelector((state) => state.userReducer.user);
  const _post = useSelector((state) => state.postReducer.list);
  const thisPost = _post.reduce((x, v, i) => (v.id === props.id ? v : x), "");
  const thisPostPhoto = thisPost.photoResponseDto;

  console.log("postReducer확인용", _post);
  console.log("thispost확인용", thisPost);

  const commentState = useSelector((state) => state.commentReducer.list)[
    `${props.id}`
  ];

  console.log('commentState', commentState);

  React.useEffect(() => {

    dispatch(commentActions.getCommentDB(props.id));
  }, [commentState]);

  // const [like, setLike] = React.useState(false);

  // const likePost = () => {
  //   if (!_user.is_login) {
  //     alert("로그인을 해주세요");
  //     return;
  //   } else {
  //     dispatch(postAcions.likePostDB(thisPost.id, _user.id));
  //     if (like === true) {
  //       setLike(false);
  //     } else {
  //       setLike(true);
  //     }
  //   }
  // };



  // React.useEffect(() => {
  //   if (props.likeUserDto && props.likeUserDto.length > 0) {
  //     console.log(props.likeUserDto[0]);
  //   }
  // }, [props.likeUserDto]);

  return (
    <Box sx={style}>
      <div style={{ width: "800px" }}>
        <Carousel
          showThumbs={false}
          infiniteLoop={true}
          height={props.size}
          width={props.size}
        >
          {thisPostPhoto &&
            thisPostPhoto.map((v, i) => (
              <Img key={i} {...v} size="800px" border="20px" />
            ))}
        </Carousel>
      </div>

      <Grid width="545px">
        {/* id={props.id} username={props.nickname} userImg={props.userImgUrl} */}
        <DetailCardheader
          id={thisPost.id}
          username={thisPost.nickname}
          userImg={thisPost.userImg}
        />
        <div
          className="commentlist"
          style={{ height: "640px", overflow: "auto" }}
        >
          {/* 글 내용 */}
          <Typography
            variant="body2"
            color="black"
            align="justify"
            marginLeft={"16px"}
            marginBottom="13px"
          >
            {thisPost.content}
          </Typography>

          {/* 댓글몇개인지 보이기 */}
          <Grid is_flex B_top="2px solid #D3D3D3" margin_bottom="10px">
          <BsChat size="24" style={{margin:"15px 10px 17px 16px"}}/>
          <Text>총 {commentState? 0 : commentState.length}개의 댓글</Text>
          {/* <Text>총 {commentUserDto.length}개의 댓글</Text> */}
          </Grid>

          {/* 댓글 보이기 */}
            {commentState &&
              commentState.map((v, i) => (
                <CommentContents key={i} {...v} id={props.id} />
              ))}
        </div>

        {/* 댓글작성부분 */}
        <Grid position="absolute" bottom="0px" width="545px">
          <Grid is_flex>


{/* 
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
          </Button> */}





          <LikeComment id={props.id} modal={false} none="none" default="default" />
          
          </Grid>
          <CommentBox id={props.id} />
        </Grid>
      </Grid>
    </Box>
  );
}
