import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as roomCreators } from "../redux/modules/roomReducer";
import { useHistory } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const LiveNow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // ** 방 생성 버튼
  const roomList = useSelector((state) => state.roomReducer.room_list);
  const dummyImage =
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e";
  React.useEffect(() => {
    dispatch(roomCreators.getRoomDB());
  }, []);
  return (
    <>
      <ImageList sx={{ width: "100%", height: "100%" }} cols={4}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ mx: 3 }}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>

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
      <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
        {/* <ImageListItem key="Subheader" cols={3}>
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem> */}
        {roomList.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${dummyImage}?w=248&fit=crop&auto=format`}
              srcSet={`${dummyImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.name}
              subtitle={item.content}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.name}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];

export default LiveNow;
