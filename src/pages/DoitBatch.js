import { Button } from "react-bootstrap";
import DoitBatchList from "../component/DoitBatchList";
import "./DoitBatch.css"
import { useNavigate } from "react-router-dom";

function DoitBatch(){
    
  const navigator = useNavigate();

  return (
    <div className="DoitBatch">

      <div className="doitbatch-popup">
        <Button variant="primary" onClick={() => {
          navigator("/doit/batch/new");
        }}>배치 추가</Button>

      </div>

      <hr/>
      
      <DoitBatchList /> 

    </div>
  )
}

export default DoitBatch;