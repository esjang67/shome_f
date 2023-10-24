import { Button, Form } from "react-bootstrap";
import BookList from "./BookList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fnCollectList from "./fnCollectList"

function Library(){

  const navigate = useNavigate();
  const [colList, setList] = useState();

  const [collectId, setCollectId] = useState();

  const handleSelect = (e) => {
    alert(e.target.value)
    console.log(e.target.value)
    setCollectId(e.target.value);
  };

  useEffect(()=>{
    // console.log("fnCollectList" + fnCollectList());
    fnCollectList()
    .then(result => {
      console.log(result);
      setList(result)
      
    }).catch(error => {
      console.log(error);
    })
  
  },[])

  return(
    <div className="Library">
      <h1> 책등록하자!!!</h1>
      <Button onClick={()=> {
        navigate("/book/admin/library/collect");
      }}>전집등록</Button>
      
      전집선택 : 
      <Form.Select onChange={handleSelect} value={0}>
        <option>전집등록</option>
        {
          colList.map((data) => {
            return (
              <option key={data.id} value={data.id}>{data.name}</option>
            );
          })
        }
        
      </Form.Select>
      
      <Button onClick={()=> {
        
      }}>책추가버튼</Button>

      {collectId === undefined ? <BookList collectId={collectId} /> : ''}

    </div>
    )
}

export default Library;

  {/* <select className="w150" onChange={handleSelect} value={'1'}>
    <option value="1" >0.1톤</option>
    <option value="2">0.2톤</option>
    <option value="3">0.3톤</option>
    <option value="4">0.4톤</option>
    <option value="5">0.5톤</option>
  </select> */}