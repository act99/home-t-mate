//import Library
import React from "react"

import {CardHeader,IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//import Actions


//import elements
import { Image } from "../elements" 

function Cardheader(props) {
    
    return (
         <CardHeader sx={{ width:40 }}
          avatar={
            <Image
            shape="circle"
            src ="https://3.bp.blogspot.com/-x4gLW4b7sB4/XHE3SYQbIpI/AAAAAAAA4nM/SFGGsj7HgyELAWCFQfanqqQwwBJfg30YACLcBGAs/s1600/01.jpg"
            size = "35"
            margin = "0"
            />
          }

          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }

        titleTypographyProps={{
          fontWeight: 600,
        }}
          title="yejin" 

        />

        // <Text width="auto" padding_left="16px">yejin</Text>

    );

}


export default Cardheader;

