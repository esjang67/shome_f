import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFormettedDate } from "../../util/util_date";
import { Button, Card, CardContent, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";


function SuggestDetail({user}){

  const navigator = useNavigate();
  const [type, setAlignment] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleChange2 = (e) => {
    setContent(e.target.value);
  };

  function writeSave(){
    const suggest = {
      basedate:getFormettedDate(new Date()),
      user:user,
      type:type,
      content:content,
      okflag:'N'
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}/suggest`, suggest)
    .then(response => {
      alert("저장했습니다.");
      navigator("/suggest");
    }).catch(error => {
      console.log(error);
    })
  }

  return(
    <div className="SuggestDetail">
      <Card sx={{ maxWidth: 345, m:2 }} variant="outlined">
      <CardContent>
					<ToggleButtonGroup variant="outlined" exclusive value={type} aria-label="Platform" onChange={handleChange} >
							<ToggleButton sx={{ width: "60px" }} size="small" color="primary" name="type" value="DO">DO</ToggleButton>
							<ToggleButton sx={{ width: "60px" }} size="small" color="error"   name="type" value="EAT">EAT</ToggleButton>
							<ToggleButton sx={{ width: "60px" }} size="small" color="success" name="type" value="GO">GO</ToggleButton>
						</ToggleButtonGroup>
						<br/><br/>
						
						<TextField id="outlined-password-input" label="말해봐" variant="outlined" size="small"
												type="text" className="content" name="content"  onChange={handleChange2} />
						<br/><br/>

					<Button variant="outlined" color="success" onClick={()=> navigator(-1)}>목록</Button>{'  '}
					<Button variant="outlined" color="primary" onClick={writeSave}>저장</Button>
				</CardContent>
      </Card>
    </div>
  )
}

export default SuggestDetail;