import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DoitBatchDetail(props) {

  const [batch, setBatch] = useState({
    id:'',
    user:{userid:'', name:''},
    defineday:'',
    content:''
  })

  useEffect(()=> {
    if (!props.modalShow) 
      return;

    if(props.id !== null){
      console.log(props.id); 
      
      axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, 
        {params: {"id": props.id}})
      .then(response => {
        console.log("data get");
        console.log(response.data);
        setBatch(response.data);
        setForm();
      }).catch(error => {
      console.log(error);
        alert(error);
      })
    }
   
  },[])

  function setForm() {
    const userid = document.getElementsByName('user.userid');
    console.log(userid);
    if(batch.user.userid==="MIN"){

      // $("input:radio[name='user.userid']:radio[value='MIN']").prop('checked', true); // 선택하기
    }
    if(batch.user.userid==="DO"){
      // $("input:radio[name='user.userid']:radio[value='DO']").prop('checked', true); // 선택하기
    }
  }

  function selData(e){
    // console.log(e)
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
    } else if(e.target.name === "user.userid"){
      setBatch({
        ...batch,
        user: {userid : e.target.value }
      })
    } else {
      setBatch({
        ...batch,
        [e.target.name]: e.target.value
      })
    }
  }
  
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          할일
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* checked={batch.user.userid ==="MIN" ? false : true}  */}
        <div className="userid-radio">    
          <input type="radio" className="btn-check" id="min" name="user.userid" value="MIN" onChange={selData} />
          <label className="btn btn-outline-primary" for="min">민찬</label>
          <input type="radio" className="btn-check" id="do" name="user.userid" value="DO" onChange={selData} />
          <label className="btn btn-outline-danger" for="do">도현</label>
        </div>
        <br/>
        <div className="defineday-checkbox">
          <input type="checkbox" className="btn-check defineday" id="mon" name="defineday" value="월" onChange={selData} />
          <label className="btn btn-outline-warning" for="mon">월</label>
          <input type="checkbox" className="btn-check defineday" id="tue" name="defineday" value="화" onChange={selData} />
          <label className="btn btn-outline-warning" for="tue">화</label>
          <input type="checkbox" className="btn-check defineday" id="wed" name="defineday" value="수" onChange={selData} />
          <label className="btn btn-outline-warning" for="wed">수</label>
          <input type="checkbox" className="btn-check defineday" id="thu" name="defineday" value="목" onChange={selData} />
          <label className="btn btn-outline-warning" for="thu">목</label>
          <input type="checkbox" className="btn-check defineday" id="fri" name="defineday" value="금" onChange={selData} />
          <label className="btn btn-outline-warning" for="fri">금</label>
          <input type="checkbox" className="btn-check defineday" id="sat" name="defineday" value="토" onChange={selData} />
          <label className="btn btn-outline-warning" for="sat">토</label>
          <input type="checkbox" className="btn-check defineday" id="sun" name="defineday" value="일" onChange={selData} />
          <label className="btn btn-outline-warning" for="sun">일</label>
        </div>
        <br/>
        <textarea style={{ width: '100%' }} name="content" defaultValue={batch.content} onChange={selData} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={()=>{
          setBatch({
            id:'',
            user:{userid:'', name:''},
            defineday:'',
            content:''
          })
        }}>리셋</Button>{' '}

        <Button variant="outline-warning" onClick={()=>{
          console.log(batch);
          // const setdata = {
          //   ...batch
          //   // user:{userid:batch.userid}
          // }
          axios.post(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, batch)
          .then(response => {
            alert(response.data);
            props.setIsChange(true);
            props.onHide();
            
          }).catch(error => {
            console.log(error);
          })
        }}>저장</Button>{' '}

        <Button variant="outline-danger" onClick={()=>{
          axios.delete(`${process.env.REACT_APP_SERVER_URL}/doitbatch/{batch.id}`)
          .then(response => {
            alert(response.data);
            props.setIsChange(true);
            props.onHide();
            
          }).catch(error => {
            console.log(error);
          })
        }}>삭제</Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export default DoitBatchDetail;