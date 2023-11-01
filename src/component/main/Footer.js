import { faCalendar, faClipboard, faBookOpenReader, faStar, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Footer({user, page, setPage}){
  const navigate = useNavigate();

  return(
    <div className="Footer">
      <ul>
        <li>
          <div className="menu">
            <Button sx={{ height:"43px", fontSize:"22px", minWidth:"40px", maxWidth:"50px" }} variant="outlined" color={page === 'schedule'? "secondary": "primary"} 
                    onClick={()=>{navigate("/"); setPage("schedule")}}>
              <FontAwesomeIcon icon={faCalendar} />
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button sx={{ height:"43px", fontSize:"22px", minWidth:"40px", maxWidth:"50px" }} variant="outlined" color={page === 'doit'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{navigate("/doit"); setPage("doit")}}>
              <FontAwesomeIcon icon={faClipboard} />
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button sx={{ height:"43px", fontSize:"22px", minWidth:"40px", maxWidth:"50px" }} variant="outlined" color={page === 'library'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} onClick={()=>{
              if(user.grade === "P"){
                navigate("/library/admin")
              } else {
                navigate("/library")
              } 
              setPage("library")
            }}>
            <FontAwesomeIcon icon={faBookOpenReader} />
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button sx={{ height:"43px", fontSize:"22px", minWidth:"40px", maxWidth:"50px" }} variant="outlined" color={page === 'suggest'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{navigate("/suggest"); ; setPage("suggest")}}>
              <FontAwesomeIcon icon={faStar} />
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button sx={{ height:"43px", fontSize:"22px", minWidth:"40px", maxWidth:"50px" }} variant="outlined" color={page === 'coupon'? "secondary": "primary"} 
                    disabled={user.userid ? false : true} 
                    onClick={()=>{
                if(user.grade === "P"){
                  navigate("/coupon/admin")
                } else {
                  navigate("/coupon")
                } 
                setPage("coupon")
              }}>
              <FontAwesomeIcon icon={faDice} />
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );

}

export default Footer;