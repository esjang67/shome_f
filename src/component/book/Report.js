import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormettedDate } from "../../util/util_date";
import { Box, Button, Card, CardActions, CardContent, CardHeader, TextField, TextareaAutosize } from "@mui/material";

function Report(){
  const {id, userid} = useParams();
  const navigator = useNavigate();
  const [content, setContent] = useState('');

  const [book, setBook] = useState({
    id:'',
    name: '',
    delyn:'N',
    bookcollect:{id:'', name:''}
  })

  // 몇번 독후감을 썼는지 메시지?

  useEffect(()=> {
    // BookDetail에서도 사용됨
    axios.get(`${process.env.REACT_APP_SERVER_URL}/book`, {params: {"id": id}})
    .then(response => {
      // console.log(response.data)
      setBook(response.data);
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  
  }, [id])

  function changeHandler(e) {
    setContent(e.target.value)
  }

  function saveData(){
    const report = {
      id:'',
      basedate: getFormettedDate(new Date()),
      user:{userid:userid},
      book:{id:book.id},
      content:content
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}/report`, report)
    .then(response => {
      alert("독후감을 쓰다니 박수 짝짝~!!!")
      navigator(-1)
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  }

  return(
    <div className="Report">
      <Box>
        <Card sx={{ maxWidth: 345, m:2 }} variant="outlined">
          <CardHeader title={`${book.name}`} subheader={`${book.bookcollect.name}`}/>
          <CardContent>
            <TextField sx={{ fontSize:14, width: '90%' }} id="outlined-multiline-static"
                label="무슨 장면이 제일 기억에 남아?"
                multiline rows={4} defaultValue="" onChange={changeHandler}
              />
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="primary" onClick={saveData}>다썼어요 :)</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}
export default Report;