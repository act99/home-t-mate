import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import { useHistory } from "react-router-dom";

const Rooms = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // ** 방 생성 버튼
  const createRoomRef = React.useRef();
  const createRoomHandler = () => {
    const name = createRoomRef.current.value;
    dispatch(roomCreators.createRoomDB(name));
  };
  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);
  React.useEffect(() => {
    // console.log(token);
    // stompClient.connect({ authorization: token }, () => {
    //   console.log("hi");
    //   // stompClient.subscribe()
    // });
    dispatch(roomCreators.getRoomDB());
  }, []);

  return (
    <div>
      <h3>Rooms</h3>
      <input type="text" ref={createRoomRef} />
      <button onClick={createRoomHandler}>방 생성</button>
      <ul>
        {roomList.map((item, index) => (
          <li
            key={item.roomId + index}
            onClick={() => {
              history.push({
                pathname: `/rooms/${item.roomId}`,
                state: { roomId: item.roomId, roomName: item.name },
              });
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rooms;
