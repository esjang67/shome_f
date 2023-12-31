import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// coupon, couponAdmin에서 공용으로 사용
function CouponList({ grade, userid, change, kids }){
  
  let startdate = new Date() // new Date("2023-10-01 00:00:00");
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    
    let std = getFormettedDate(new Date(stdate));
    let edd = getFormettedDate(new Date(eddate));

    if(grade === "P"){
      // axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all`, 
      // {params: {"startDate": std, "endDate": edd}})
      axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all/user`, 
      {params: {"userid": kids, "startDate": std, "endDate": edd}})
      .then(response => {
        // console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all/user`, 
      {params: {"userid": userid, "startDate": std, "endDate": edd}})
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
  }, [isLoading, change, kids])
  
  if(isLoading)
    return(<>...</>)
  
  return (
    <div className="CouponList">
      <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>

      <Grid container spacing={1}>
        {
          list.map((data) => {
            return (
              <Grid item xs={6} md={3}>
                <Card variant="outlined" key={data.id} 
                      sx={{ width:"95%", m:'auto', mb:1, pt:1, pb:1, border: '1px dashed grey' }} > 
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>{data.basedate}</Typography>
                  <Typography sx={{ fontSize: 12 }}>[{data.type}]</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{data.content}</Typography>
                  {grade === 'P'?
                    <Typography sx={{ fontSize: 14, fontWeight: 'bold' }} 
                                color={data.username === "민찬"? "primary":"error"} >{data.username}</Typography> : ''}
                  <Typography sx={{ fontSize: 12 }}>쿠폰시간 : {data.playtime}</Typography>
                </Card>
              </Grid>
            );
          })
        }
      </Grid>

    </div>
    )
}

export default CouponList;