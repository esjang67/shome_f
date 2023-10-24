import { useEffect, useState } from "react";
import ScheduleItem from "../component/ScheduleItem";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button } from "react-bootstrap";
import DatePreiod from "../component/DatePreiod";

function Schedule({grade}) {

  let startdate = new Date() // new Date("2023-10-01 00:00:00");
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(startdate);
  const [eddate, setEddate] = useState(new Date());
  
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