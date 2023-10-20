import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header(){
  
  const [today, setToday] = useState(Date);
  // const td = new Date();
  const navigate = useNavigate();

  return(
    <div className="Header">
      <button onClick={()=> {navigate("/")}}>home</button>
      <div className="userIcon">사용자</div>
      <div className="todayStr">{today}</div>
    </div>
  );

}

export default Header;