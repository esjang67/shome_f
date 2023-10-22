import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { getFormettedDate } from "../util/util_date";

function Header({user}){
  
  const [today, setToday] = useState(Date);
  // const td = new Date();
  const navigate = useNavigate();

  return(
    <div className="Header">
      <button onClick={()=> {navigate("/")}}>home</button>
      <button onClick={()=> {navigate("/login")}}>login</button>
      <div className="userIcon">{user.name}</div>
      <div className="todayStr">{getFormettedDate(new Date(today))}</div>
    </div>
  );

}

export default Header;