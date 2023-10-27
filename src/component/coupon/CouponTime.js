import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function CouponTime(){

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

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

    const id = e.target.parentNode.dataset.id;
    const time = e.target.previousSibling.value
    axios.put(`${process.env.REACT_APP_SERVER_URL}/coupon/time`, {id:id, time:time})
    .then(response => {
      alert(response.data);
      getList();
      e.target.previousSibling.value = '';
      setIsLoading(false);

    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
    getList();
  }, [isLoading])

  if(isLoading)
    return(<>...</>)

  return(
    <div className="CouponTime">
      
      {
          list.map((data) => {
            return (
              <div key={data.id} data-id={data.id}>
              <span>{data.user.name} : {data.totaltime}</span>
              <input type="text" name="time" />
              <Button variant="outlined" color="primary" onClick={useTime}>사용</Button> 
              </div>
            );
          })
        }
      
    </div>
  )
}

export default CouponTime;