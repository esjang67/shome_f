import CollectCombo from "../component/bookAdmin/CollectCombo";
import { useEffect, useState } from "react";
import BookList from "../component/bookAdmin/BookList";
import { getFormettedDate } from "../util/util_date";
import axios from "axios";

function Library({user}){
  const [collectId, setCollectId] = useState("전집 선택");
  const [todayList, setTodayList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // 오늘 쓴 독후감 리스트
  function todayReport(){
    const tmpEdDate = getFormettedDate(new Date());
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/report/user`, 
      {params: {"userid": user.userid, "selDate": tmpEdDate}})
      .then(response => {
      console.log(response.data);
      setTodayList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  }

  useEffect(()=> {
    todayReport();
  }, [])

  if(isLoading)
    return(<>...</>)

  return (
    <div className="Library">
      <h1>독후감을 써보자</h1>
      <br/><hr/><br/>
      <h5>오늘 쓴 독후감</h5>
      {
          todayList.map((data) => {
            return (
              <p key={data.id}>
                [{data.book.name}]
              </p>
            );
          })
        }

      <p></p>
      <br/><hr/><br/>
      <CollectCombo collectId={collectId} setCollectId={setCollectId} />{' '}
      <h5>book list</h5>
      {collectId !== "전집 선택" ? <BookList collectId={collectId} clickUser={user} /> : ''}
        {/* 
        책리스트 선택 -> 다읽었어요 메시지 -> 레포트화면으로 이동 */}
          
    </div>
  )
}

export default Library;