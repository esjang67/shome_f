import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DatePreiod from "../DatePreiod";
import { getFormettedDate } from "../../util/util_date";
import { useEffect, useState } from "react";

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
    width: 170,
  },
];

export default function ScheduleList({grade}) {

  const navigate = useNavigate();
  let today = new Date();
  let startdate = today.setDate(1);
  let enddate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date(enddate)));
  
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function onRowHandler(e) {
    if(grade === "P")
      navigate("/schedule/" + e.id);
  }

  function getList(){
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/schedule/all`, 
      {params: {"startDate": getFormettedDate(new Date(stdate)), "endDate": getFormettedDate(new Date(eddate))}})
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
  }, [])

 
  if(isLoading)
    return(<>...</>)

  return (
    <div className='ScheduleList'>
      <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      
      <Box sx={{ m:1 }}>
        <DataGrid sx={{ width: '100%' }} rows={list} columns={columns} density='compact'
          initialState={{pagination: {paginationModel: {pageSize: 10,},},}}
          pageSizeOptions={[10]} rowSelection={true}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>
    </div>
  );
}
