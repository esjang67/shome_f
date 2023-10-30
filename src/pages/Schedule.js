import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import ScheduleList from "../component/schedule/ScheduleList";

function Schedule({grade}) {
 
  const navigator = useNavigate();
  function scheduleAdd(){
    navigator("/schedule/new");
  }


  // console.log(getFormettedDate(new Date(value)));
  return (
    <div className="Schedule">
      {grade === 'P' ? 
        <Button color="secondary" 
        onClick={scheduleAdd}>일정 <FontAwesomeIcon icon={faSquarePlus}/></Button>
        :''}  

      <ScheduleList />

    </div>
    );
}

export default Schedule;