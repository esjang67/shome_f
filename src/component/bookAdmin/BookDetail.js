import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function BookDetail(){
  const {id, colid} = useParams();
  const navigate = useNavigate();

  console.log("BookDetail " + id + "/" + colid)

  const [book, setBook] = useState({
    id:'',
    name: '',
    delyn:'N',
    bookcollect:{id:'', name:''}
  })

  console.log(book.name)
  console.log(book.bookcollect.name)

  function saveData(){
    // const id = document.querySelector("#input-id");
    console.log("savedata");
    console.log(book);
    axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, book)
    .then(response => {
      alert(response.data);
      navigate(-1)
      
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    if(window.confirm("[경고] DATABASE에서 삭제됩니다. 삭제 하시겠습니까?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/book/` + id)
      .then(response => {
        alert(response.data);
        navigator(-1)
        
      }).catch(error => {
        console.log(error);
      })    
    }
  }  

  function changeHandler(e) {
    // console.log( e.target.checked)
    if(e.target.name ==='delyn'){
      setBook({
        ...book,
        [e.target.name] : e.target.checked ? "Y" : "N"
      })    
    } else {
      setBook({
        ...book,
        [e.target.name] : e.target.value
      })
    }
  }

  // 데이터 가져오기
  function getData(){
    if(id !== undefined){
      console.log("get list id " + id);
      axios.get(`${process.env.REACT_APP_SERVER_URL}/book`, {params: {"id": id}})
      .then(response => {
        console.log(response.data)
        setBook(response.data);
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    } else {
      // 화면출력용 전집정보 가져오기
      axios.get(`${process.env.REACT_APP_SERVER_URL}/collect`, {params: {"id": colid}})
      .then(response => {
        console.log(response.data)
        setBook({
          ...book,
          bookcollect:response.data
        })
      }).catch(error => {
        console.log(error);
        alert("collect" + error);
      })
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])
console.log(book);

  return(
    <div className="BookDetail">
      <h1>[{book.bookcollect.name}] 책 {id === undefined ? "등록" : "수정"}</h1>

      <Card>
        <CardBody>
          <input type="text" className="input-id" name="id" defaultValue={book.id} /><br/>
          이름 : <input type="text" className="input-name" name="name" defaultValue={book.name} onChange={changeHandler}/><br/>
          삭제 : <input type="checkbox" className="input-name" name="delyn" defaultChecked={book.delyn === "Y" ? true: false}
                              onChange={changeHandler}/>
        </CardBody>
        <CardFooter>
        {id !== undefined ? 
          <Button onClick={deleteData}>삭제</Button>
          :'' }{' '}
          
          <Button onClick={saveData}>저장</Button>{' '}
          <Button onClick={()=> navigate(-1)}>목록</Button>
        </CardFooter> 
      </Card>      
    </div>
    )
}

export default BookDetail;