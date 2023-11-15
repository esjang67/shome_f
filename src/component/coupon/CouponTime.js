import { Box, Button, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getFormettedDate } from "../../util/util_date";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function CouponTime({setChange}){

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [time, setTime] = useState('');
  
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [content, setContent] = useState();

  const [useTime, setUseTime] = useState();
  const [sel, setSel] = useState(0);

  const handleClickOpen = (e) => {
    e.stopPropagation();

    setTime(e.target.parentNode.dataset.userid);//target.parentNode.dataset.id
    setOpen(true);
  };

  const handleSave = () => {
    if(!type){
      alert("쿠폰타입을 선택하세요.");
      return;
    }

    if(!content){
      alert("쿠폰내용을 입력하세요.");
      return;
    }

    const playtime = type==='ERRAND'? 5:10;
    const sendCoupon = {
      basedate: getFormettedDate(new Date()),
      user: {userid: time},
      type:type,
      content:content,
      playtime:playtime
    }

    if(window.confirm("쿠폰을 추가할까요?")){
      setIsLoading(true);
      setChange(true);
      axios.post(`${process.env.REACT_APP_SERVER_URL}/coupon`, sendCoupon)
      .then(response => {
        alert("저장했습니다.");
      }).catch(error => {
        console.log(error);
      })
    }
    setOpen(false);  
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  // 총 적립시간(사용자별) 가져오기
  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/coupon/time/all`)
    .then(response => {
      setList(response.data)
      setIsLoading(false);
      
    }).catch(error => {
      console.log(error);
    })
  }
  
  function useTimeHandler(){
    // console.log({id:sel, time:useTime})
    axios.put(`${process.env.REACT_APP_SERVER_URL}/coupon/time`, {id:sel, time:useTime})
    .then(response => {
      alert("쿠폰시간을 사용했습니다.");
      getList();
      setUseTime('');
      setIsLoading(false);
      
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
    getList();
    setChange(false);
  }, [isLoading])

  if(isLoading)
    return(<>...</>)

  return(
    <div className="CouponTime">
      <Box sx={{ m:1, p:1, border: '1px dashed grey', borderRadius:1 }}>
      {
        list.map((data, i) => {
          return (
            <Box sx={{ display: 'flex' }} 
                 key={data.id} data-id={data.id} data-userid={data.username} >
              <Typography sx={{ width: '40%', fontSize: 20, }} variant={'button'}>
                {data.username} : {data.totaltime}
              </Typography>
              <TextField  sx={{ width: '15%', mr:0.5 }} maxLength={data.totaltime} 
                          type="number" variant="standard" size="small" id={`time${data.id}`} 
                          value={useTime}
                          onChange={(e)=>{
                            console.log(e.target.value);
                            setUseTime(e.target.value);
                            setSel(data.id);
                          }}  />{' '}

              <IconButton sx={{ mr:0.5 }} 
                      color="secondary" size="small"
                      data-id={data.id} 
                      onClick={useTimeHandler}><RemoveIcon/></IconButton>

              <IconButton color="success"  size="small"
                      data-id={data.id} data-userid={data.userid} value={i}
                      onClick={handleClickOpen}><AddIcon/></IconButton> 
            </Box>
          );
        })
      }
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>쿠폰 추가 {time}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            심부름을 했을 때와 칭찬으로 쿠폰을 추가할 수 있어요.
          </DialogContentText>

          <RadioGroup name="use-radio-group" onChange={handleRadioChange}>
            <FormControlLabel value="ERRAND" control={<Radio />} label="심부름" />
            <FormControlLabel value="AMAZING" control={<Radio />} label="칭찬" />
          </RadioGroup>

          <TextField autoFocus margin="dense" id="content" label="쿠폰 내용"
            type="text" fullWidth variant="standard" onChange={handleContent} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
          <Button onClick={handleSave}>쿠폰추가</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CouponTime;