import { faFaceLaugh, faFaceMehBlank, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";

function SuggestList({ grade }){
  
  let startdate = new Date() // new Date("2023-10-01 00:00:00");
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [seldate, setSeldate] = useState(getFormettedDate(new Date()));

  function getList(){
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/suggest/all`, 
      {params: {"startDate": stdate, "endDate": eddate}})
      .then(response => {
      console.log(response.data);
      setList(response.data);
      setIsLoading(false);
      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  }, [isLoading])
  
  function deleteData(e){
    const getID = e.target.parentNode.parentNode.dataset.id;
    // alert(getID)

    const okflag = e.target.parentNode.parentNode.dataset.okflag;
    if(okflag === "Y"){
      alert("이미 등록된 일정으로 삭제할 수 없어요.")
      return
    }

    if(window.confirm("삭제할까요?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/suggest/` + getID)
      .then(response => {
        console.log(response.data);
        alert(response.data)
      }).catch(error => {
        console.log(error);
      })
    }
  
  }

  function scheduleAdd(e){
    const getID = e.target.parentNode.parentNode.dataset.id;
    // alert(getID + seldate)

    const okflag = e.target.parentNode.parentNode.dataset.okflag;
    if(okflag === "Y"){
      alert("이미 등록된 일정입니다.")
      return
    }

    if(window.confirm("일정에 등록할까요?")){
      setIsLoading(false);
      axios.put(`${process.env.REACT_APP_SERVER_URL}/suggest/ok/` + getID, {seldate:seldate})
      .then(response => {
        console.log(response.data);
        alert(response.data)
        setIsLoading(true);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  if(isLoading)
    return(<>...</>)
  
  return (
    <div className="SuggestList">
      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>
      <br/><hr/><br/>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>기준일자</th>
            <th>이름</th>
            <th>내용</th>
            <th>OK</th>
            {grade === 'P'? 
              <th>일정으로등록</th>
              :''}
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id} data-id={data.id} data-okflag={data.okflag} >
                <td>{data.id}</td>
                <td>{data.basedate}</td>
                <td>{data.user.name}</td>
                <td>{data.content}</td>
                <td>
                  {data.okflag === "Y"? 
                      <FontAwesomeIcon icon={faThumbsUp} /> : ''}
                  {data.okflag === "N"? <button onClick={deleteData}>삭제</button> : ''}                      
                </td>
                {grade === 'P'? 
                  <td>
                    <ReactDatePicker id="pickdate" dateFormat="yyyy-MM-dd" selected={new Date(seldate)}
                        onChange={(date) => setSeldate(getFormettedDate(new Date(date)))} />
                    <button onClick={scheduleAdd}>일정등록</button>
                  </td>
                :''}
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
    )
}

export default SuggestList;