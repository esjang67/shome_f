import { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";

function DoitBatchList(){
  // console.log("DoitBatchList")
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const navigator = useNavigate();

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doitbatch/all`)
      .then(response => {
        console.log(response.data);
        setList(response.data);
        setIsLoading(false);
      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  },[])
  
  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    // alert(getID);
    navigator("/doit/batch/" + getID);
  }

  if(isLoading)
    return(<>...</>)
// console.log(list)
  if(list===undefined){
    return
  }
  return (
    <div className="DoitBatchList">
      {/* <ListGroup>
      {
        list.map((data) => {
          return (
              <ListGroup.Item action variant={data.user.userid ==="MIN" ? "primary" : "danger"} 
                      key={data.id} data-id={data.id} 
                      onClick={onRowHandler}>{data.user.name} : {data.defineday} : {data.content}</ListGroup.Item>
            );
          })
      }
      </ListGroup> */}

      <table >
        <thead>
          <tr>
            <th>id</th>
            <th>userid</th>
            <th>이름</th>
            <th>요일</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id} data-id={data.id} onClick={onRowHandler}>
                <td>{data.id}</td>
                <td>{data.user.userid}</td>
                <td>{data.user.name}</td>
                <td>{data.defineday}</td>
                <td>{data.content}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table> 

    </div>
    )
}

export default DoitBatchList;