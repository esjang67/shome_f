
import { Button } from "react-bootstrap";
import SuggestList from "../component/suggest/SuggestList";
import { useNavigate } from "react-router-dom";

function Suggest({user}){

  const navigator = useNavigate();

  return(
    <div className="Suggest">
      <Button onClick={()=> {navigator("/suggest/new")}}>추가</Button>
      <br/><hr/><br/>
      <SuggestList grade={user.grade}/>
    </div>
  )
}

export default Suggest;