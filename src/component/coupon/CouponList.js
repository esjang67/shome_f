import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";

// coupon, couponAdmin에서 공용으로 사용
function CouponList({ grade, userid }){
  
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
        console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/all/user`, 
      {params: {"userid": userid, "startDate": stdate, "endDate": eddate}})
      .then(response => {
        console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  useEffect(()=> {
    getList();
  }, [isLoading])
  
  if(isLoading)
    return(<>...</>)
  
  return (
    <div className="CouponList">
      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>기준일자</th>
            {grade === 'P'? 
              <th>이름</th>
              :''}
            <th>타입</th>
            <th>내용</th>
            <th>쿠폰시간</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.basedate}</td>
                {grade === 'P'? 
                  <td>{data.user.name}</td>
                :''}
                <td>{data.type}</td>
                <td>{data.content}</td>
                <td>{data.playtime}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
    )
}

export default CouponList;