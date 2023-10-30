import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getFormettedDate } from "../../util/util_date";

function ScheduleDetail(){

  const {id} = useParams();
  const navigator = useNavigate();
  // const [selDate, setSeltDate] = useState(new Date("2023-10-01"));
  const [schedule, setSchedule] = useState({
      id:'',
      basedate:new Date(),
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
          console.log(res.data)
          setSchedule(res.data)
          setSeltDate(res.data.basedate)
          setIsLoading(false);
        }).catch(err => {
          console.log(err);
        })
    }
  }, [id])

  const changeHandler = (e) => {
    console.log(e);
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value
    })
    console.log(e.target.value)
  }

  function deleteData() {
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
    .then(response => {
      alert(response.data);
      navigator("/")
    }).catch(error => {
      console.log(error);
    })
  }

  function saveData(){
    console.log(getFormettedDate(new Date(selDate)))
    const sendSchedule =({
      ...schedule,
      basedate:getFormettedDate(new Date(selDate))
    })
    console.log(sendSchedule);
    axios.post(`${process.env.REACT_APP_SERVER_URL}/schedule`, sendSchedule)
    .then(response => {
      alert(response.data);
      navigator("/");
    }).catch(error => {
      console.log(error);
    })    
  }

  if(isLoading)
    return(<>...</>)

  return(
    <div className="ScheduleDetail">
      <Card sx={{ maxWidth: 345 }} variant="outlined" >
        <CardHeader title="일정 관리" />
        <CardContent>
          <Box sx={{py: 2,display: 'grid',gap: 2,alignItems: 'center',flexWrap: 'wrap',}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker format="YYYY-MM-DD" defaultValue={dayjs(selDate)} label="일자선택"
                  onChange={(stValue)=> setSeltDate(stValue)}/>
            </LocalizationProvider>  
            <TextField id="outlined-basic" label="일정" variant="outlined" name="content" onChange={changeHandler} defaultValue={schedule.content} />
          </Box>
          <Button variant="outlined" color="success" onClick={()=>{navigator("/")}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>
        </CardContent>
      </Card>
    </div>
  );

}

export default ScheduleDetail;