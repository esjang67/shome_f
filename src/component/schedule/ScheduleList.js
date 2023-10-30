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
    width: 200,
  },
];

export default function ScheduleList() {

  const navigate = useNavigate();
  let startdate = new Date().setDate(1); 
  let enddate = new Date().setMonth((new Date().getMonth()) + 1);
  enddate = new Date(enddate).setDate(0); 
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date(enddate)));
  
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function onRowHandler(e) {
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
      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>
      <hr/>
      <Box sx={{ width: '100%' }}>
        <DataGrid rows={list} columns={columns} 
          initialState={{pagination: {paginationModel: {pageSize: 8,},},}}
          pageSizeOptions={[8]} rowSelection={true}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>
    </div>
  );
}
