import { faCalendar, faClipboard, faBookOpenReader, faStar, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Footer(){
  const navigate = useNavigate();

  return(
    <div className="Footer">
      <ul>
        <li>
          <div className="menu">
            <Button variant="outline-primary" onClick={()=>{
              navigate("/");
            }}>
              <div className="menuicon"><FontAwesomeIcon icon={faCalendar} /></div>
              <span className="menutext">Schedule</span>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outline-primary" onClick={()=>{
              navigate("/doit");
            }}>
              <div className="menuicon"><FontAwesomeIcon icon={faClipboard} /></div>
              <span className="menutext">Do It</span>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outline-primary">
            <div className="menuicon"><FontAwesomeIcon icon={faBookOpenReader} /></div>
            <span className="menutext">menu</span>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outline-primary">
              <div className="menuicon"><FontAwesomeIcon icon={faStar} /></div>
              <span className="menutext">menu</span>
            </Button>
          </div>
        </li>
        <li>
          <div className="menu">
            <Button variant="outline-primary">
              <div className="menuicon"><FontAwesomeIcon icon={faDice} /></div>
              <span className="menutext">menu</span>
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );

}

export default Footer;