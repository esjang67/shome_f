import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectKids from '../SelectKids';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';

function DoitBatchDetail() {

  const {id} = useParams();
  const navigator = useNavigate();
  const [kids, setKids] = useState("MIN");
  const [isLoading, setIsLoading] = useState(true);
  const [batch, setBatch] = useState({
    id:'',
    user:{userid:'', name:''},
    defineday:'',
    content:''
  })
  const [chkDay, setChkDay] = useState({
    월:false, 화:false, 수:false, 목:false, 금:false, 토:false, 일:false
  })

  function getData(){
    if(id !== undefined){
      axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, {params: {"id": id}})
      .then(response => {
        // console.log(response.data)
        setBatch(response.data);
        setKids(response.data.user.userid);
        findDay(response.data.defineday);
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    } else {
      setIsLoading(false);
    }
  }
  
  function findDay(str){
    let arr = str.split("");
    let days={};
    
    arr.forEach(d => {
      days[d] = true;
    })

    setChkDay({
      ...chkDay,
      ...days
    })
    
  }  

  useEffect(()=> {
    getData();
  }, [isLoading])
  
  function saveData(){

    let day='';
    for(const [key, value] of Object.entries(chkDay)) {
      if(value){
        day += key;
      }
    }

    const reqBatch = {
      ...batch,
      user: {userid : kids },
      defineday: day
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}/doitbatch`, reqBatch)
    .then(response => {
      alert("저장했습니다.");
      navigator(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }
  function deleteData(){
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/doitbatch/` + batch.id)
    .then(response => {
      alert("삭제했습니다.");
      navigator(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }
  
  function selData(e){
    setChkDay({
      ...chkDay,
      [e.target.value]:e.target.checked
    })
  }
  
  if(isLoading)
    return(<>...</>)

  const {월,화,수,목,금,토,일} = chkDay;

  return (
    <div className='DoitBatchDetail'>
      <Card sx={{ maxWidth: 345, m:1 }} variant="outlined">
				<CardHeader title="할일 관리" />
				<CardContent>
          {id === undefined ? <SelectKids kids={kids} setKids={setKids} /> : `${batch.user.name}`}
          <FormGroup aria-label="position" row onChange={selData} >
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="월" checked={월} onChange={selData} />} label="월" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="화" checked={화} onChange={selData} />} label="화" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="수" checked={수} onChange={selData} />} label="수" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="목" checked={목} onChange={selData} />} label="목" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="금" checked={금} onChange={selData} />} label="금" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="토" checked={토} onChange={selData} />} label="토" labelPlacement="bottom" />
            <FormControlLabel sx={{ m:0 }} control={<Checkbox value="일" checked={일} onChange={selData} />} label="일" labelPlacement="bottom" />
          </FormGroup>

          <Box sx={{ py: 2, display: 'grid', alignItems: 'center' }}>
            <TextField id="outlined-basic" label="할일" variant="outlined" name="content" size="small"
                  onChange={(e)=> {
                    setBatch({
                      ...batch,
                      content: e.target.value
                    })
                  }} defaultValue={batch.content} />
            
          </Box>
          
          <Button variant="outlined" color="success" onClick={()=>{navigator(-1)}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>

				</CardContent>
			</Card>
      
    </div>  
  );
}

export default DoitBatchDetail;