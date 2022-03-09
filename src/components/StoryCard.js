import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
// import style from "styled-components";

import Cardheader from '../components/Cardheader';
import LikeChat from './LikeChat';
import Img from './Img';

import '../App.css';


export default function MainCard(props) {
  // let navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div className='mainbox'>
      <Card sx={{ maxWidth: 600, margin: "auto",}}>

        <Cardheader/>

        <Img setHeight={"600px"}/>

        <LikeChat modal={true}/>

      </Card>
      </div>
  );
}