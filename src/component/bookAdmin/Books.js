import { Button } from "react-bootstrap";
import BookList from "./BookList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CollectCombo from "./CollectCombo";

function Books(){

  const navigate = useNavigate();
  const [collectId, setCollectId] = useState("전집 선택");
  
  function goReport(){
    navigate("/library/admin");
  }
  function collectAdd(){
    navigate("/library/admin/collect");
  }

  function bookControll(){
    // 전집선택이 안되어있다면 메시지 출력
    if(collectId === "전집 선택"){
      alert("전집을 선택하세요.")
      return
    }
    navigate("/library/admin/books/new/" + collectId);
  }

  return(
    <div className="Books">
      <h1> 책 관리자</h1>
      <br/><hr/><br/>
      <div className="bookSelect-menu">
        <Button onClick={goReport}>독후활동</Button>{' '}
        <Button onClick={collectAdd}>전집등록</Button>{' '}
        <CollectCombo collectId={collectId} setCollectId={setCollectId} />{' '}
        <Button onClick={bookControll}>책추가</Button>
      </div>

      <br/><hr/><br/>
      <h5>book list</h5>
      {collectId !== "전집 선택" ? <BookList collectId={collectId} /> : ''}

    </div>
    )
}

export default Books;