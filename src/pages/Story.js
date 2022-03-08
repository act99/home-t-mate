//import Library
import React from "react"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import MainCard from "../components/MainCard";


//import Actions
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";


//import elements
import { Button, Grid, Input, Image, Text } from "../elements" 

//import Icon


// impot Component
import Header from "../components/Header";


//import axios
import instance from "../shared/Request";


import NavBar from "../components/NavBar";
import StoryCard from "../components/StoryCard";


function Main(props) {
    const dispatch = useDispatch();
    const _user = useSelector(state=>state.user);
    const _post = useSelector(state=>state.post);

    return (
    <Grid BG_c="#fafafa">
        <NavBar/>
        {/* map으로 storycard생성예정 */}
        <StoryCard/>
        
    </Grid>
    );

}


export default Main;