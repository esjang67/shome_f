import { useEffect, useState } from 'react';
import axios from 'axios';

function DoitList({kids}){
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();

  function getList(){
    console.log("getlist " + kids)
    axios.get(`${process.env.REACT_APP_SERVER_URL}/doit`, 
      {params: {"userid": kids, "basedate": new Date().getTime()}})
      .then(response => {
        console.log(response.data);
        // alert(response.data)
        setList(response.data);
        setIsLoading(false);

      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  },[kids])
  
  function onRowHandler(e) {
console.log(e);
    const getID = e.target.parentNode.parentNode.dataset.id;
    // alert(getID)

    const chk = e.target.checked;
    if(chk) {
      if(window.confirm("완료했나요?? ^___^:")){
        axios.put(`${process.env.REACT_APP_SERVER_URL}/doit/` + getID)
        .then(response => {
          console.log(response.data);
          alert(response.data)
          getList();
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  if(isLoading)
    return(<>...</>)
// console.log(list)
  if(list===undefined){
    return
  }
  return (
    <div className="DoitList">
      
      <table >
        <thead>
          <tr>
            <th>id</th>
            <th>기준일자</th>
            <th>이름</th>
            <th>내용</th>
            <th>완료</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id} data-id={data.id} >
                <td>{data.id}</td>
                <td>{data.basedate}</td>
                <td>{data.user.userid} {data.user.name}</td>
                <td>{data.content}</td>
                <td>
                  <input type="checkbox" name="done" value={data.done} 
                          defaultChecked={data.done==="Y"? true : false} 
                          onChange={onRowHandler} />
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
    )
}

export default DoitList;