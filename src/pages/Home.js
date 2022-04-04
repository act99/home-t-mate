import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid as MuiGrid,
} from "@mui/material";
import styled from "@emotion/styled";
import { AiOutlineLock } from "react-icons/ai";
import RoomCardModal from "../containers/LiveNow/RoomCardModal";
import BxSlide from "../assets/bxslidepixa.jpg";
import { useHistory } from "react-router-dom";
import HomeImg from "../components/common/HomeImg";
import { Text } from "../elements";
import { BsSearch } from "react-icons/bs";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import Whatis from "../assets/whatis.png";
import SetImage from "../assets/set.png";
import GroupImage from "../assets/group.png";
import RunningImage from "../assets/running.png";
import StretchImage from "../assets/stretch.png";
import useWindowSize from "../hooks/useWindowSize";
import CreateRoomModal from "../containers/LiveNow/CreateRoomModal";
import Example from "../assets/example.jpg";
import Wifi from "../assets/wifi.png";
import MHomeImg from "../components/common/MHomeImg";
import IntroImg from "../assets/introduce.png";
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // ** 모바일
  const size = useWindowSize();
  const { width, height } = size;

  // ** 스토리 게시글 목록 가져오기
  const _post = useSelector((state) => state.postReducer.list);

  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);

  // ** 모달 생성
  const [clickCard, setClickCard] = React.useState(false);
  // ** 모달 props 전달
  const [modalData, setModalData] = React.useState({
    userCount: null,
    passCheck: false,
    roomId: 0,
    roomName: "",
    content: "",
    member: 0,
    nickname: "",
    profileImg: "",
    workOut: false,
    roomImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  });
  const cardOpenHandler = (
    roomId,
    roomName,
    content,
    roomImg,
    passCheck,
    userCount,
    profileImg,
    nickname,
    workOut
  ) => {
    setClickCard(true);
    setModalData({
      ...modalData,
      roomId: roomId,
      roomName: roomName,
      content: content,
      roomImg: roomImg,
      passCheck: passCheck,
      userCount: userCount,
      profileImg: profileImg,
      nickname: nickname,
      workOut: workOut,
    });
  };
  // ** 검색기능
  const [searchInput, setSearchInput] = React.useState("");
  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (searchInput.length === 0) {
      history.push("/reenterkeyword");
    } else {
      history.push({
        pathname: `/livenow/${searchInput}`,
        state: {
          keyword: searchInput,
        },
      });
    }
  };
  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return submitSearchHandler();
    }
  };

  // ** 방 만들기 모달
  const [createRoomOpen, setCreateRoomOpen] = React.useState(false);

  // ** 스크롤 FadeIn
  const animatedItem = useScrollFadeIn("up", 2, 0);
  const animatedRoom = useScrollFadeIn("up", 4, 0);
  // const animatedItem = useScrollFadeIn("up", 1, 0);
  const animatedStoryTitle = useScrollFadeIn("up", 2, 0);
  const animatedStory = useScrollFadeIn("up", 4, 0);
  const animatedService = useScrollFadeIn("up", 4, 0);
  const animatedAboutTitle = useScrollFadeIn("up", 2, 0);
  const animatedHowToTitle = useScrollFadeIn("up", 2, 0);
  const animatedWhatIs = useScrollFadeIn("center", 3, 0);
  const animatedGroup1 = useScrollFadeIn("center", 3, 0);
  const animatedGroup2 = useScrollFadeIn("center", 3, 0);
  const animatedIntro = useScrollFadeIn("center", 4, 0);
  React.useEffect(() => {
    dispatch(roomCreators.getMainRoomDB());
  }, []);

  if (width < height) {
    return (
      <>
        <Wrap>
          <MBxSlideCon
            width={width}
            onClick={() => history.push("/livenow")}
            src={BxSlide}
          ></MBxSlideCon>
          <Container sx={{ py: 1, width: "100%" }}>
            <>
              <div>
                <MMainTitle width={width}>
                  <h3>친구들과 함께하는 화상 홈트레이닝</h3>
                  <h5>오늘은 홈트 친구들이 어떤 운동을 하고 있을까요?</h5>
                </MMainTitle>
                <form onSubmit={submitSearchHandler}>
                  <MSearchBarWrap width={width}>
                    <MSearchBarInput
                      placeholder="원하시는 방을 검색해주세요"
                      onKeyDown={onEnterPress}
                      value={searchInput}
                      onChange={searchInputHandler}
                    />
                    <MSearchButton>
                      <BsSearch
                        style={{
                          fontSize: "16px",
                          marginLeft: "16px",
                          marginRight: "16px",
                        }}
                      />
                    </MSearchButton>
                  </MSearchBarWrap>
                </form>
              </div>
              <Wrap>
                <Container sx={{ py: 8, width: "100%" }}>
                  <div>
                    <MuiGrid container spacing={2}>
                      {roomList.slice(0, 8).map((item, index) => (
                        <MuiGrid
                          item
                          key={item.roomId + item.name + index}
                          xs={12}
                          sm={6}
                          md={3}
                        >
                          <Card
                            onClick={() => {
                              cardOpenHandler(
                                item.roomId,
                                item.name,
                                item.content,
                                item.roomImg,
                                item.passCheck,
                                item.userCount,
                                item.profileImg,
                                item.nickname,
                                item.workOut
                              );
                            }}
                            sx={{
                              height: "300px",
                              display: "flex",
                              flexDirection: "column",
                              cursor: "pointer",
                              borderRadius: "0px",
                              boxShadow: "none",
                              backgroundColor: "rgb(0,0,0,0)",
                            }}
                          >
                            <CardMedia
                              sx={{
                                maxHeight: "50%",
                                minHeight: "180px",
                              }}
                              component="img"
                              image={item.roomImg}
                              alt="random"
                            />
                            <CardContent
                              sx={{
                                flexGrow: 1,
                                minHeight: "76px",
                                py: 1,
                                px: 1,
                                maxHeight: "30%",
                              }}
                            >
                              <ContentWrap>
                                {item.workOut ? (
                                  <WorkOutWrap>
                                    <h3>운동중</h3>
                                  </WorkOutWrap>
                                ) : (
                                  <RestWrap>
                                    <h3>휴식중</h3>
                                  </RestWrap>
                                )}
                                <TitleWrap>
                                  {item.passCheck === true ? (
                                    <AiOutlineLock
                                      style={{
                                        marginRight: "5px",
                                      }}
                                    />
                                  ) : null}
                                  <TitleText>
                                    {item.name.length > 22
                                      ? item.name.slice(0, 22) + "..."
                                      : item.name}
                                  </TitleText>
                                </TitleWrap>
                                <NickANumWrap>
                                  <MemberNum>
                                    <PersonOutlineIcon
                                      style={{
                                        width: "20px",
                                        marginRight: "4px",
                                      }}
                                    />
                                    <h3>
                                      (
                                      {item.userCount === null
                                        ? 0
                                        : item.userCount}
                                      /5)
                                    </h3>
                                  </MemberNum>
                                  <NickWrap>
                                    <Avatar
                                      sx={{
                                        width: 24,
                                        height: 24,
                                        zIndex: 1,
                                        marginRight: 0.5,
                                      }}
                                      alt="Remy Sharp"
                                      src={
                                        item.profileImg === null ||
                                        item.profileImg === undefined
                                          ? null
                                          : item.profileImg
                                      }
                                    />
                                    <NickText>
                                      {item.nickname === null ||
                                      item.nickname === undefined
                                        ? null
                                        : item.nickname.length === undefined
                                        ? null
                                        : item.nickname.length > 7
                                        ? item.nickname.slice(0, 6) + "..."
                                        : item.nickname}
                                    </NickText>
                                  </NickWrap>
                                </NickANumWrap>
                              </ContentWrap>
                              <RowForDiv></RowForDiv>
                            </CardContent>
                          </Card>
                        </MuiGrid>
                      ))}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                          marginTop: "32px",
                          width: "100%",
                        }}
                      >
                        <Text
                          cursor="pointer"
                          F_size="16px"
                          F_color="#757575"
                          F_family="GmarketSansLight"
                          _onClick={() => history.push("/livenow")}
                        >
                          홈트 방 더보기 +
                        </Text>
                      </div>
                    </MuiGrid>
                  </div>
                </Container>
                <RoomCardModal
                  clickCard={clickCard}
                  setClickCard={setClickCard}
                  data={modalData}
                />
                <MMainTitle>
                  <h3>함께 만들어나가는 운동 스토리</h3>
                  <h5>오늘은 홈트 친구들이 어떤 스토리를 작성했을까요?</h5>
                </MMainTitle>
                <div>
                  <HandleScroll
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "32px",
                    }}
                  >
                    {_post &&
                      _post
                        .slice(0, 5)
                        .map((v, i) => (
                          <MHomeImg key={i} {...v} modal={true}></MHomeImg>
                        ))}
                  </HandleScroll>
                  <HandleScroll
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "16px",
                    }}
                  >
                    {_post &&
                      _post
                        .slice(5, 10)
                        .map((v, i) => (
                          <MHomeImg key={i} {...v} modal={true}></MHomeImg>
                        ))}
                  </HandleScroll>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "end",
                    marginTop: "32px",
                  }}
                >
                  <Text
                    cursor="pointer"
                    F_size="16px"
                    F_color="#757575"
                    F_family="GmarketSansLight"
                    _onClick={() => history.push("/story")}
                  >
                    스토리 더 보기 +
                  </Text>
                </div>
                <div {...animatedAboutTitle}>
                  <Text F_size="24px" F_align="center" margin_top="120px">
                    홈트메이트는 무엇인가요?
                  </Text>
                  <Text F_size="12px" F_align="center" margin_top="24px">
                    홈트메이트는 홈트 친구들과 실시간으로 유튜브 영상을 보며
                    <br />
                    함께 홈트레이닝 하는 공간입니다.
                  </Text>
                </div>
              </Wrap>
            </>
            <MFooterBxSlideCon width={width} src={Whatis}></MFooterBxSlideCon>

            <div {...animatedHowToTitle}>
              <Text F_size="24px" F_align="center" margin_top="80px">
                어떻게 운동하면 좋을까요?
              </Text>
              <Text F_size="12px" F_align="center" margin_top="24px">
                홈트메이트는 아래와 같이 운동하면 좋습니다.
              </Text>
            </div>
            <ImageGroup>
              <img
                alt=""
                src={SetImage}
                width="100%"
                // height="30vw"
                style={{ marginBottom: "12px" }}
              />
              <img
                alt=""
                src={RunningImage}
                width="100%"
                // height="30vw"
                style={{ marginBottom: "12px" }}
              />
              <img
                alt=""
                src={StretchImage}
                width="100%"
                // height="30vw"
                style={{ marginBottom: "12px" }}
              />

              <img
                alt=""
                src={GroupImage}
                width="100%"
                // height="30vw"
                style={{ marginBottom: "36px" }}
              />
            </ImageGroup>
          </Container>
          <RoomCardModal
            clickCard={clickCard}
            setClickCard={setClickCard}
            data={modalData}
          />
        </Wrap>
      </>
    );
  }

  return (
    <>
      <Wrap>
        <BxSlideCon src={BxSlide} width={width}>
          <InsideTextDiv width={width}>
            <h1>
              대한민국 <span>No.1</span>
            </h1>
            <h3>온택트 홈트레이닝 플랫폼</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                // alignItems: "center",
                width: "100%",
              }}
            >
              <button
                onClick={() => {
                  setCreateRoomOpen(true);
                }}
              >
                방 만들기
              </button>

              <button id="howtouse" onClick={() => history.push("/howtouse")}>
                이용 방법
              </button>
            </div>
          </InsideTextDiv>

          {/* <img alt="" src={BxSlide} width="100%" /> */}
        </BxSlideCon>
        <CreateRoomModal
          createRoomOpen={createRoomOpen}
          setCreateRoomOpen={setCreateRoomOpen}
        />

        <Container sx={{ py: 8, width: "100%" }}>
          <>
            <InviteLiveNow width={width} src={Wifi} {...animatedIntro}>
              <div id="invite-text">
                <h1>
                  친구들과 화상으로 <br />
                  홈트레이닝을 해보세요.
                </h1>
                <h3>
                  비대면 시대에 접어든 이 시점,
                  <br /> 친구들 또는 동료들과 만날 기회가 사라지고 있습니다.
                  <br />
                  <br />
                  홈트메이트에서 제공하는 화상채팅기능과
                  <br /> 실시간 영상 공유 기능으로
                  <br />
                  <br />
                  친구들과 함께 유튜브 영상을 시청하며 <br />
                  비대면 홈트레이닝을 즐겨보세요.
                </h3>
              </div>
              <div id="invite-image">
                <img id="wifi" src={Wifi} alt="" />
                <img src={Example} alt="" />
              </div>
            </InviteLiveNow>
            <DescribeUse width={width} {...animatedService}>
              <h3>홈트메이트에서 이런 서비스를 이용하실 수 있습니다.</h3>
              <img src={IntroImg} alt="" />
            </DescribeUse>

            <div {...animatedItem}>
              <MainTitle>
                <h3>친구들과 함께하는 화상 홈트레이닝</h3>
                <h5>오늘은 홈트 친구들이 어떤 운동을 하고 있을까요?</h5>
              </MainTitle>
              <form onSubmit={submitSearchHandler}>
                <SearchBarWrap>
                  <SearchBarInput
                    placeholder="원하시는 방 제목 또는 호스트 이름을 검색해주세요"
                    onKeyDown={onEnterPress}
                    value={searchInput}
                    onChange={searchInputHandler}
                  />
                  <SearchButton>
                    <BsSearch
                      style={{
                        fontSize: "24px",
                        marginLeft: "16px",
                        marginRight: "16px",
                      }}
                    />
                  </SearchButton>
                </SearchBarWrap>
              </form>
            </div>
            <Wrap>
              <Container sx={{ py: 8, width: "100%" }}>
                <div {...animatedRoom}>
                  <MuiGrid container spacing={2}>
                    {roomList.slice(0, 8).map((item, index) => (
                      <MuiGrid
                        item
                        key={item.roomId + item.name + index}
                        xs={12}
                        sm={6}
                        md={3}
                      >
                        <Card
                          onClick={() => {
                            cardOpenHandler(
                              item.roomId,
                              item.name,
                              item.content,
                              item.roomImg,
                              item.passCheck,
                              item.userCount,
                              item.profileImg,
                              item.nickname,
                              item.workOut
                            );
                          }}
                          sx={{
                            height: "300px",
                            display: "flex",
                            flexDirection: "column",
                            cursor: "pointer",
                            borderRadius: "0px",
                            boxShadow: "none",
                            backgroundColor: "rgb(0,0,0,0)",
                          }}
                        >
                          <CardMedia
                            sx={{
                              maxHeight: "50%",
                              minHeight: "180px",
                            }}
                            component="img"
                            image={item.roomImg}
                            alt="random"
                          />
                          <CardContent
                            sx={{
                              flexGrow: 1,
                              minHeight: "76px",
                              py: 1,
                              px: 1,
                              maxHeight: "30%",
                            }}
                          >
                            <ContentWrap>
                              {item.workOut ? (
                                <WorkOutWrap>
                                  <h3>운동중</h3>
                                </WorkOutWrap>
                              ) : (
                                <RestWrap>
                                  <h3>휴식중</h3>
                                </RestWrap>
                              )}
                              <TitleWrap>
                                {item.passCheck === true ? (
                                  <AiOutlineLock
                                    style={{
                                      marginRight: "5px",
                                    }}
                                  />
                                ) : null}
                                <TitleText>
                                  {item.name.length > 22
                                    ? item.name.slice(0, 22) + "..."
                                    : item.name}
                                </TitleText>
                              </TitleWrap>
                              <NickANumWrap>
                                <MemberNum>
                                  <PersonOutlineIcon
                                    style={{
                                      width: "20px",
                                      marginRight: "4px",
                                    }}
                                  />
                                  <h3>
                                    (
                                    {item.userCount === null
                                      ? 0
                                      : item.userCount}
                                    /5)
                                  </h3>
                                </MemberNum>
                                <NickWrap>
                                  <Avatar
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      zIndex: 1,
                                      marginRight: 0.5,
                                    }}
                                    alt="Remy Sharp"
                                    src={
                                      item.profileImg === null ||
                                      item.profileImg === undefined
                                        ? null
                                        : item.profileImg
                                    }
                                  />
                                  <NickText>
                                    {item.nickname === null ||
                                    item.nickname === undefined
                                      ? null
                                      : item.nickname.length === undefined
                                      ? null
                                      : item.nickname.length > 7
                                      ? item.nickname.slice(0, 6) + "..."
                                      : item.nickname}
                                  </NickText>
                                </NickWrap>
                              </NickANumWrap>
                            </ContentWrap>
                            <RowForDiv></RowForDiv>
                          </CardContent>
                        </Card>
                      </MuiGrid>
                    ))}

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                        marginTop: "32px",
                        width: "100%",
                      }}
                    >
                      <Text
                        cursor="pointer"
                        F_size="16px"
                        F_color="#757575"
                        F_family="GmarketSansLight"
                        _onClick={() => history.push("/livenow")}
                      >
                        홈트 방 더보기 +
                      </Text>
                    </div>
                  </MuiGrid>
                </div>
              </Container>
              <RoomCardModal
                clickCard={clickCard}
                setClickCard={setClickCard}
                data={modalData}
              />
              <MainTitle {...animatedStoryTitle}>
                <h3>함께 만들어나가는 운동 스토리</h3>
                <h5>오늘은 홈트 친구들이 어떤 스토리를 작성했을까요?</h5>
              </MainTitle>
              <div {...animatedStory}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {_post &&
                    _post
                      .slice(0, 5)
                      .map((v, i) => (
                        <HomeImg key={i} {...v} modal={true}></HomeImg>
                      ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {_post &&
                    _post
                      .slice(5, 10)
                      .map((v, i) => (
                        <HomeImg key={i} {...v} modal={true}></HomeImg>
                      ))}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  marginTop: "32px",
                }}
              >
                <Text
                  cursor="pointer"
                  F_size="16px"
                  F_color="#757575"
                  F_family="GmarketSansLight"
                  _onClick={() => history.push("/story")}
                >
                  스토리 더 보기 +
                </Text>
              </div>
              <div {...animatedAboutTitle}>
                <Text F_size="42px" F_align="center" margin_top="240px">
                  홈트메이트는 무엇인가요?
                </Text>
                <Text F_size="18px" F_align="center" margin_top="24px">
                  홈트메이트는 홈트 친구들과 실시간으로 유튜브 영상을 보며 함께
                  홈트레이닝 하는 공간입니다.
                </Text>
              </div>
            </Wrap>
          </>
          <FooterBxSlideCon {...animatedWhatIs}>
            <img
              alt=""
              src={Whatis}
              width="100%"
              // height="30vw"
              style={{ margin: "0px" }}
            />
          </FooterBxSlideCon>

          <div {...animatedHowToTitle}>
            <Text F_size="42px" F_align="center" margin_top="80px">
              어떻게 운동하면 좋을까요?
            </Text>
            <Text F_size="18px" F_align="center" margin_top="24px">
              홈트메이트는 홈트 친구들과 실시간으로 유튜브 영상을 보며 함께
              홈트레이닝 하는 공간입니다.
            </Text>
          </div>
          <ImageGroup {...animatedGroup1}>
            <img
              alt=""
              src={SetImage}
              width="45%"
              // height="30vw"
              style={{ margin: "12px" }}
            />
            <img
              alt=""
              src={StretchImage}
              width="45%"
              // height="30vw"
              style={{ margin: "12px" }}
            />
          </ImageGroup>
          <ImageGroup2 {...animatedGroup2}>
            <img
              alt=""
              src={RunningImage}
              width="45%"
              // height="30vw"
              style={{ margin: "12px" }}
            />

            <img
              alt=""
              src={GroupImage}
              width="45%"
              // height="30vw"
              style={{ margin: "12px" }}
            />
          </ImageGroup2>
        </Container>

        <RoomCardModal
          clickCard={clickCard}
          setClickCard={setClickCard}
          data={modalData}
        />
      </Wrap>
    </>
  );
};

