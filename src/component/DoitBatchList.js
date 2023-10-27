import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'username',
    headerName: '이름',
    width: 80,
  },
  {
    field: 'defineday',
    headerName: '요일',
    width: 120,
  },
  {
    field: 'content',
    headerName: '할일',
    width: 250,
  },
];

function DoitBatchList(){
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const navigator = useNavigate();

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch/all`)
      .then(response => {
        console.log(response.data);
        const result = response.data;
        let setData = [];
        result.forEach(data => {
          setData.push({
            id:data.id,
            defineday:data.defineday,
            userid:data.user.userid,
            username:data.user.name,
            content:data.content
          })
        });
        setList(setData);
        setIsLoading(false);
      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  },[])
  
  function onRowHandler(e) {
    const getID = e.row.id;
    navigator("/doit/batch/" + getID);
  }

  if(isLoading)
    return(<>...</>)

    if(list===undefined){
    return
  }
  return (
    <div className="DoitBatchList">

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

export default DoitBatchList;