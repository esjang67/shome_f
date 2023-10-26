import { useEffect, useState } from "react";
import ScheduleItem from "../component/ScheduleItem";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button } from "react-bootstrap";
import DatePreiod from "../component/DatePreiod";
import { getFormettedDate } from "../util/util_date";

function Schedule({grade}) {

  let startdate = new Date().setDate(1); 
  let enddate = new Date().setMonth((new Date().getMonth()) + 1);
  enddate = new Date(enddate).setDate(0); 
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date(enddate)));
  
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  //list 요청
  useEffect(()=> {
    getList();
  }, [])

  function getList(){
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, 
      {params: {"startDate": stdate, "endDate": eddate}})
      .then(response => {
      console.log(response.data);
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  
  }

  if(isLoading)
    return(<>...</>)

  return (
    <div className="Schedule">
      
      <div className="P-menu">
        {grade === 'P' ? 
          <Button onClick={()=> {navigator("/schedule/new")}}>일정 <FontAwesomeIcon icon={faCalendarPlus} /> </Button>
        :''}  
      </div>

      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>

      <ScheduleItem list={list} />

    </div>
    );
}

export default Schedule;