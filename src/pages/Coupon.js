import axios from "axios";
import { useEffect, useState } from "react";
import CouponList from "../component/coupon/CouponList";

function Coupon({user}){

  const [isLoading, setIsLoading] = useState(true);
  const [totalTime, setTotalTime] = useState();

  // 총 적립시간(사용자별) 가져오기
  function getTotalTime(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/time`, 
      {params: {"userid": user.userid}})
    .then(response => {
      // alert(response.data);
      setTotalTime(response.data)
      setIsLoading(false);

    }).catch(error => {
      console.log(error);
    })
  }
  // 적립정보(기간)

  useEffect(()=> {
    getTotalTime();
  }, [])

  if(isLoading)
    return(<>...</>)

  return(
    <div className="Coupon">
      <h3>총 적립시간 {totalTime}분</h3>
      
      <CouponList grade={user.grade} userid={user.userid} />

    </div>
  )
}

export default Coupon;