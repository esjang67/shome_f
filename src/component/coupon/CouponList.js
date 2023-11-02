import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import { Box, Card, CardContent, Typography } from '@mui/material';

// coupon, couponAdmin에서 공용으로 사용
function CouponList({ grade, userid, change }){
  
  let startdate = new Date() // new Date("2023-10-01 00:00:00");
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    
    if(grade === "P"){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all`, 
      {params: {"startDate": stdate, "endDate": eddate}})
      .then(response => {
        // console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all/user`, 
      {params: {"userid": userid, "startDate": stdate, "endDate": eddate}})
      .then(response => {
        // console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  useEffect(()=> {
    getList();
  }, [isLoading, change])
  
  if(isLoading)
    return(<>...</>)
  
  return (
    <div className="CouponList">
      <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>

      <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
        {
          list.map((data) => {
            return (
              <Card variant="outlined" sx={{ width:"45%", ml:1, mb:1, pt:1, pb:1 }} key={data.id} > 
                <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>{data.basedate}</Typography>
                <Typography sx={{ fontSize: 12 }}>[{data.type}]</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{data.content}</Typography>
                {grade === 'P'?
                <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} color={data.user.name === "민찬"? "primary":"error"} >{data.user.name}</Typography> : ''}
                <Typography sx={{ fontSize: 12 }}>쿠폰시간 : {data.playtime}</Typography>
              </Card>
            );
          })
        }
      </Box>

    </div>
    )
}

export default CouponList;