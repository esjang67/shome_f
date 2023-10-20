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
import ReactDatePicker from "react-datepicker";

function Schedule() {

  const [stdate, setStdate] = useState(getFormettedDate(new Date("2023-10-01")));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  //list 요청
  useEffect(()=> {
    getList();
  }, [])

  function getList(){

    const tmpStDate = new Date(stdate).getTime();
    const tmpEdDate = new Date(eddate).getTime();
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, 
      {params: {"startDate": tmpStDate, "endDate": tmpEdDate}})
      .then(response => {
      console.log(response.data);
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  
  }

  const pickDateHandler = (type, date) => {
    if(type === "st"){
      setStdate(date);
    }
    if(type === "ed"){
      setEddate(date);
    }
  };

  // var timestamp = 1476508607 * 1000;
  // var date = new Date(timestamp);
  // console.log('year is ' + date.getFullYear());
  if(isLoading)
    return(<>...</>)

  return (
    <div className="Schedule">
      <div className="P-menu">
        {/* <Link to={"/schedule/new"}>일정 +</Link>  */}
        <button onClick={()=> {navigator("/schedule/new")}}>일정 <FontAwesomeIcon icon={faCalendarPlus} /> </button>
        <button onClick={()=> {
        alert(stdate + "/" + eddate)
        }}>날짜변경?</button>
      </div>
      <div className="preiod">
        {/* <DatePickerC selDate={stdate} setSelDate={setStdate}/> ~ 
        <DatePickerC selDate={eddate} setSelDate={setEddate}/>  */}

        <ReactDatePicker id="pickdate-st" dateFormat="yyyy-MM-dd"
            selected={new Date(stdate)}
            onChange={(date) => pickDateHandler("st", date)} /> ~ 
        <ReactDatePicker id="pickdate-ed" dateFormat="yyyy-MM-dd"
            selected={new Date(eddate)}
            onChange={(date) => pickDateHandler("ed", date)} />            


        <button onClick={getList} > <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>

      <ScheduleItem list={list} />

    </div>
    );
}

export default Schedule;