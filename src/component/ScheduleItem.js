import { useNavigate } from 'react-router-dom';
import { getFormettedDate } from '../util/util_date';
import "./ScheduleItem.css"
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function ScheduleItem({list}){
  
  const navigate = useNavigate();
// console.log(list);

  useEffect(()=>{
  
  
  })

  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    alert(getID);
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