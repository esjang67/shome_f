import BookList from "./BookList";
import CollectCombo from "./CollectCombo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

function Books(){

  const navigate = useNavigate();
  const [collectId, setCollectId] = useState('');
  
  function goReport(){
    navigate("/library/admin");
  }
  function collectAdd(){
    navigate("/library/admin/collect");
  }

  function bookControll(){
    // 전집선택이 안되어있다면 메시지 출력
    if(collectId === ''){
      alert("전집을 선택하세요.")
      return
    }
    navigate("/library/admin/books/new/" + collectId);
  }

  return(
    <div className="Books">
      <div className="bookSelect-menu">
        <Button color="success" onClick={goReport}>독후감목록</Button>{' '}
        <Button color="secondary" onClick={collectAdd}>전집 관리</Button>{' '}
        <Button color="secondary" onClick={bookControll}>책<FontAwesomeIcon icon={faSquarePlus} /></Button>
      </div>
      <hr/>
      <CollectCombo collectId={collectId} setCollectId={setCollectId} />
      {collectId !== '' ? <BookList collectId={collectId} /> : ''}

    </div>
    )
}

export default Books;