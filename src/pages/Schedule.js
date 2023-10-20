import { useState } from "react";
// import Preiod from "../component/Preiod";
import ScheduleItem from "../component/ScheduleItem";
import "./Schedule.css";

// import { getFormettedDate } from "../util/util_date";
import { Link, useNavigate } from "react-router-dom";
import DatePickerC from "../component/DatePickerC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getFormettedDate } from "../util/util_date";

function Schedule() {

  const [stdate, setStdate] = useState(getFormettedDate(new Date()));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  
  return (
    <div className="Schedule">
      <div className="P-menu">
        <Link to={"/schedule/new"}>일정 +</Link> 
      </div>
      <div className="preiod">
        <DatePickerC selDate={stdate}/> ~ <DatePickerC selDate={eddate}/> 
        <button onClick={()=> {
          console.log(getFormettedDate(new Date("2023-10-19")));
          console.log(getFormettedDate(new Date()));
        
        }} ><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>


      <ScheduleItem stdate={stdate} eddate={eddate}/>
    </div>
    );
}

export default Schedule;