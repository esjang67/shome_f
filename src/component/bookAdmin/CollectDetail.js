import { Box, Button, Card, CardContent, CardHeader, Checkbox, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CollectDetail(){

  const {id} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [collect, setCollect] = useState({
    id:'',
    name: '',
    delyn:'N'
  })

  function saveData(){
    axios.post(`${process.env.REACT_APP_SERVER_URL}/collect`, collect)
    .then(response => {
      alert("저장했습니다.");
      navigate(-1)
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    if(window.confirm("[경고] DATABASE에서 삭제됩니다. 삭제 하시겠습니까?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/collect/` + id)
      .then(response => {
        alert("삭제했습니다.");
        navigate(-1)
      }).catch(error => {
        console.log(error);
      })    
    }
  }  

  function changeHandler(e) {
    // console.log( e.target.checked)
    if(e.target.name ==='delyn'){
      setCollect({
        ...collect,
        [e.target.name] : e.target.checked ? "Y" : "N"
      })    
    } else {
      setCollect({
        ...collect,
        [e.target.name] : e.target.value
      })
    }
  }

  // 데이터 가져오기
  function getData(){
    if(id !== undefined){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/collect`, {params: {"id": id}})
      .then(response => {
        setCollect(response.data);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    } else {
      setIsLoading(false);
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])

  if(isLoading)
  return(<>...</>)

  return(
    <div className="CollectDetail">
      <Card sx={{ maxWidth: 345, m:2 }} variant="outlined">
				<CardHeader title="전집 관리" />
				<CardContent>
          <Box sx={{ display: 'grid', alignItems: 'center' }}>
            <TextField id="outlined-basic" label="이름" variant="outlined" name="name" size="small"
                  onChange={changeHandler} defaultValue={collect.name} />
            <Typography> 
              사용안함 : 
              <Checkbox name="delyn" color="error" checked={collect.delyn === "Y" ? true: false}
                              onChange={changeHandler}/>
            </Typography>
          </Box>
          
          <Button variant="outlined" color="success" onClick={()=>{navigate(-1)}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>

				</CardContent>
			</Card>

    </div>
    )
}

export default CollectDetail;