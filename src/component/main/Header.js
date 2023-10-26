import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header({user}){
  
  const navigate = useNavigate();

  // 한글을 사용하는 요일을 위해서는 추가적으로 배열을 만들어서 사용합니다.
  let day = ['일', '월', '화', '수', '목', '금', '토'];
  let today = new Date();

  //1번 포맷
  let dateFormat1 = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 '
    + today.getDate() + '일 ' + day[today.getDay()] + '요일 ';
     
  function loginBtn(){
    navigate("/login");
  }
  
  return(
    <div className="Header">
      <div className="index"><Button variant="outlined" color="primary" onClick={()=> {navigate("/")}}>home</Button></div>
      <div className="todayStr"><Typography>{dateFormat1}</Typography></div>
      <div className="login"><Button variant="outlined" color="primary" onClick={loginBtn}>{user.name===''? 'login' : user.name}</Button></div>
    </div>
  );

}

export default Header;