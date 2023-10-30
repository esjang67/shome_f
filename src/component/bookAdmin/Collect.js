import { Button } from "@mui/material";
import CollectList from "./CollectList";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function Collect(){
  
  const navigate = useNavigate();

  return(
    <div className="Collect">
      <Button color="success" onClick={()=> {navigate("/library/admin/books")}}>책목록</Button>{' '}
      <Button color="secondary" onClick={()=> {navigate("/library/admin/collect/new")}}>전집<FontAwesomeIcon icon={faSquarePlus} /></Button>
      <hr/>
      <CollectList  />
    </div>
    )
}

export default Collect;