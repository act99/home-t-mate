import React from "react";
import {Grid,Image,Button,Text} from "../elements";

function Write(props) {

    const fileInput = React.useRef();
    const contents = React.useRef();

    
    const [fileSelected,setFileSelected] = React.useState(false);
    const [preview,setPreview] = React.useState([]);
    const [tempFile,setTempFile] = React.useState([]);

    const selectFile =(e) =>{
        
        
        
        const file = fileInput.current.files[0];
        const files = fileInput.current.files;
        setTempFile([...tempFile,files]);

        let tempData= [];
        const formData = new FormData();
        
        
        for(let i=0;i<files.length;i++){
            formData.append("postImg",files[i]);
            const reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.addEventListener("load",function () {
                tempData.push(reader.result);
                if(tempData.length===files.length){
                    setPreview([...preview,...tempData])
                    setFileSelected(true);
                    console.log(formData);
                }
            }
        )
    }
}

  return (
    <>
    <Grid >
                        <Grid B_bottom="1px solid #dbdbdb" is_flex min_width="348px" max_width="min(calc(100vw - 372px),855px)" width="751px" justify_content="space-between" height="42px" BG_c="">
                            <Grid width="42px" height="42px" B_top_left_radius="15px" BG_c="white"/>
                            <Grid is_flex width="100%" height="42px" BG_c="white" justify_content="center" vertical_align= "middle" align_items="center"><Text vertical_align= "middle">새 게시물 만들기</Text></Grid>
                            <Grid width="42px" height="42px" B_top_right_radius="15px" BG_c="white"/>
                        </Grid>
                    <Grid
                    is_flex
                    flex_direction="column"
                    justify_content="center"
                    align_items="center"
                    min_width="348px"
                    min_height="348px"
                    max_width="min(calc(100vw - 372px),855px)"
                    max_height="min(calc(100vw - 372px),855px)"
                    width="751px"
                    height="calc(100vmin - 219px)"
                    B_bottom_left_radius="15px" B_bottom_right_radius="15px"
                    BG_c="white">
                        <Image width="100px" height="80px" src="/addPost.jpg"/>
                        <Text margin="20px" F_size="22px">버튼을 눌러 사진을 추가하세요</Text>
                        <Button _onClick={()=>{fileInput.current.click()}} font_weight="600" font_color="white" B_radius="5px" border="0px solid #0095f6" BG_color="#0095f6" width="120px" height="30px" >컴퓨터에서 선택</Button>
                        <input ref={fileInput} onChange={selectFile} type="file" multiple style={{display:'none'}}/>
                    </Grid>
                    </Grid>
                    
    </>
  );
}

export default Write;