const BxSlideCon = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.35}px;
  background-image: url("${(props) => props.src}");
  background-size: 100% auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0px;
  position: relative;
`;

const InsideTextDiv = styled.div`
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  top: 20%;
  left: 23%;
  transform: translate(-20%, -20%);
  position: absolute;
  color: white;
  width: ${(props) => props.width * 0.25}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  h1 {
    font-size: ${(props) => props.width * 0.018}px;
    font-family: "GmarketSansMedium";
    margin: 8px 32px;
    span {
      font-family: "GmarketSansMedium";
      color: greenyellow;
    }
  }
  h3 {
    font-size: ${(props) => props.width * 0.018}px;
    font-family: "GmarketSansMedium";
    margin: 4px 16px 120px 32px;
  }
  button {
    /* margin: auto; */
    margin: 4px 16px 4px 32px;
    width: 172px;
    height: 52px;
    border-radius: 8px;
    border: solid 2px greenyellow;
    background-color: rgb(0, 0, 0, 0);
    font-size: 16px;
    color: greenyellow;
    font-weight: bold;
    z-index: 13000;
    /* font-weight: bold; */
    cursor: pointer;
    transition: 0.3s;
    :hover {
      transition: 0.3s;
      background-color: greenyellow;
      color: black;
    }
  }
  #howtouse {
    /* margin: auto; */
    margin: 4px 16px;
    width: 172px;
    height: 52px;
    border-radius: 8px;
    border: solid 2px white;
    background-color: white;
    font-size: 16px;
    color: black;
    font-weight: bold;
    margin-right: 16px;
    z-index: 13000;
    /* font-weight: bold; */
    cursor: pointer;
    transition: 0.3s;
    :hover {
      transition: 0.3s;
      border: solid 2px greenyellow;
      background-color: greenyellow;
      color: black;
    }
  }
