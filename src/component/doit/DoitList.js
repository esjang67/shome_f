import { useEffect, useState } from 'react';
import axios from 'axios';
import { getFormettedDate } from '../../util/util_date';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'content',
    headerName: '할일',
    width: 200,
  },
  {
    field: 'done',
    headerName: '완료',
    width: 50,
  },
];

function DoitList({user, kids}){
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  
  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doit`, 
    {params: {"userid": kids, "basedate": getFormettedDate(new Date())}})
    .then(response => {
      setList(response.data)
      setIsLoading(false);

    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
    getList();
  },[kids])
  
  function onRowHandler(e) {
    if(user.grade === "P")
      return;

    const getID = e.row.id;
    const chk = e.row.done;
    if(chk === "Y") {
      return
    }

    if(window.confirm("완료했나요?? ^___^:")){
      axios.put(`${process.env.REACT_APP_SERVER_URL}/doit/` + getID)
      .then(response => {
        // console.log(response.data);
        alert("잘했어~~~~ ^^")
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
      
      <Box sx={{ m:1 }}>
        <DataGrid sx={{ width: '100%' }} rows={list} columns={columns} 
          initialState={{pagination: {paginationModel: {pageSize: 10,},},}}
          pageSizeOptions={[10]} rowSelection={true}
          disableRowSelectionOnClick
          onRowClick={onRowHandler} />
      </Box>

    </div>
    )
}

export default DoitList;