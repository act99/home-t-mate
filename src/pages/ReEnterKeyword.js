import React from "react";
import { useDispatch } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import { Container, Grid } from "@mui/material";
import styled from "@emotion/styled";

import { BsSearch } from "react-icons/bs";
import NoSearchedRoom from "../containers/NoSearchedRoom";
import { useHistory } from "react-router-dom";
const ReEnterKeyword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // ** 방 생성 버튼

  // ** 검색기능 구현
  const [researchInput, setResearchInput] = React.useState("");

  const submitSearchHandler = (e) => {
    e.preventDefault();
    if (researchInput.length === 0) {
      history.push("/reenterkeyword");
    } else {
      history.push({
        pathname: `/livenow/${researchInput}`,
        state: {
          keyword: researchInput,
        },
      });
    }
  };

  const searchInputHandler = (e) => {
    setResearchInput(e.target.value);
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      return submitSearchHandler();
    }
  };
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <Wrap>
        <Container sx={{ py: 16, width: "100%" }}>
          <form onSubmit={submitSearchHandler}>
            <SearchBarWrap>
              <SearchBarInput
                placeholder="원하시는 방 제목을 검색해주세요"
                onKeyDown={onEnterPress}
                value={researchInput}
                onChange={searchInputHandler}
              />
              <BsSearch
                style={{
                  fontSize: "24px",
                  marginLeft: "16px",
                  marginRight: "16px",
                }}
              />
            </SearchBarWrap>
          </form>
          <Grid container spacing={2}>
            <NoSearchedRoom />
          </Grid>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
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

const SearchBarWrap = styled.div`
  width: 100%;
  height: 52px;
  /* background-color: black; */
  border-radius: 8px;
  border: solid 1px #e2e2e2;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 48px;
  border: solid 0px;
  border-right: solid 1px #e2e2e2;
  background-color: rgb(0, 0, 0, 0);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding-left: 16px;
  font-size: 18px;
  font-family: "GmarketSansLight";

  :focus {
    outline: none;
    border: solid 2px #e2e2e2;
  }
`;

export default ReEnterKeyword;
