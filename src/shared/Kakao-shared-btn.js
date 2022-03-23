import React, { useEffect } from "react";
import KaKaoShare from "../assets/kakaoShare.png";
const KakaoShareButton = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);

  const shareKakao = () => {
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "홈트메이트",
        description: "모두 함께 즐기는 화상 홈트레이닝",
        imageUrl:
          "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FPCd67%2Fbtrv11WGqlH%2FdCurSwxN29ZL2D19yb2FZ1%2Fimg.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <div className="kakao-share-button">
      {/* Kakao share button */}
      <button
        onClick={shareKakao}
        id="kakao-link-btn"
        style={{
          border: "solid 0px",
          backgroundColor: "white",
          cursor: "pointer",
        }}
      >
        <img
          src={KaKaoShare}
          alt="kakao-share-icon"
          style={{ width: "48px", height: "48px" }}
        />
      </button>
    </div>
  );
};

export default KakaoShareButton;
