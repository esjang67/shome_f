import axios from "axios";
import { useEffect, useState } from "react";

// 전집코드로 조회한 책 리스트 가져오기
function BookList({collectId}){

  const [list, setList] = useState();

  function getList(){
    axios.get(`${process.env.REACT_APP_SERVER_URL}/book/all/`+ collectId)
      .then(response => {
        console.log(response.data);
        setList(response.data);

      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(()=> {
    getList();
  }, [])

  function onRowHandler(e) {
    const getID = e.target.parentNode.dataset.id;
    // alert(getID);
    // navigator("/doit/batch/" + getID);
  }

  return(
    <div className="BookList">

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