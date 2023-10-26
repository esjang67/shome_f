import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { Button } from "@mui/material";

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

  useEffect(()=> {
    if(id === undefined)
      setIsLoading(false);

    if(id !== undefined){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
        .then(res => {
          console.log(res.data)
          setSchedule(res.data)
          setIsLoading(false);
        }).catch(err => {
          console.log(err);
        })
    }
  }, [])

  const changeHandler = (e) => {
    setSchedule({
      ...schedule,
      [e.target.name]: e.target.value
    })
  }

  const pickDateHandler = (date) => {
    alert(date);
    setSchedule({
      ...schedule,
      basedate:date
    })
    
    console.log(schedule)
  };

  if(isLoading)
    return(<>...</>)

  return(
    <div className="ScheduleDetail">
      <h1>일정</h1>
      
      <div>
        id : <span>{id}</span><br/>
        일자 : 
        <ReactDatePicker id="pickdate" dateFormat="yyyy-MM-dd"
            selected={new Date(schedule.basedate)}
            onChange={(date) => pickDateHandler(date)} /><br/>
        내용 : <br/>
        <textarea placeholder="일정을 등록하세요" name="content" onChange={changeHandler} defaultValue={schedule.content}/><br/>
        <Button variant="outlined" color="error" onClick={()=>{navigator("/")}}>취소</Button>
        {
          id !== undefined ? 
          <Button variant="outlined" color="primary" onClick={()=>{
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
            .then(response => {
              alert(response.data);
              navigator("/")
            }).catch(error => {
              console.log(error);
            })
          
          }}>삭제</Button> : <></>
        }

        <Button variant="outlined" color="primary" onClick={()=>{
          axios.post(`${process.env.REACT_APP_SERVER_URL}/schedule`, schedule)
          .then(response => {
            alert(response.data);
            navigator("/");
          }).catch(error => {
            console.log(error);
          })
        }}>{id === undefined ? "등록" : "수정"}</Button>

      </div>
    </div>
  );

}

export default ScheduleDetail;