`;

const InviteLiveNow = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.35}px;
  margin: 0px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  #invite-text {
    width: 32%;
    height: ${(props) => props.width * 0.35}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h1 {
      font-family: "GmarketSansMedium";
      font-size: ${(props) => props.width * 0.016}px;
    }
    h3 {
      font-family: "GmarketSansLight";
      font-size: ${(props) => props.width * 0.008}px;
    }
  }
  #invite-image {
    width: 68%;
    position: relative;
    /* background-image: url("${(props) => props.src}");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat; */
    #wifi {
      position: absolute;
      width: 60%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.1;
    }
    img {
      position: absolute;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const DescribeUse = styled.div`
  width: 100%;
  text-align: center;
  margin-top: ${(props) => props.width * 0.08}px;
  margin-bottom: ${(props) => props.width * 0.08}px;
  img {
    width: 100%;
  }
  h3 {
    margin-bottom: ${(props) => props.width * 0.04}px;
    font-family: "GmarketSansMedium";
    font-size: ${(props) => props.width * 0.016}px;
  }
`;

const MBxSlideCon = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.5}px;
  margin: 0px;
  cursor: pointer;
  background-image: url("${(props) => props.src}");
  background-position: left;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MFooterBxSlideCon = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.6}px;
  margin: 0px;
  background-image: url("${(props) => props.src}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const FooterBxSlideCon = styled.div`
  width: 100%;
  padding-bottom: 96px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
