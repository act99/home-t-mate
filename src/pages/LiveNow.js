import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import { useHistory } from "react-router-dom";

const LiveNow = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);
  React.useEffect(() => {
    dispatch(roomCreators.getRoomDB());
  }, []);
  return (
    <div>
      <h3>Rooms</h3>
      <ul>
        {roomList.map((item, index) => (
          <li
            key={item.roomId + index}
            onClick={() => {
              history.push({
                pathname: `/checkvideo`,
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

export default LiveNow;
