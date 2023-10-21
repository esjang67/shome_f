import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactDatePicker from "react-datepicker";

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

  console.log("detail " + id);

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
        <textarea placeholder="일정등록 요청!!!" name="content" onChange={changeHandler} defaultValue={schedule.content}/><br/>
        
        {
          id !== undefined ? 
          <button onClick={()=>{
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/schedule/` + id)
            .then(response => {
              alert(response.data);
              navigator("/")
            }).catch(error => {
              console.log(error);
            })
          
          }}>삭제</button> : <></>
        }

        <button onClick={()=>{
          axios.post(`${process.env.REACT_APP_SERVER_URL}/schedule`, schedule)
          .then(response => {
            alert(response.data);
            navigator("/");
          }).catch(error => {
            console.log(error);
          })
        }}>{id === undefined ? "등록" : "수정"}</button>

      </div>
    </div>
  );

}

export default ScheduleDetail;