`;

const TitleText = styled.h3`
  font-size: 16px;
  font-family: "GmarketSansMedium";
  margin: 0px;
`;

const NickWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const NickText = styled.h3`
  font-size: 12px;
  font-family: "GmarketSansLight";
  margin: 0px;
  margin-top: 4px;
`;

const MemberNum = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h3 {
    font-size: 12px;
    font-family: "GmarketSansLight";
  }
`;

const RowForDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

////////////////////////////////////

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-top: 12px;
`;

const RestWrap = styled.div`
  width: 48px;
  border: solid 1px #587730;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 4px;
    /* margin-top: 4px;
    margin-bottom: 4px; */
    /* margin: 0px; */
    font-size: 12px;
    color: #587730;
  }
`;

const WorkOutWrap = styled.div`
  width: 48px;
  border: solid 1px red;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 4px;
    /* margin: 0px; */
    font-size: 12px;
    color: red;
  }
`;

const NickANumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MainTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 64px;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 64px;

  h3 {
    font-size: 36px;
    font-family: "GmarketSansMedium";
    margin: 0px;
    margin-bottom: 16px;
    color: black;
  }
  h5 {
    font-size: 18px;
    font-family: "GmarketSansLight";
    margin: 0px;
  }
`;

const MMainTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: ${(props) => props.width * 0.1}px;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 64px;

  h3 {
    font-size: ${(props) => props.width * 0.05}px;
    font-family: "GmarketSansMedium";
    margin: 0px;
    margin-bottom: 16px;
  }
  h5 {
    font-size: ${(props) => props.width * 0.03}px;
    font-family: "GmarketSansLight";
    margin: 0px;
  }
