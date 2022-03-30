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
  Grid,
} from "@mui/material";
import styled from "@emotion/styled";
import { AiOutlineLock } from "react-icons/ai";
import RoomCardModal from "../containers/RoomCardModal";
import { BsSearch } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import InfinityScroll from "../shared/InfinityScroll";
import useScrollFadeIn from "../hooks/useScrollFadeIn";
import LoadingImage from "../assets/loading_image.png";
import useWindowSize from "../hooks/useWindowSize";

const LiveNow = () => {
  const size = useWindowSize();
  const { width, height } = size;
  const dispatch = useDispatch();
  const history = useHistory();
  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);
  const is_loading = useSelector((state) => state.roomReducer.is_loading);
  const paging = useSelector((state) => state.roomReducer.paging);
  const user = useSelector((state) => state.userReducer.user);
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

  // ** 검색기능 구현
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
  // const [paging, setPaging] = React.useState(1);
  const handleNext = () => {
    // setPaging(paging + 1);
    dispatch(roomCreators.getRoomDB());
  };
  const animatedItem = useScrollFadeIn("up", 2, 0);

  React.useEffect(() => {
    if (user.is_login === true) {
      dispatch(roomCreators.getRoomDB());
    }

    return () => {
      if (window.location.pathname !== "/livenow") {
        dispatch(roomCreators.clearRoom([]));
      }
    };
  }, []);
  if (width < height) {
    if (user.is_login === false) {
      return (
        <>
          <Wrap>
            <Container sx={{ py: 16, width: "100%" }}>
              <div {...animatedItem}>
                <div
                  style={{
                    margin: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <img alt="" src={LoadingImage} width={`${width * 0.5}px`} />
                </div>
                <MMainTitle width={width}>
                  <br />
                  <h3>로그인 후 이용해주세요.</h3>
                  <h5>
                    <br />
                    로그인을 하시면 <br />
                    다양한 홈트메이트 서비스를 이용하실 수 있습니다.
                  </h5>
                </MMainTitle>
              </div>
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
        <InfinityScroll callNext={handleNext} loading={is_loading}>
          <Wrap>
            <Container sx={{ py: 8, width: "100%" }}>
              <div {...animatedItem}>
                <MMainTitle width={width}>
                  <h3>친구들과 함께하는 화상 홈트레이닝</h3>
                  <br />
                  <h5>오늘도 여러분의 운동을 응원합니다</h5>
                </MMainTitle>
                <form onSubmit={submitSearchHandler}>
                  <MSearchBarWrap width={width}>
                    <MSearchBarInput
                      width={width}
                      placeholder="원하시는 방을 검색해주세요"
                      onKeyDown={onEnterPress}
                      value={searchInput}
                      onChange={searchInputHandler}
                    />
                    <MSearchButton width={width}>
                      <BsSearch
                        style={{
                          fontSize: `${width * 0.045}px`,
                          marginLeft: `${width * 0.02}px`,
                          marginRight: `${width * 0.04}px`,
                          marginTop: "auto",
                          marginBottom: "auto",
                        }}
                      />
                    </MSearchButton>
                  </MSearchBarWrap>
                </form>
              </div>
              <Grid container spacing={2}>
                {roomList.map((item, index) => (
                  <Grid
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
                                style={{ width: "20px", marginRight: "4px" }}
                              />
                              <h3>
                                ({item.userCount === null ? 0 : item.userCount}
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
                  </Grid>
                ))}
              </Grid>
            </Container>
            <RoomCardModal
              clickCard={clickCard}
              setClickCard={setClickCard}
              data={modalData}
            />
          </Wrap>
        </InfinityScroll>
      </>
    );
  }
  if (user.is_login === false) {
    return (
      <>
        <Wrap>
          <Container sx={{ py: 16, width: "100%" }}>
            <div {...animatedItem}>
              <div
                style={{
                  margin: "80px auto 16px auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <img alt="" src={LoadingImage} width="300px" />
              </div>
              <MainTitle>
                <h3>로그인 후 이용해주세요.</h3>
                <h5>
                  로그인을 하시면 다양한 홈트메이트 서비스를 이용하실 수
                  있습니다.
                </h5>
              </MainTitle>
            </div>
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
      <InfinityScroll callNext={handleNext} loading={is_loading}>
        <Wrap>
          <Container sx={{ py: 16, width: "100%" }}>
            <div {...animatedItem}>
              <MainTitle>
                <h3>친구들과 함께하는 화상 홈트레이닝</h3>
                <h5>오늘도 여러분의 운동을 응원합니다</h5>
              </MainTitle>
              <form onSubmit={submitSearchHandler}>
                <SearchBarWrap>
                  <SearchBarInput
                    placeholder="원하시는 방을 검색해주세요"
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
            <Grid container spacing={2}>
              {roomList.map((item, index) => (
                <Grid
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
                              style={{ width: "20px", marginRight: "4px" }}
                            />
                            <h3>
                              ({item.userCount === null ? 0 : item.userCount}/5)
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
                </Grid>
              ))}
            </Grid>
          </Container>
          <RoomCardModal
            clickCard={clickCard}
            setClickCard={setClickCard}
            data={modalData}
          />
        </Wrap>
      </InfinityScroll>
    </>
  );
};

const MMainTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: ${(props) => props.width * 0.1}px;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: #2f5b27;
  h3 {
    font-size: ${(props) => props.width * 0.05}px;
    font-family: "GmarketSansMedium";
    margin: 0px;
  }
  h5 {
    font-size: ${(props) => props.width * 0.04}px;
    font-family: "GmarketSansLight";
    margin: 0px;
  }
`;

const MSearchBarWrap = styled.div`
  width: 100%;
  height: ${(props) => props.width * 0.1}px;
  /* background-color: black; */
  border-radius: 24px;
  border: solid 1px #e2e2e2;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.width * 0.2}px;
  margin-left: auto;
  margin-right: auto;
`;

const MSearchBarInput = styled.input`
  width: 100%;
  height: ${(props) => props.width * 0.1}px;
  border: solid 0px;
  border-right: solid 1px #e2e2e2;
  background-color: rgb(0, 0, 0, 0);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding-left: 16px;
  font-size: ${(props) => props.width * 0.035}px;
  font-family: "GmarketSansLight";
  :focus {
    outline: none;
    border: solid 2px #e2e2e2;
  }
`;

const MSearchButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: solid 0px;
  cursor: pointer;
`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const MainTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 64px;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: #2f5b27;
  h3 {
    font-size: 32px;
    font-family: "GmarketSansMedium";
    margin: 0px;
    margin-bottom: 8px;
  }
  h5 {
    font-size: 18px;
    font-family: "GmarketSansLight";
    margin: 0px;
  }
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

const SearchBarWrap = styled.div`
  width: 70%;
  height: 52px;
  /* background-color: black; */
  border-radius: 24px;
  border: solid 1px #e2e2e2;
  display: flex;
  align-items: center;
  margin-bottom: 96px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 48px;
  border: solid 0px;
  border-right: solid 1px #e2e2e2;
  background-color: rgb(0, 0, 0, 0);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
  padding-left: 16px;
  font-size: 16px;
  font-family: "GmarketSansLight";
  :focus {
    outline: none;
    border: solid 2px #e2e2e2;
  }
`;

const SearchButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: solid 0px;
  cursor: pointer;
`;

export default LiveNow;
