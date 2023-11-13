import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getFormettedDate } from "../../util/util_date";
import { useEffect, useState } from "react";
import DateCalendarServerRequest from './Calendar';
import { Grid } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'basedate',
    headerName: '일자',
    width: 100,
  },
  {
    field: 'content',
    headerName: '일정',
    width: '170',
  },
];

export default function ScheduleList({grade}) {

  const navigate = useNavigate();
  const [selDate, setSelDate] = useState(new Date());
  
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function onRowHandler(e) {
    if(grade === "P")
      navigate("/schedule/" + e.id);
  }

  function getList(){
    let sdate = new Date(selDate).setDate(1);
    // console.log("sdate " + sdate)
    let eddate = new Date(new Date(selDate).getFullYear(), new Date(selDate).getMonth() + 1, 0)
    // console.log("eddate " + eddate)
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, 
      {params: { "startDate": getFormettedDate(new Date(sdate)), "endDate": getFormettedDate(new Date(eddate)) }})
      .then(response => {
      // console.log(response.data);
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  }

  //list 요청
  useEffect(()=> {
    getList();
  }, [selDate])

  if(isLoading)
    return(<>...</>)

  return (
    <div className='ScheduleList'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <DateCalendarServerRequest selDate={selDate} setSelDate={setSelDate} list={list} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ m:1 }}>
            <DataGrid sx={{ width: '100%' }} rows={list} columns={columns} density='compact'
              initialState={{pagination: {paginationModel: {pageSize: 10,},},}}
              pageSizeOptions={[10]} rowSelection={true}
              disableRowSelectionOnClick
              onRowClick={onRowHandler} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
