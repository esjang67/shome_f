import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 전집코드로 조회한 책 리스트 가져오기
function BookList({collectId}){

  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigator = useNavigate();

  console.log("BookList")

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/book/all`, {params: {"colid": collectId}})
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
    console.log("BookList effect")
  }, [collectId])

  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    alert(getID);
    navigator("/library/admin/books/" + getID + "/" + collectId);
  }
  if(isLoading)
  return(<>...</>)

  return(
    <div className="BookList">

      <table >
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
export default BookList;