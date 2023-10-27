import { useEffect, useState } from 'react';
import axios from 'axios';
import { getFormettedDate } from '../util/util_date';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'basedate',
    headerName: '기준일자',
    width: 100,
  },
  {
    field: 'username',
    headerName: '이름',
    width: 80,
  },
  {
    field: 'content',
    headerName: '할일',
    width: 250,
  },
  {
    field: 'done',
    headerName: '완료',
    width: 50,
  },
];

function DoitList({kids}){
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  
  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doit`, 
    {params: {"userid": kids, "basedate": getFormettedDate(new Date())}})
    .then(response => {
      // console.log(response.data);
      const result = response.data;
      let setData = [];
      result.forEach(data => {
        setData.push({
          id:data.id,
          basedate:data.basedate,
          userid:data.user.userid,
          username:data.user.name,
          content:data.content,
          done:data.done
        })
      });
      setList(setData)
      setIsLoading(false);

    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
    getList();
  },[kids])
  
  function onRowHandler(e) {
    console.log(e.row.done)
    const getID = e.row.id;
    const chk = e.row.done;
    if(chk === "Y") {
      return
    }

    if(window.confirm("완료했나요?? ^___^:")){
      axios.put(`${process.env.REACT_APP_SERVER_URL}/doit/` + getID)
      .then(response => {
        console.log(response.data);
        alert(response.data)
        getList();
      }).catch(error => {
        console.log(error);
      })
    }
  }

  if(isLoading)
    return(<>...</>)

  if(list===undefined){
    return
  }
  return (
    <div className="DoitList">
      
      <Box sx={{ width: '100%' }}>
        <DataGrid rows={list} columns={columns} 
          initialState={{pagination: {paginationModel: {pageSize: 5,},},}}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>

    </div>
    )
}

export default DoitList;