import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fnCollectList from "./fnCollectList"
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'name',
    headerName: '이름',
    width: 150,
  },
  {
    field: 'delyn',
    headerName: '사용',
    width: 50,
  },
];

// 전집리스트 가져오기
function CollectList(){

  const navigator = useNavigate();
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    fnCollectList()
    .then(result => {
      // console.log(result);
      setList(result)
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  function onRowHandler(e) {
    const getID = e.row.id;
    // alert(getID);
    navigator("/library/admin/collect/" + getID);
  }
  
  if(isLoading)
    return(<>...</>)

  return(
    <div className="CollectList">
      <Box sx={{ width: '100%' }}>
        <DataGrid rows={list} columns={columns} density="compact"
          initialState={{pagination: {paginationModel: {pageSize: 5,},},}}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>

    </div>
  )
}
export default CollectList;