import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getFormettedDate } from "../../util/util_date";

function ScheduleDetail(){

  const {id} = useParams();
  const navigator = useNavigate();
  const [schedule, setSchedule] = useState({
      id:'',
      basedate:dayjs(new Date()),
      content:''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selDate, setSeltDate] = useState(dayjs(new Date()))

  useEffect(()=> {
    if(id === undefined)
      setIsLoading(false);

    if(id !== undefined){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
        .then(res => {
          // console.log(res.data)
          setSchedule(res.data)
          setSeltDate(dayjs(new Date(res.data.basedate)))
          setIsLoading(false);
        }).catch(err => {
          console.log(err);
        })
    }
  }, [id])

  const changeHandler = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value
    })
  }
  
  function saveData(){
    const sendSchedule =({
      ...schedule,
      basedate:getFormettedDate(new Date(selDate))
    })
    axios.post(`${process.env.REACT_APP_SERVER_URL}/schedule`, sendSchedule)
    .then(response => {
      alert("저장했습니다.");
      navigator("/");
    }).catch(error => {
      console.log(error);
    })    
  }

  function deleteData() {
    if(window.confirm("삭제할까요?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
      .then(response => {
        alert("삭제했습니다.");
        navigator("/")
      }).catch(error => {
        console.log(error);
      })
    }
  }


console.log();

  if(isLoading)
    return(<>...</>)

  return(
    <div className="ScheduleDetail">
      <Card sx={{ maxWidth: 345, m:1 }} variant="outlined">
        <CardHeader title="일정 관리" />
        <CardContent>
          <Box sx={{ py: 2,display: 'grid',alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar sx={{ width: "100%" }} defaultValue={dayjs(selDate)} 
                  value={selDate} onChange={(newValue) => setSeltDate(newValue)}/>
            </LocalizationProvider>
            <TextField id="outlined-basic" label="일정" variant="outlined" name="content" size="small"
                       onChange={changeHandler} defaultValue={schedule.content} />
          </Box>
          
          <Button variant="outlined" color="success" onClick={()=>{navigator(-1)}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>
        </CardContent>
      </Card>
    </div>
  );

}

export default ScheduleDetail;