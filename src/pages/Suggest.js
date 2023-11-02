
import { Button } from "@mui/material";
import SuggestList from "../component/suggest/SuggestList";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function Suggest({user}){

  const navigator = useNavigate();
  return(
    <div className="Suggest">
      <Button sx={{ m:1 }} color="warning" 
          endIcon={<FontAwesomeIcon icon={faSquarePlus} />}
          onClick={()=> {navigator("/suggest/new")}}>새로 등록</Button>

      <SuggestList grade={user.grade} userid={user.userid} />
    </div>
  )
}

export default Suggest;