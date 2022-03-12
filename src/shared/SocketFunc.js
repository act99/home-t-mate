export const sendingMessage = (ws, setSendMessage, sendMessage, token) => {
  // setSendMessage({ ...sendMessage, type: "TALK" });
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...sendMessage }),
    setSendMessage({ ...sendMessage, message: "" })
  );
};

export const sendYoutubeUrl = (ws, url, token, urlIntput) => {
  console.log(urlIntput);
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...urlIntput })
  );
};

// 메시지 보내기 핸들러
// const sendingMessage = () => {
//   setSendMessage({ ...sendMessage, type: "TALK" });
//   ws.send(
//     `/pub/chat/message`,
//     { Authorization: token },
//     JSON.stringify({ ...sendMessage }),
//     setSendMessage({ ...sendMessage, message: "" })
//   );
// };
