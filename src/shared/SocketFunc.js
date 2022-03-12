export const sendingMessage = (ws, setSendMessage, sendMessage, token) => {
  // setSendMessage({ ...sendMessage, type: "TALK" });
  console.log(sendMessage);
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...sendMessage }),
    setSendMessage({ ...sendMessage, message: "" })
  );
};

export const sendYoutubeUrl = (ws, token, urlIntput) => {
  console.log(urlIntput);
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...urlIntput })
  );
};

export const sendYoutubeOn = (ws, token, youtubeOn) => {
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...youtubeOn })
  );
};

export const sendYoutubeOff = (ws, token, youtubeOff) => {
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...youtubeOff })
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
