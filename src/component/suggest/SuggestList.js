import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import ClearIcon from '@mui/icons-material/Clear';

function SuggestList({ grade, userid }){
  
  let startdate = new Date() 
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [seldate, setSeldate] = useState(getFormettedDate(new Date()));

  function getList(){
    let std = getFormettedDate(new Date(stdate));
    let edd = getFormettedDate(new Date(eddate));
    axios.get(`${process.env.REACT_APP_SERVER_URL}/suggest/all`, 
      {params: {"startDate": std, "endDate": edd}})
      .then(response => {
      // console.log(response.data);
      setList(response.data);
      setIsLoading(false);
      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  }, [isLoading])
  
  function ButtonField(props) {
    const {
      setOpen,
      label,
      id,
      disabled,
      InputProps: { ref } = {},
      inputProps: { 'aria-label': ariaLabel } = {},
    } = props;
  
    return (
      <Button
        // variant="outlined"
        id={id}
        disabled={disabled}
        ref={ref}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
      >
        {label ? `${getFormettedDate(new Date(label))}` : 'Pick a date'}
      </Button>
    );
  }

  function ButtonDatePicker(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  }

  function deleteData(e){

    const getID = e.target.parentNode.dataset.id;
    const selUserid = e.target.parentNode.dataset.userid

    if(userid !== selUserid){
      alert("다른 사람이 등록한 일정은 삭제할 수 없어요.")
      return
    }

    const okflag = e.target.parentNode.dataset.okflag;
    if(okflag === "Y"){
      alert("이미 등록된 일정으로 삭제할 수 없어요.")
      return
    }

    if(window.confirm("삭제할까요?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/suggest/` + getID)
      .then(response => {
        // console.log(response.data);
        alert("삭제했습니다.")
      }).catch(error => {
        console.log(error);
      })
    }
  
  }

  function scheduleAdd(e){
    const getID = e.target.dataset.id;
    const okflag = e.target.dataset.okflag;

    if(okflag === "Y"){
      alert("이미 등록된 일정입니다.")
      return
    }

    if(window.confirm("일정에 등록할까요?")){
      setIsLoading(false);
      axios.put(`${process.env.REACT_APP_SERVER_URL}/suggest/ok/` + getID, {seldate:seldate})
      .then(response => {
        // console.log(response.data);
        alert("일정에 등록했습니다.")
        setIsLoading(true);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  if(isLoading)
    return(<>...</>)
  
  return (
    <div className="SuggestList">
      <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      
      <Grid container spacing={1}>
        {
          list.map((data) => {
            return (
              <Grid item xs={6} md={3}>
                <Card variant="outlined" key={data.id} 
                      sx={{ width:grade==="P"? "95%": "95%", m:'auto', mb:1, display: 'grid' }} >

                  <Box sx={{ p:1 }}>
                      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>{data.basedate}</Typography>
                      <Typography sx={{ fontSize: 14 }}>[{data.type}] {data.username}</Typography>
                      <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{data.content}</Typography>
                      
                      {(data.okflag === "N" && data.userid === userid) ? 
                        <Button size="large" color="error" 
                                data-id={data.id} data-userid={data.userid} data-okflag={data.okflag} 
                                onClick={deleteData}><ClearIcon/></Button> : ''}     
                  </Box>
                  {grade==="P"? 
                  <Box sx={{ p:1, display: 'flex', justifyContent: 'space-around', borderTop:'1px dashed grey' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">일자<br/>선택</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <ButtonDatePicker
                          label={seldate == null ? null : seldate}  
                          value={dayjs(seldate)}
                          onChange={(stValue)=> setSeldate(stValue) }/>
                      </LocalizationProvider>
                      <Button color="primary" data-id={data.id} data-okflag={data.okflag} 
                              endIcon={<FontAwesomeIcon icon={faSquarePlus} />}
                              onClick={scheduleAdd}>일정</Button>
                  </Box> :''}
                </Card>
              </Grid>
            );
          })
        }
      </Grid>
    </div>
    )
}

export default SuggestList;