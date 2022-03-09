//import Library
import React from "react"

import {CardHeader,IconButton} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//import Actions


//import elements
import Image from "../elements/Image";

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

        titleTypographyProps={{
          fontWeight: 600,
        }}
          title="yejin" 

            action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }

        />

        // <Text width="auto" padding_left="16px">yejin</Text>

    );

}


export default Cardheader;

