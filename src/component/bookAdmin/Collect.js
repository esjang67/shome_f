import { Button } from "react-bootstrap";
import CollectList from "./CollectList";
import { useNavigate } from "react-router-dom";

function Collect(){
  
  const navigate = useNavigate();

  return(
    <div className="Collect">
      <h1> 전집</h1>
      <Button onClick={()=> {
        navigate("/book/admin/library");
      }}>책 목록</Button>{' '}
      <Button onClick={()=> {
        navigate("/book/admin/library/collect/new");
      }}>전집추가</Button>

      <br/><hr/><br/>

      <CollectList  />
      


    </div>
    )
}

export default Collect;