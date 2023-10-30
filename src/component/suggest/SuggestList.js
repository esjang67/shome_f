import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function SuggestList({ grade }){
  
  let startdate = new Date() 
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [seldate, setSeldate] = useState(getFormettedDate(new Date()));

  function getList(){
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/suggest/all`, 
      {params: {"startDate": stdate, "endDate": eddate}})
      .then(response => {
      console.log(response.data);
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
    const getID = e.target.parentNode.parentNode.dataset.id;
    // alert(getID)

    const okflag = e.target.parentNode.parentNode.dataset.okflag;
    if(okflag === "Y"){
      alert("이미 등록된 일정으로 삭제할 수 없어요.")
      return
    }

    if(window.confirm("삭제할까요?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/suggest/` + getID)
      .then(response => {
        console.log(response.data);
        alert(response.data)
      }).catch(error => {
        console.log(error);
      })
    }
  
  }

  function scheduleAdd(e){
    const getID = e.target.dataset.id;
    // alert(getID + seldate)

    const okflag = e.target.dataset.okflag;
    if(okflag === "Y"){
      alert("이미 등록된 일정입니다.")
      return
    }

    if(window.confirm("일정에 등록할까요?")){
      setIsLoading(false);
      axios.put(`${process.env.REACT_APP_SERVER_URL}/suggest/ok/` + getID, {seldate:seldate})
      .then(response => {
        console.log(response.data);
        alert("일정에 등록하였습니다.")
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
      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>
      <hr/>
      <Box sx={{ width: '100%' }}>
        {
          list.map((data) => {
            return (
              <Card variant="outlined" sx={{ minWidth: 275, display: 'flex' }} key={data.id} >
                <Box sx={{ width: '60%' }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                      {data.basedate}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>
                      {data.user.name}
                    </Typography>
                    <Typography variant="body1">
                      {data.content}
                    </Typography>
                    {data.okflag === "N"? <Button size="large" color="error" onClick={deleteData}>삭제</Button> : ''}     
                  </CardContent>
                </Box>
                <Box sx={{ width: '40%' }}>
                  <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">일자선택</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <ButtonDatePicker
                        label={seldate == null ? null : seldate}  
                        value={dayjs(seldate)}
                        onChange={(stValue)=> setSeldate(stValue) }/>
                    </LocalizationProvider>
                    <Button variant="outlined" color="primary" data-id={data.id} data-okflag={data.okflag} 
                            onClick={scheduleAdd}>일정등록</Button>
                  </CardContent>
                </Box>
              </Card>
            );
          })
        }
      </Box>

    </div>
    )
}

export default SuggestList;