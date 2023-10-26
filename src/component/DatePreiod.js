import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { getFormettedDate } from "../util/util_date";

function DatePreiod({stdate, setStdate, eddate, setEddate, getList}){

  const pickDateHandler = (type, date) => {
    if(type === "st"){

      setStdate(getFormettedDate(new Date(date)));
      console.log(stdate)
    }
    if(type === "ed"){
      setEddate(getFormettedDate(new Date(date)));
      console.log(eddate)
    }
  };

  return (
    <div className="DatePreiod">
        <ReactDatePicker id="pickdate-st" dateFormat="yyyy-MM-dd"
            selected={new Date(stdate)}
            onChange={(date) => pickDateHandler("st", date)} /> ~ 
        <ReactDatePicker id="pickdate-ed" dateFormat="yyyy-MM-dd"
            selected={new Date(eddate)}
            onChange={(date) => pickDateHandler("ed", date)} />            

        <Button variant="outline-primary" size="sm" onClick={getList} > 
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </div>
    )
}

export default DatePreiod;