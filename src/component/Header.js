import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";
import { getFormettedDate } from "../util/util_date";
import { Button } from "react-bootstrap";

function Header({user}){
  
  const [today, setToday] = useState(Date);
  // const td = new Date();
  const navigate = useNavigate();

  return(
    <div className="Header">
      <div className="index"><Button variant="outline-info" onClick={()=> {navigate("/")}}>home</Button></div>
      <div className="todayStr">{getFormettedDate(new Date(today))}</div>
      <div className="login"><Button variant="outline-info" onClick={()=> {navigate("/login")}}>{user.name===''? 'login' : user.name}</Button></div>
    </div>
  );

}

export default Header;