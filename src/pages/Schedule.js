import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
      <div className="P-menu">
        {grade === 'P' ? 
          <Button variant="outlined" color="secondary" 
            onClick={scheduleAdd}>일정 <FontAwesomeIcon icon={faPlus}/></Button>
        :''}  
      </div>
      <hr/><br/>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar defaultValue={value} value={value} 
        onChange={(newValue) => {
        setValue(newValue);
        // console.log(newValue);
        }}/>
      </LocalizationProvider> */}

      <ScheduleList />

    </div>
    );
}

export default Schedule;