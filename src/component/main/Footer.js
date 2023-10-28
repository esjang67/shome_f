import { faCalendar, faClipboard, faBookOpenReader, faStar, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer({user}){
  const navigate = useNavigate();
  const [page, setPage] = useState('schedule');
//   console.log("footer" + user.userid ? 'false' : 'true')
// console.log(user);
  return(
    <div className="Footer">
      <ul>
        <li>
          <div className="menu">
            <Button variant="outlined" color={page === 'schedule'? "secondary": "primary"} 
                    onClick={()=>{navigate("/"); setPage("schedule")}}>
              <div className="menuicon"><FontAwesomeIcon icon={faCalendar} /></div>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outlined" color={page === 'doit'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{navigate("/doit"); setPage("doit")}}>
              <div className="menuicon"><FontAwesomeIcon icon={faClipboard} /></div>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outlined" color={page === 'library'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} onClick={()=>{
              if(user.grade === "P"){
                navigate("/library/admin")
              } else {
                navigate("/library")
              } 
              setPage("library")
            }}>
            <div className="menuicon"><FontAwesomeIcon icon={faBookOpenReader} /></div>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outlined" color={page === 'suggest'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{navigate("/suggest"); ; setPage("suggest")}}>
              <div className="menuicon"><FontAwesomeIcon icon={faStar} /></div>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outlined" color={page === 'coupon'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{
                if(user.grade === "P"){
                  navigate("/coupon/admin")
                } else {
                  navigate("/coupon")
                } 
                setPage("coupon")
              }}>
              <div className="menuicon"><FontAwesomeIcon icon={faDice} /></div>
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );

}

export default Footer;