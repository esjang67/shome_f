import { useNavigate } from "react-router-dom";
import DoitList from "../component/doit/DoitList";
import { useEffect, useState } from "react";
import SelectKids from "../component/SelectKids";
import { Button } from "@mui/material";
import { getFormettedDate } from "../util/util_date";
import axios from "axios";

function Doit({user}) {

  const navigate = useNavigate();
  const [kids, setKids] = useState("MIN");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    if((user.grade === 'K')){
      setKids(user.userid);
    }
    setIsLoading(false);
  },[isLoading])

  // 할일 초기화
  function todayDelete(){

    if(window.confirm("[경고] 오늘 일정을 삭제할까요?")){
      setIsLoading(true);
      
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/doit`, 
      {params: {"userid": kids, "basedate": getFormettedDate(new Date())}})
      .then(response => {
        alert("삭제했습니다.");
        setIsLoading(false);
      }).catch(error => {
        console.log(error);
        setIsLoading(false);
      })
    }
  }

  if(isLoading)
    return(<>...</>)

  return (
    <div className="Doit">
      {/* P : 배치관리, 민/도 선택 */}
      {(user.grade === 'P') ? 
          <Button color="secondary" onClick={()=> {navigate("/doit/batch")}}>배치관리</Button>
        : <h3>오늘의 할일</h3> }

      {(user.grade === 'P') ? 
          <Button color="error" onClick={todayDelete}>할일 초기화</Button>:''}

      {(user.grade === 'P') ? 
          <SelectKids kids={kids} setKids={setKids}/>
        : <h5>끝났으면 선택하고 완료하기!!</h5> }
      
      <DoitList user={user} kids={kids} />
    </div>
  )

}

export default Doit;