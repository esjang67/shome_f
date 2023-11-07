import { Button } from "@mui/material";
import DoitBatchList from "../component/doit/DoitBatchList";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function DoitBatch(){
    
  const navigator = useNavigate();
  

  return (
    <div className="DoitBatch">
      <Button color="success"   onClick={()=> { navigator("/doit")}}>할일 목록</Button>{'  '}
      <Button color="secondary" onClick={() => {navigator("/doit/batch/new")}} 
              endIcon={<FontAwesomeIcon icon={faSquarePlus} />}>배치</Button>
      
      <DoitBatchList /> 
    </div>
  )
}

export default DoitBatch;