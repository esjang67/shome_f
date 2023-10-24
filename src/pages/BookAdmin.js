import { Button } from "react-bootstrap";
import Report from "../component/bookAdmin/Report";
import { useEffect, useState } from "react";
import DatePreiod from "../component/DatePreiod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookAdmin(){

  const navigate = useNavigate();
  const [stdate, setStdate] = useState(new Date());
  const [eddate, setEddate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    const tmpStDate = new Date(stdate).getTime();
    const tmpEdDate = new Date(eddate).getTime();
    
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
    <div className="BookAdmin">
      <h1>북 관리자</h1>

      <div className="book">
        <Button onClick={()=> {
          navigate("/book/admin/library")
        }}>책 관리자</Button>
      </div>
      <br/><hr/><br/>

      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>

      <div className="report-list">
        <Report list={list} />
      </div>
    </div>
  )
}

export default BookAdmin;