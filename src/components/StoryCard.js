import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
// import style from "styled-components";

import Cardheader from '../components/Cardheader';
import LikeChat from './LikeChat';
import Img from '../components/Img';
import CardContent from '@mui/material/CardContent';

import '../App.css';

import {Typography} from '@mui/material';


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

        <CardContent>
            <Typography variant="body2" color="black" align="justify">
            <strong>yejin</strong> css...🔥🔥🔥🔥 안녕
            말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 말을 길게 쳐보자 
            </Typography>
            <Typography variant="body2" color="text.secondary" align="justify">1일전</Typography>
        </CardContent>

      </Card>
      </div>
  );
}