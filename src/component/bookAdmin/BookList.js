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

  return(
    <div className="BookList">

    </div>
  )
}
export default BookList;