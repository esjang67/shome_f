import { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import DoitBatchList from "../component/DoitBatchList";
import DoitBatchDetail from "../component/DoitBatchDetail";
import "./DoitBatch.css"

function DoitBatch(){
  const [modalShow, setModalShow] = useState(false);
  const [isChange, setIsChange] = useState(true);
  const [selid, setSelid] = useState('');
    
  return (
    <div className="DoitBatch">

      <div>
        <Button variant="primary" onClick={() => {
          setSelid('')
          setModalShow(true)
        }}>할일 추가</Button>
        <DoitBatchDetail show={modalShow} onHide={() => setModalShow(false)} setIsChange={setIsChange} id={selid}/>
      </div>

      <hr/>
      <ListGroup>
        <DoitBatchList setIsChange={setIsChange} setSelid={setSelid} setModalShow={setModalShow}/> 
      </ListGroup>
    </div>
  )
}

export default DoitBatch;