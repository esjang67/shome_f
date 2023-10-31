import { useNavigate } from "react-router-dom";
import DoitList from "../component/doit/DoitList";
import { useEffect, useState } from "react";
import SelectKids from "../component/SelectKids";
import { Button } from "@mui/material";

function Doit({user}) {

  const navigate = useNavigate();
  const [kids, setKids] = useState("MIN");
  
  useEffect(()=> {
    if((user.grade === 'K')){
      setKids(user.userid);
    }
  },[])

  return (
    <div className="Doit">
      {/* P : 배치관리, 민/도 선택 */}
      {(user.grade === 'P') ? 
        <Button color="secondary" onClick={()=> {navigate("/doit/batch")}}>배치관리</Button>: <h3>오늘의 할일</h3> }

      {(user.grade === 'P') ? <SelectKids kids={kids} setKids={setKids}/> :<h5>끝났으면 선택하고 완료하기!!</h5> }
      
      <DoitList user={user} kids={kids} />
    </div>
  )

}

export default Doit;