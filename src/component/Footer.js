import { faCalendar, faClipboard, faBookOpenReader, faStar, faDice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";

function Footer(){

  return(
    <div className="Footer">
      <ul>
        <li>
          <div className="menu">
            <div className="menuicon"><FontAwesomeIcon icon={faCalendar} /></div>
            <span className="menutext">menu</span>
          </div>
        </li>
        <li>
          <div className="menu">
            <div className="menuicon"><FontAwesomeIcon icon={faClipboard} /></div>
            <span className="menutext">menu</span>
          </div>
        </li>
        <li>
          <div className="menu">
            <div className="menuicon"><FontAwesomeIcon icon={faBookOpenReader} /></div>
            <span className="menutext">menu</span>
          </div>
        </li>
        <li>
          <div className="menu">
            <div className="menuicon"><FontAwesomeIcon icon={faStar} /></div>
            <span className="menutext">menu</span>
          </div>
        </li>
        <li>
          <div className="menu">
            <div className="menuicon"><FontAwesomeIcon icon={faDice} /></div>
            <span className="menutext">menu</span>
          </div>
        </li>
      </ul>
    </div>
  );

}

export default Footer;