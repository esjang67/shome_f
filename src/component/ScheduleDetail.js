import { useEffect, useState } from "react";
// import Preiod from "./Preiod";
import axioxC from "../util/axiosC";
import { useParams } from "react-router-dom";

function ScheduleDetail(){

  const {id} = useParams();
  const [selDate, setSeltDate] = useState();
  const [schdule, setSchedule] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    
    axioxC.get("/schdule/" + id)
      .then(res => {
        setSchedule(res.data)
        setIsLoading(false);
      }).catch(err => {
      })
  })

  if(isLoading)
    return(<></>)

  return(
    <div className="ScheduleDetail">
      <h1>일정등록</h1>

      <div>
        id : <span>{id}</span>
        일자 : [ selDate ] 
        내용 : <br/>
        <textarea>{schdule.content}</textarea>

        <button onClick={()=>{
          axioxC.post(`${process.env.REACT_APP_SERVER_URL}/schedule`, 
          {
            "basedate":"2023-10-19",
            "content":"test"
          })
          .then(response => {
          console.log(response.data);
          
          }).catch(error => {
          console.log(error);
          })
      }}>[TEST]일정 등록</button>

      </div>
    </div>
  );

}

export default ScheduleDetail;