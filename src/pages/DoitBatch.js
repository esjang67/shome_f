import { Button } from "@mui/material";
import DoitBatchList from "../component/doit/DoitBatchList";
import "./DoitBatch.css"
import { useNavigate } from "react-router-dom";

function DoitBatch(){
    
  const navigator = useNavigate();
  

  return (
    <div className="DoitBatch">
      <Button variant="outlined" color="success" onClick={()=> { navigator("/doit")}}>할일목록</Button>{'  '}
      <Button variant="outlined" color="secondary" onClick={() => {navigator("/doit/batch/new")}}>배치 추가</Button>
      <hr/>
      
      <DoitBatchList /> 

    </div>
  )
}

export default DoitBatch;