import { useNavigate } from 'react-router-dom';
import { getFormettedDate } from '../util/util_date';
import "./ScheduleItem.css"
import { useEffect } from 'react';

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
            <div className='item' key={data.id} data-id={data.id} onClick={onRowHandler}>
              <p>{getFormettedDate(new Date(data.basedate))}</p>
              <p>{data.content}</p>
            </div>
          );
        })
      }

    </div>
    )
}

export default ScheduleItem;