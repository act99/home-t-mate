import { makeStyles } from "@mui/styles";

const makeChattingStyle = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "30%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "500px",
    overflowY: "auto",
    backgroundColor: "white",
  },
});

const videoStyle = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "10px",
  },
}));

const useStyle = {
  makeChattingStyle,
  videoStyle,
};

export default useStyle;
