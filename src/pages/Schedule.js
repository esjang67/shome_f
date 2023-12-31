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

  return (
    <div className="Schedule">
      {grade === 'P' ? 
        <Button color="secondary" 
                endIcon={<FontAwesomeIcon icon={faSquarePlus} />}
                onClick={scheduleAdd}>일정</Button>
        :''}  
      
      <ScheduleList grade={grade}/>

    </div>
    );
}

export default Schedule;