import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function CouponTime(){

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [time, setTime] = useState({'MIN': '', 'DO': ''});

  // 총 적립시간(사용자별) 가져오기
  function getList(){

    axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/time/all`)
    .then(response => {
      // alert(response.data);
      setList(response.data)
      setIsLoading(false);

    }).catch(error => {
      console.log(error);
    })
  }
  
  function useTime(e){
    const id = e.target.dataset.id;
    const time = document.querySelector(".time .MuiInputBase-input").value;
    axios.put(`${process.env.REACT_APP_SERVER_URL}/coupon/time`, {id:id, time:time})
    .then(response => {
      alert("쿠폰시간을 사용했습니다.");
      getList();
      e.target.previousSibling.value = '';
      setIsLoading(false);
      document.querySelector(".time .MuiInputBase-input").value = '';
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
    getList();
  }, [isLoading])

  if(isLoading)
    return(<>...</>)
//MuiInputBase-input
  return(
    <div className="CouponTime">
      
      {
          list.map((data) => {
            return (
              <Box sx={{ display: 'flex' }} key={data.id} data-id={data.id} data-userid={data.user.name} >
                <Typography sx={{ width: '50%', fontSize: 20 }}>{data.user.name} : {data.totaltime}</Typography>
                <TextField sx={{ width: '30%' }} maxLength={data.totaltime} variant="outlined" size="small" className="time" />
                <Button variant="outlined" color="secondary" data-id={data.id} onClick={useTime}>사용</Button> 
              </Box>
            );
          })
        }
      
    </div>
  )
}

export default CouponTime;