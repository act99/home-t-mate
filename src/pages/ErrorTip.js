import React from "react";
import styled from "@emotion/styled";

const ErrorTip = () => {
  const scrollRef = React.useRef();
  React.useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    return () => {};
  }, []);
  return (
    <>
      <div ref={scrollRef}></div>
      <Wrap>오류제보</Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 80%;
  height: 200px;
  margin: 0px;
  margin-top: 24px;
  margin-right: auto;
  margin-left: auto;
`;

export default ErrorTip;
