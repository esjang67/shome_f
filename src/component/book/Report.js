import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getFormettedDate } from "../../util/util_date";
import { Button } from "@mui/material";

function Report(){
  const {id, userid} = useParams();
  const navigator = useNavigate();

  const [book, setBook] = useState({
    id:'',
    name: '',
    delyn:'N',
    bookcollect:{id:'', name:''}
  })

  // 몇번 독후감을 썼는지 메시지?

  useEffect(()=> {
    // BookDetail에서도 사용됨
    axios.get(`${process.env.REACT_APP_SERVER_URL}/book`, {params: {"id": id}})
    .then(response => {
      console.log(response.data)
      setBook(response.data);
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  
  }, [id])

  function saveData(){
    const content = document.querySelector('.content');
    const report = {
      id:'',
      basedate: getFormettedDate(new Date()),
      user:{userid:userid},
      book:{id:book.id},
      content:content.value
    }
    console.log(report)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/report`, report)
    .then(response => {
      alert("독후감을 쓰다니 박수 짝짝~!!!")
      navigator(-1)
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  }

  return(
    <div className="Report">
      <Card>
        <CardHeader>
          [{book.bookcollect.name}] {book.name}
        </CardHeader>
        <CardBody>
          <textarea className="content" name="content"></textarea>
        </CardBody>
        <CardFooter>
          <Button variant="outlined" color="primary" onClick={saveData}>다썼어요 :)</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
export default Report;