import { useNavigate } from 'react-router-dom';
import { getFormettedDate } from '../util/util_date';
import "./ScheduleItem.css"
import Card from 'react-bootstrap/Card';

function ScheduleItem({list}){
  
  const navigate = useNavigate();

  function onRowHandler(e) {
    const getID = e.target.dataset.id;
    // alert(getID);
    navigate("/schedule/" + getID);
  }

  return (
    <div className="ScheduleItem">

      {
        list.map((data) => {
          return (
            
              <Card className='item' key={data.id} data-id={data.id} onClick={onRowHandler}>
                <Card.Header>{getFormettedDate(new Date(data.basedate))}</Card.Header>
                <Card.Body>
                  <Card.Text>{data.content}</Card.Text>
                </Card.Body>
              </Card>
            
          );
        })
      }

    </div>
    )
}

export default ScheduleItem;