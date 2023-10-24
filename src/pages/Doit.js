import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DoitList from "../component/DoitList";
import { useEffect, useState } from "react";
import SelectKids from "../component/SelectKids";

function Doit({user}) {

  const navigate = useNavigate();
  const usebatch = {...user.grade ? true : false }
  const [kids, setKids] = useState("MIN");
  
  useEffect(()=> {
    if(!usebatch){
      setKids(user.userid);
    }
  },[])

  console.log(kids)
  return (
    <div className="Doit">
        {/* {loginCheck()} */}

        <h1>할일</h1>
        {usebatch ? 
          <Button onClick={()=> { navigate("/doit/batch")}}>배치등록</Button> 
          : '' }

        <SelectKids kids={kids} setKids={setKids}/>

        <DoitList user={user} kids={kids} />
    </div>
  )

}

export default Doit;