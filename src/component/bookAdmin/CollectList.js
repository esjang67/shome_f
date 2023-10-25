import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fnCollectList from "./fnCollectList"

// 전집리스트 가져오기
function CollectList(){

  const navigator = useNavigate();
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    fnCollectList()
    .then(result => {
      // console.log(result);
      setList(result)
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    // alert(getID);
    navigator("/library/admin/collect/" + getID);
  }
  
  if(isLoading)
    return(<>...</>)

  return(
    <div className="CollectList">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>이름</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id} data-id={data.id} onClick={onRowHandler}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.delyn}</td>
              </tr>
            );
          })
        }
        </tbody>
      </table> 
    </div>
  )
}
export default CollectList;