`;

const MSearchBarWrap = styled.div`
  width: 100%;
  height: 52px;
  /* background-color: black; */
  border-radius: 24px;
  border: solid 1px #757575;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.width * 0.03}px;
  margin-left: auto;
  margin-right: auto;
`;

const MSearchBarInput = styled.input`
  width: 100%;
  height: 48px;
  border: solid 0px;
  border-right: solid 1px #757575;
  background-color: rgb(0, 0, 0, 0);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding-left: 16px;
  font-size: 12px;
  font-family: "GmarketSansLight";

  :focus {
    outline: none;
    border: solid 0px #757575;
  }
`;

const MSearchButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: solid 0px;
  cursor: pointer;
`;

const SearchBarWrap = styled.div`
  width: 70%;
  height: 52px;
  /* background-color: black; */
  border-radius: 24px;
  border: solid 1px #757575;
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 48px;
  border: solid 0px;
  border-right: solid 1px #757575;
  background-color: rgb(0, 0, 0, 0);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding-left: 16px;
  font-size: 16px;
  font-family: "GmarketSansLight";

  :focus {
    outline: none;
    border: solid 0px #757575;
  }
`;

const SearchButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: solid 0px;
  cursor: pointer;
`;

const ImageGroup = styled.div`
  width: 100%;
  margin-top: 80px;
`;

const ImageGroup2 = styled.div`
  width: 100%;
  margin-top: 80px;
  margin-bottom: 160px;
`;

const HandleScroll = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

export default Home;
