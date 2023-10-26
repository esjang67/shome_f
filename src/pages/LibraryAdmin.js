import { useNavigate } from "react-router-dom";
import ReportList from "../component/bookAdmin/ReportList";
import { Button } from "@mui/material";

function LibraryAdmin(){

  const navigate = useNavigate();
    
  return(
    <div className="LibraryAdmin">
      <h1>Book Report List</h1>

      <div className="book">
        <Button variant="outlined" color="primary" onClick={()=> {
          navigate("/library/admin/books")
        }}>책 관리자</Button>
      </div>
      <br/><hr/><br/>

      <div className="report-list">
        <ReportList />
      </div>
    </div>
  )
}

export default LibraryAdmin;