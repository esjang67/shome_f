import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import ScheduleList from "../component/schedule/ScheduleList";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useState } from "react";
function Schedule({grade}) {
 
  const navigator = useNavigate();
  const [value, setValue] = useState(dayjs('2022-04-17'));
  function scheduleAdd(){
    navigator("/schedule/new");
  }

  return (
    <div className="Schedule">
      <div className="P-menu">
        {grade === 'P' ? 
          <Button variant="outlined" color="primary" onClick={scheduleAdd}>일정 <FontAwesomeIcon icon={faCalendarPlus} /> </Button>
        :''}  
      </div>
      <br/><hr/><br/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar defaultValue={dayjs('2022-04-17')} value={value} onChange={(newValue) => setValue(newValue)}/>
      </LocalizationProvider>

      <ScheduleList />

    </div>
    );
}

export default Schedule;