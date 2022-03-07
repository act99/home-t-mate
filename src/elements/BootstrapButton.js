import { Button } from "@mui/material";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/styles";

export const CreateRoomButton = styled(Button)({
  borderRadius: "10px",
  boxShadow: "none",
  textTransform: "none",
  fontWeight: "bold",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#ffffff",
  borderColor: "#FF9234",
  color: "#FF9234",
  marginRight: "15px",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#FF9234",
    borderColor: "#FF9234",
    color: "#ffffff",
    fontWeight: "bold",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#FF9234",
    borderColor: "#FF9234",
    color: "#ffffff",
    fontWeight: "bold",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,125,5,.5)",
  },
});
