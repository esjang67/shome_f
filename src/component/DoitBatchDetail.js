import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import SelectKids from './SelectKids';

function DoitBatchDetail() {

  const {id} = useParams();
  const navigator = useNavigate();
  const [kids, setKids] = useState("MIN");
  const [isLoading, setIsLoading] = useState(true);
  const [batch, setBatch] = useState({
    id:'',
    user:{userid:'', name:''},
    defineday:'',
    content:''
  })

  function getData(){
    if(id !== undefined){
      console.log("get list id " + id);
      axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, 
        {params: {"id": id}})
      .then(response => {
        console.log(response.data)
        setBatch(response.data);
        setKids(response.data.user.userid);
        setIsLoading(true);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])
  
  function saveData(){
    const reqBatch = {
      ...batch,
      user: {userid : kids }
    }
    console.log(reqBatch)

    axios.post(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, reqBatch)
    .then(response => {
      alert(response.data);
      navigator(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/doitbatch/` + batch.id)
    .then(response => {
      alert(response.data);
      navigator(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }
  
  function findDay(str){
    const day = [...batch.defineday];
    let f = false;
    day.forEach(d => {
      if(d === str){
        f = true;
      }
    });
    return f
  }

  function selData(e){

    console.log(e.target.name )
    if(e.target.name === "defineday"){
      let day='';
      // 요일 다체크할것
      const check = document.querySelectorAll('.defineday')
      check.forEach((d)=>{
        // console.log(d.value + "/" + d.checked);
        if(d.checked){
          day = day + d.value;
        }
      })
      // console.log(day);
      setBatch({
        ...batch,
        defineday: day
      })
    } else {
      setBatch({
        ...batch,
        [e.target.name]: e.target.value
      })
    }
  }
  
if(!isLoading){
  <div>...</div>
  return
}

  return (
    <div className='DoitBatchDetail'>
      <h1>할일</h1>

      <div>
        <SelectKids kids={kids} setKids={setKids} />
        <br/>
        <div className="defineday-checkbox">
          <input type="checkbox" className="btn-check defineday" id="mon" name="defineday" value="월" checked={findDay("월")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="mon">월</label>
          <input type="checkbox" className="btn-check defineday" id="tue" name="defineday" value="화" checked={findDay("화")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="tue">화</label>
          <input type="checkbox" className="btn-check defineday" id="wed" name="defineday" value="수" checked={findDay("수")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="wed">수</label>
          <input type="checkbox" className="btn-check defineday" id="thu" name="defineday" value="목" checked={findDay("목")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="thu">목</label>
          <input type="checkbox" className="btn-check defineday" id="fri" name="defineday" value="금" checked={findDay("금")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="fri">금</label>
          <input type="checkbox" className="btn-check defineday" id="sat" name="defineday" value="토" checked={findDay("토")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="sat">토</label>
          <input type="checkbox" className="btn-check defineday" id="sun" name="defineday" value="일" checked={findDay("일")} onChange={selData} />
          <label className="btn btn-outline-warning" htmlFor="sun">일</label>
        </div>
        <br/>
        <textarea style={{ width: '100%' }} name="content" defaultValue={batch.content} onChange={selData} />
      </div>

      {id !== undefined ? 
        <Button variant="outline-danger" onClick={deleteData}>삭제</Button>: ''}
      {' '}
      <Button variant="outline-warning" onClick={saveData}>저장</Button>{' '}
      <Button variant="outline-success" onClick={()=>{
        
        navigator(-1)
      }}>목록</Button>

    </div>  
  );
}

export default DoitBatchDetail;