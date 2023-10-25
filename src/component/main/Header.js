import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header({user}){
  
  // const [today, setToday] = useState(Date);
  // const td = new Date();
  const navigate = useNavigate();

  // 한글을 사용하는 요일을 위해서는 추가적으로 배열을 만들어서 사용합니다.
  let day = ['일', '월', '화', '수', '목', '금', '토'];
  let today = new Date();

  //1번 포맷
  let dateFormat1 = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 '
    + today.getDate() + '일 ' + day[today.getDay()] + '요일 ';
      
  // //2번 포맷
  // let dateFormat2 = today.getFullYear() +
  //   '-' + ( (today.getMonth()+1) < 9 ? "0" + (today.getMonth()+1) : (today.getMonth()+1) )+
  //   '-' + ( (today.getDate()) < 9 ? "0" + (today.getDate()) : (today.getDate()) );

  // function dateFormat(date) {
  //   let dateFormat2 = date.getFullYear() +
  //     '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
  //     '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
  //   return dateFormat2;
  // }

  function loginBtn(){
    navigate("/login");
  }
  
  return(
    <div className="Header">
      <div className="index"><Button variant="outline-info" onClick={()=> {navigate("/")}}>home</Button></div>
      <div className="todayStr">{dateFormat1}</div>
      <div className="login"><Button variant="outline-info" onClick={loginBtn}>{user.name===''? 'login' : user.name}</Button></div>
    </div>
  );

}

export default Header;