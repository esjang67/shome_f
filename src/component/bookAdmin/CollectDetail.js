import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CollectDetail(){
  const {id} = useParams();
  const navigate = useNavigate();

  const [collect, setCollect] = useState({
    id:'',
    name: '',
    delyn:'N'
  })

  function saveData(){
    // const id = document.querySelector("#input-id");
    axios.post(`${process.env.REACT_APP_SERVER_URL}/collect`, collect)
    .then(response => {
      alert(response.data);
      navigate(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    if(window.confirm("[경고] DATABASE에서 삭제됩니다. 삭제 하시겠습니까?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/collect/` + id)
      .then(response => {
        alert(response.data);
        navigator(-1)
        
      }).catch(error => {
        console.log(error);
      })    
    }
  }  

  function changeHandler(e) {
    // console.log( e.target.checked)
    if(e.target.name ==='delyn'){
      setCollect({
        ...collect,
        [e.target.name] : e.target.checked ? "Y" : "N"
      })    
    } else {
      setCollect({
        ...collect,
        [e.target.name] : e.target.value
      })
    }
  }

  // 데이터 가져오기
  function getData(){
    if(id !== undefined){
      console.log("get list id " + id);
      axios.get(`${process.env.REACT_APP_SERVER_URL}/collect`, 
        {params: {"id": id}})
      .then(response => {
        console.log(response.data)
        setCollect(response.data);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])

  return(
    <div className="CollectDetail">
      <h1> 전집 등록</h1>

      <Card>
        <CardBody>
          <input type="text" className="input-id" name="id" defaultValue={collect.id} /><br/>
          이름 : <input type="text" className="input-name" name="name" defaultValue={collect.name} onChange={changeHandler}/><br/>
          삭제 : <input type="checkbox" className="input-name" name="delyn" defaultChecked={collect.delyn === "Y" ? true: false}
                              onChange={changeHandler}/>
        </CardBody>
        <CardFooter>
        {id !== undefined ? 
          <Button onClick={deleteData}>삭제</Button>
          :'' }{' '}
          
          <Button onClick={saveData}>저장</Button>{' '}
          <Button onClick={()=> navigate(-1)}>목록</Button>
        </CardFooter> 
      </Card>      
    </div>
    )
}

export default CollectDetail;