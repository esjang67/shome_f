import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getFormettedDate } from "../../util/util_date";

function CouponTime({setChange}){

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [time, setTime] = useState('');
  
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [content, setContent] = useState();

  const handleClickOpen = (e) => {
    setTime(e.target.dataset.userid)
    setOpen(true);
  };

  const handleSave = () => {
    if(!type){
      alert("쿠폰타입을 선택하세요.")
      return;
    }

    if(!content){
      alert("쿠폰내용을 입력하세요.")
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
      // alert(response.data);
      setList(response.data)
      setIsLoading(false);
      
    }).catch(error => {
      console.log(error);
    })
  }
  
  function useTime(e){
    const id = e.target.dataset.id;
    const time = document.querySelector(".time .MuiInputBase-input").value;
    axios.put(`${process.env.REACT_APP_SERVER_URL}/coupon/time`, {id:id, time:time})
    .then(response => {
      alert("쿠폰시간을 사용했습니다.");
      getList();
      e.target.previousSibling.value = '';
      setIsLoading(false);
      document.querySelector(".time .MuiInputBase-input").value = '';
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
      
      {
        list.map((data) => {
          return (
            <Box sx={{ display: 'flex' }} 
                  key={data.id} data-id={data.id} data-userid={data.user.name} >
              <Typography sx={{ width: '40%', fontSize: 20, }} variant={'button'}>
                {data.user.name} : {data.totaltime}
              </Typography>
              <TextField  sx={{ width: '25%', mr:0.5 }} maxLength={data.totaltime} 
                          type="number" variant="outlined" size="small" className="time" />{' '}
              <Button sx={{ mr:0.5 }} variant="outlined" color="secondary" data-id={data.id} onClick={useTime}>사용</Button>
              <Button variant="outlined" color="success" data-id={data.id} data-userid={data.user.userid} onClick={handleClickOpen}>추가</Button> 
              
            </Box>
          );
        })
      }
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>쿠폰 추가</DialogTitle>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CouponTime;