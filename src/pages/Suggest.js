import { faFaceLaugh, faFaceMehBlank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import DatePreiod from "../component/DatePreiod";
import axios from "axios";
import { getFormettedDate } from "../util/util_date";
import { useEffect, useState } from "react";
import SuggestList from "../component/suggest/SuggestList";

function Suggest({user}){

  const [stdate, setStdate] = useState(new Date());
  const [eddate, setEddate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    const tmpStDate = getFormettedDate(stdate);
    const tmpEdDate = getFormettedDate(eddate);
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/suggest/all`, 
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
    <div className="Suggest">
      <Button>추가</Button>
      <br/><hr/><br/>
      <div className="preiod">
        <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      </div>
      <br/><hr/><br/>
      <SuggestList list={list} grade={user.grade}/>
    </div>
  )
}

export default Suggest;