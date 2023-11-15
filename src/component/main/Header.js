import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header({user, setPage}){
  
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

  function goHome(){
    navigate("/");
    setPage('schedule');
  }
  
  return(
    <Box className="Header">
      <img className="logo" src={process.env.PUBLIC_URL + '/android-icon-144x144.png'} alt="SweetHome" onClick={goHome} />
      <Typography className="todayStr" sx={{ fontSize:15 }}>{dateFormat1}</Typography>
      <Button className="login" sx={{ minWidth:"50px" }} variant="contained" size="small" color="secondary" 
            onClick={loginBtn}>{user.name===''? 'login' : user.name}</Button>
    </Box>
  );

}

export default Header;