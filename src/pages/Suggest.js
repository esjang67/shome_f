
import { Button } from "@mui/material";
import SuggestList from "../component/suggest/SuggestList";
import { useNavigate } from "react-router-dom";

function Suggest({user}){

  const navigator = useNavigate();

  return(
    <div className="Suggest">
      <Button variant="outlined" color="primary" onClick={()=> {navigator("/suggest/new")}}>등록하기</Button>
      <hr/>
      <SuggestList grade={user.grade}/>
    </div>
  )
}

export default Suggest;