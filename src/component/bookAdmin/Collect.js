import { Button } from "@mui/material";
import CollectList from "./CollectList";
import { useNavigate } from "react-router-dom";

function Collect(){
  
  const navigate = useNavigate();

  return(
    <div className="Collect">
      <h1> 전집</h1>
      <Button variant="outlined" color="primary" onClick={()=> {navigate("/library/admin/books")}}>책 목록</Button>{' '}
      <Button variant="outlined" color="primary" onClick={()=> {navigate("/library/admin/collect/new")}}>전집추가</Button>

      <br/><hr/><br/>

      <CollectList  />
      
    </div>
    )
}

export default Collect;