import "./ScheduleItem.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

function DoitBatchList({setIsChange, setSelid, setModalShow}){
  console.log("DoitBatchList")
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    console.log("/doitbatch/all");
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch/all`)
      .then(response => {
        console.log(response.data);
        setList(response.data);
        setIsLoading(false);
        // setIsChange(false); 
      }).catch(error => {
      console.log(error);
      })
      console.log("DoitBatchList getList")
  }

  useEffect(()=> {
    console.log("DoitBatchList useEffect")
    getList();
  },[isLoading])

  
  function onRowHandler(e) {
    const getID = e.target.dataset.id;
    // alert(getID);
    setSelid(getID);
    setModalShow(true);
  }

  if(isLoading)
    return(<>...</>)
// console.log(list)
  if(list===undefined){
    return
  }
  return (
    <div className="DoitBatchList">
      {
        list.map((data) => {
          return (
              <ListGroup.Item action variant={data.user.userid ==="MIN" ? "primary" : "danger"} 
                      key={data.id} data-id={data.id} 
                      onClick={onRowHandler}>{data.user.name} : {data.defineday} : {data.content}</ListGroup.Item>
            );
          })
      }

    </div>
    )
}

export default DoitBatchList;