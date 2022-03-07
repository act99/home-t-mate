import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <h3>홈입니다.</h3>
      <button
        className="myinfo_user_name"
        onClick={() => {
          history.push("/login");
        }}
      >
        <span>로그인 후 전체 기능을 이용해보세요!</span>
      </button>
      <button
        onClick={() => {
          history.push("/rooms");
          history.go(0);
        }}
      >
        방 만들기
      </button>
      <button
        onClick={() => {
          history.push("/mypage");
        }}
      >
        마이페이지
      </button>
    </div>
  );
};

export default Home;
