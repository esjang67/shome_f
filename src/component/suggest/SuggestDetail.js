import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormettedDate } from "../../util/util_date";
import { Button } from "@mui/material";


function SuggestDetail({user}){

const navigator = useNavigate();

  let type;

  const changeHandler = (e) => {
      type = e.target.value
  }

  function writeSave(){
    const conntent = document.querySelector('.content')
    const suggest = {
      basedate:getFormettedDate(new Date()),
      user:user,
      type:type,
      content:conntent.value,
      okflag:'N'
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/suggest`, suggest)
    .then(response => {
      alert(response.data);
      navigator("/suggest");
    }).catch(error => {
      console.log(error);
    })
  }

  return(
    <div className="SuggestDetail">
      
      <label><input type="radio" name="type" value={"DO"} onChange={changeHandler} />DO</label>{'   '}
      <label><input type="radio" name="type" value={"EAT"} onChange={changeHandler}/>EAT</label>{'   '}
      <label><input type="radio" name="type" value={"GO"} onChange={changeHandler}/>GO</label>

      <br/>

      <input type="text" className="content" name="content" /><br/>
      <Button variant="outlined" color="primary" onClick={writeSave}>저장</Button>
    </div>
  )
}

export default SuggestDetail;