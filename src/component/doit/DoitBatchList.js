import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SelectKids from '../SelectKids';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'defineday',
    headerName: '요일',
    width: 100,
  },
  {
    field: 'content',
    headerName: '할일',
    width: 180,
  },
];

function DoitBatchList(){

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const navigator = useNavigate();
  const [kids, setKids] = useState("MIN");

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch/all/user`, {params: {"userid": kids}})
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
  },[kids])
  
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
      <SelectKids kids={kids} setKids={setKids}/>

      <Box sx={{ m:1 }}>
        <DataGrid sx={{ width: '100%' }} rows={list} columns={columns} density='compact'
          initialState={{pagination: {paginationModel: {pageSize: 10,},},}}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>

    </div>
    )
}

export default DoitBatchList;