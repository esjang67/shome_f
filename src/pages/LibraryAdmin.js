import { useNavigate } from "react-router-dom";
import ReportList from "../component/bookAdmin/ReportList";
import { Button } from "@mui/material";

function LibraryAdmin(){

  const navigate = useNavigate();
    
  return(
    <div className="LibraryAdmin">
      <Button color="secondary" onClick={()=> {navigate("/library/admin/books")}}>책 관리자</Button>
      <ReportList />
    </div>
  )
}

export default LibraryAdmin;