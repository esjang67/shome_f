import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DatePreiod({stdate, setStdate, eddate, setEddate, getList}){
  // console.log("DatePreiod " + stdate + " / " + dayjs(stdate))
  return (
    <div className="DatePreiod">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker format="YYYY-MM-DD" defaultValue={dayjs(stdate)} label="시작일자"
            onChange={(stValue)=> setStdate(stValue) }/>
        {' '}
        <DatePicker format="YYYY-MM-DD" defaultValue={dayjs(eddate)} label="끝일자"
            onChange={(edValue)=> setEddate(edValue)} />
      </LocalizationProvider>
      {' '}
      <Button variant="outlined" sx={{ height: '100%' }} onClick={getList} > 
        <Typography><FontAwesomeIcon icon={faMagnifyingGlass} /></Typography>
      </Button>
      </div>
    )
}

export default DatePreiod;