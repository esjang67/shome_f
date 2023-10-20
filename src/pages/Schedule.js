import { useEffect, useState } from "react";
// import Preiod from "../component/Preiod";
import ScheduleItem from "../component/ScheduleItem";
import "./Schedule.css";

// import { getFormettedDate } from "../util/util_date";
import { Link, useNavigate } from "react-router-dom";
import DatePickerC from "../component/DatePickerC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getFormettedDate } from "../util/util_date";
import axioxC from "../util/axiosC";
import axios from "axios";

function Schedule() {

  const [stdate, setStdate] = useState(getFormettedDate(new Date("2023-10-01")));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // list 요청
  // useEffect(()=> {
  //   console.log("list 요청")
  //   const tmpStDate = new Date(stdate).getTime();
  //   const tmpEdDate = new Date(eddate).getTime();
  //   console.log(tmpStDate + "/" + tmpEdDate);

  //   const data = {
  //     "startDate": tmpStDate,
  //     "endDate": tmpEdDate
  //   }
  //   console.log(data);

  //   fetch(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, {
  //     method:'get',
  //     headers:{
  //       'Content-Type':'application/json; charset=utf-8'
  //       },
  //     body:JSON.stringify(data)})
  //     .then(res=> {
  //       console.log(res);
  //     }).catch(e=> {
  //       console.log(e);
  //     })

    // axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, data)
    //   .then(response => {
    //     console.log("schdule/all" + response.data);
    //     setList(response.data);
    //     setIsLoading(false);
        
    //   }).catch(error => {
    //     console.log(error);
    //   })
  // }, [])

  // var timestamp = 1476508607 * 1000;
  // var date = new Date(timestamp);
  // console.log('year is ' + date.getFullYear());

  return (
    <div className="Schedule">
      <div className="P-menu">
        {/* <Link to={"/schedule/new"}>일정 +</Link>  */}
        <button onClick={()=> {navigator("/schedule/new")}}>일정 <FontAwesomeIcon icon={faCalendarPlus} /> </button>

        <button onClick={()=> {

          const tmpStDate = new Date(stdate).getTime();
          const tmpEdDate = new Date(eddate).getTime();

          const data = {
            "startDate": tmpStDate,
            "endDate": tmpEdDate
          }
          console.log(data);
      
          fetch(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, {
            method:'get',
            headers:{
              'Content-Type':'application/json; charset=utf-8'
              },
            body:JSON.stringify(data)})
            .then(res=> {
              console.log(res);
            }).catch(e=> {
              console.log(e);
            })
        
        }}>server</button>
      </div>
      <div className="preiod">
        <DatePickerC selDate={stdate}/> ~ <DatePickerC selDate={eddate}/> 
        <button onClick={()=> {
          console.log(getFormettedDate(new Date("2023-10-19")));
          console.log(getFormettedDate(new Date()));
        
        }} > <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>

      {/* <ScheduleItem stdate={stdate} eddate={eddate}/> */}

    </div>
    );
}

export default Schedule;