import React from 'react'
import { Grid, Image, Text} from "../elements";
import moment from 'moment';

function MypagePost(props) {
    console.log('mypagepost props확인용', props);

    const time = moment(props.createdAt).format('YYYY.MM.DD a h:mm')

  return (
    <Grid margin_top="24px">
    <Grid is_flex>
      <Grid>
        <input
          type="checkbox"
          id="horns"
          name="horns"
          style={{
            width: "24px",
            height: "24px",
            // marginRight: "48px",
          }}
        />
      </Grid>

      <Grid B_radius="20px" margin_left="48px" is_flex width="580px" height="160px" box_shadow="2px 5px 12px 6px rgba(0,0,0,0.05)">
        <Image
          margin="0px 30px 0px 0px"
          width="160px"
          height="160px"
          border_radius="20px 0px 0px 20px"
          src={props.photoResponseDto[0].postImg}
        ></Image>

        <Grid
          width="360px"
          hegith="112px"
          B_radius="5px"
          Border="2px solid #757575"
        >
          <Text F_size="16px">{props.content}</Text>
        </Grid>
      </Grid>

      <Grid>
        <Text F_size="18px" F_color="#555555" margin_left="92px">{time}에 작성됨</Text>
      </Grid>
    </Grid>
  </Grid>
  )
}

export default MypagePost