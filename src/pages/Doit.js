import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DoitList from "../component/DoitList";
import { useEffect, useState } from "react";
import SelectKids from "../component/SelectKids";

function Doit({user}) {

  const navigate = useNavigate();
  // const usebatch = {...user.grade === 'P' ? true : false }
  const [kids, setKids] = useState("MIN");
  
  useEffect(()=> {
    if((user.grade === 'K')){
      setKids(user.userid);
    }
  },[])

  console.log(kids)
  return (
    <div className="Doit">
        {/* {loginCheck()} */}

        <h1>할일</h1>
        {(user.grade === 'P') ? 
          <Button onClick={()=> { navigate("/doit/batch")}}>배치관리</Button>
          : '' }
        <br/><hr/><br/>
        {(user.grade === 'P') ? 
        <SelectKids kids={kids} setKids={setKids}/>
        : <h4>오늘의 할일 확인해봐</h4>}
        <br/><hr/><br/>

        <DoitList user={user} kids={kids} />
    </div>
  )

}

export default Doit;