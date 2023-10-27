import { useNavigate } from "react-router-dom";
import DoitList from "../component/DoitList";
import { useEffect, useState } from "react";
import SelectKids from "../component/SelectKids";
import { Button, Typography } from "@mui/material";

function Doit({user}) {

  const navigate = useNavigate();
  const [kids, setKids] = useState("MIN");
  
  useEffect(()=> {
    if((user.grade === 'K')){
      setKids(user.userid);
    }
  },[])

  console.log(kids)
  return (
    <div className="Doit">
      <h1>오늘의 할일</h1>
      
      {(user.grade === 'P') ? 
        <Button variant="outlined" color="secondary" onClick={()=> { navigate("/doit/batch")}}>배치관리</Button>: '' }
      <hr/>
      {(user.grade === 'P') ? 
      <SelectKids kids={kids} setKids={setKids}/>
      : <h4>다 했으면 완료 체크하기!!</h4>}
      <hr/>

      <DoitList user={user} kids={kids} />
    </div>
  )

}

export default Doit;