import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";

function BookDetail(){

  const {id, colid} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [book, setBook] = useState({
    id:'',
    name: '',
    delyn:'N',
    bookcollect:{id:'', name:''}
  })

  function saveData(){
    axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, book)
    .then(response => {
      alert(response.data);
      navigate(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    if(window.confirm("[경고] DATABASE에서 삭제됩니다. 삭제 하시겠습니까?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/book/` + id)
      .then(response => {
        alert(response.data);
        navigator(-1)
        
      }).catch(error => {
        console.log(error);
      })    
    }
  }  

  function changeHandler(e) {
    if(e.target.name ==='delyn'){
      setBook({
        ...book,
        [e.target.name] : e.target.checked ? "Y" : "N"
      })    
    } else {
      setBook({
        ...book,
        [e.target.name] : e.target.value
      })
    }
  }

  // 데이터 가져오기
  function getData(){
    if(id !== undefined){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/book`, {params: {"id": id}})
      .then(response => {
        console.log(response.data)
        setBook(response.data);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    } else {
      // 화면출력용 전집정보 가져오기
      axios.get(`${process.env.REACT_APP_SERVER_URL}/collect`, {params: {"id": colid}})
      .then(response => {
        console.log(response.data)
        setBook({
          ...book,
          bookcollect:response.data
        })
      }).catch(error => {
        console.log(error);
        alert("collect" + error);
      })
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])

  if(isLoading)
  return(<>...</>)

  return(
    <div className="BookDetail">

      <Card sx={{ maxWidth: 345 }}>
				<CardHeader title={`[${book.bookcollect.name}] 책 관리`} />
				<CardContent>
          <Box sx={{py: 2,display: 'grid',gap: 2,alignItems: 'center',flexWrap: 'wrap',}}>
            <TextField id="outlined-basic" label="이름" variant="outlined" name="name" 
                  onChange={changeHandler} defaultValue={book.name} />
            <Typography> 
              사용안함 : 
              <Checkbox name="delyn" color="error" checked={book.delyn === "Y" ? true: false}
                              onChange={changeHandler}/>
            </Typography>
          </Box>
          
          <Button variant="outlined" color="success" onClick={()=>{navigate("/")}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>{' '}

				</CardContent>
			</Card>
    </div>
    )
}

export default BookDetail;