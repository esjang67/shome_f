import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import DatePreiod from "../component/DatePreiod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReportList from "../component/bookAdmin/ReportList";
import { getFormettedDate } from "../util/util_date";

function LibraryAdmin(){

  const navigate = useNavigate();
  const [stdate, setStdate] = useState(new Date());
  const [eddate, setEddate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    const tmpStDate = getFormettedDate(stdate);
    const tmpEdDate = getFormettedDate(eddate);
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/report/all`, 
      {params: {"startDate": tmpStDate, "endDate": tmpEdDate}})
      .then(response => {
      console.log(response.data);
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  }, [])

  if(isLoading)
    return(<>...</>)
    
  return(
    <div className="LibraryAdmin">
      <h1>Book Report List</h1>

      <div className="book">
        <Button onClick={()=> {
          navigate("/library/admin/books")
        }}>책 관리자</Button>
      </div>
      <br/><hr/><br/>

      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>

      <div className="report-list">
        <ReportList list={list} />
      </div>
    </div>
  )
}

export default LibraryAdmin;