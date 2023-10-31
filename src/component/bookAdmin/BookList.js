import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'name',
    headerName: '책이름',
    width: 250,
  },
];

// 전집코드로 조회한 책 리스트 가져오기
function BookList({collectId, clickUser}){

  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/book/all`, {params: {"colid": collectId}})
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
  }, [collectId])

  function onRowHandler(e) {
    const getID = e.row.id;
    // alert(getID + "  " + clickUser);
    if(clickUser===undefined){
      navigator("/library/admin/books/" + getID + "/" + collectId);
    } else {
      // 오늘 쓴 독후감이 있으면 수정할 수 있음(오늘쓴 독후감은 화면에 표시해야함)
      if(window.confirm("재미있었어? 독후감을 써볼까?")){
        navigator("/library/report/" + getID + "/" + clickUser.userid);
      }      
    }
  }
  if(isLoading)
  return(<>...</>)

  return(
    <div className="BookList">
      <Box sx={{ m:1 }}>
        <DataGrid sx={{ width: '100%' }} rows={list} columns={columns} density="compact"
          initialState={{pagination: {paginationModel: {pageSize: 10,},},}}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          onRowClick={onRowHandler}
          />
      </Box>
    </div>
  )
}
export default BookList;