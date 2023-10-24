import { Button, Form } from "react-bootstrap";
import BookList from "./BookList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fnCollectList } from "./fnCollectList";

function Library(){

  const navigate = useNavigate();
  const [colList, setList] = useState();
  const handleSelect = (e) => {
    alert(e.target.value)
    console.log(e.target.value)
    // setSelected(e.target.value);
  };

  useEffect(()=>{
    // console.log("fnCollectList" + fnCollectList());
    const list = fnCollectList()
    setList(list);
  },[])

console.log("colList " + colList);

  return(
    <div className="Library">
      <h1> 책등록하자!!!</h1>
      <Button onClick={()=> {
        navigate("/book/admin/library/collect");
      }}>전집등록</Button>
      
      전집선택 : 

      {/* <select className="w150" onChange={handleSelect} value={'1'}>
        <option value="1" >0.1톤</option>
        <option value="2">0.2톤</option>
        <option value="3">0.3톤</option>
        <option value="4">0.4톤</option>
        <option value="5">0.5톤</option>
      </select> */}
      
      <Form.Select onChange={handleSelect}>
        <option>전집등록</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      
      <Button onClick={()=> {
        
      }}>책추가버튼</Button>

      <BookList />

    </div>
    )
}

export default Library;