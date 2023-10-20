import axioxC from '../util/axiosC';
import { useEffect, useState } from 'react';
import { getFormettedDate } from '../util/util_date';

import "./ScheduleItem.css"
import { Link } from 'react-router-dom';

function ScheduleItem({stdate, eddate}){
  
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // list 요청
  useEffect(()=> {
    console.log("list 요청")
    axioxC.get("/schdule/all", 
              {
                "startDate":stdate,
                "endDate":eddate
              })
      .then(response => {
        console.log("schdule/all" + response.data);
        setList(response.data);
        setIsLoading(false);
        
      }).catch(error => {
        console.log(error);
      })
  }, [])

  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    alert(getID);
    //navigate("/schedule/" + getID);
  }

  // if(list===null){
  //   return
  // }

  if(isLoading)
    return(<></>)

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