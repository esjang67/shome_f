import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, CardHeader, Checkbox, TextField, Typography } from "@mui/material";
import CollectCombo from "./CollectCombo";

function BookDetail(){
  const {id, colid} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [collectId, setCollectId] = useState(colid);
  
  const [book, setBook] = useState({
    id:'',
    name: '',
    delyn:'N',
    bookcollect:{id:'', name:''}
  })

  function saveData(){
    let booksave={
      ...book,
      bookcollect:{id:collectId, name:''}
    };
    console.log(booksave)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, booksave)
    .then(response => {
      alert("저장했습니다.");
      navigate(-1)
    }).catch(error => {
      console.log(error);
    })
  }

  function deleteData(){
    if(window.confirm("[경고] DATABASE에서 삭제됩니다. 삭제 하시겠습니까?")){
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/book/` + id)
      .then(response => {
        alert("삭제했습니다.");
        navigate(-1)
      }).catch(error => {
        console.log(error);
      })    
    }
  }  

  function changeHandler(e) {
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
      axios.get(`${process.env.REACT_APP_SERVER_URL}/book`, {params: {"id": id}})
      .then(response => {
        // console.log(response.data)
        setBook(response.data);
        setIsLoading(false)
      }).catch(error => {
        console.log(error);
        alert(error);
      })
    } else {
    //   // 화면출력용 전집정보 가져오기
    //   axios.get(`${process.env.REACT_APP_SERVER_URL}/collect`, {params: {"id": colid}})
    //   .then(response => {
    //     // console.log(response.data)
    //     setBook({
    //       ...book,
    //       bookcollect:response.data
    //     })
        setIsLoading(false)
    //   }).catch(error => {
    //     console.log(error);
    //     alert("collect" + error);
    //   })
    }
  }
  
  useEffect(()=> {
    getData();
  }, [])

  function create_pTag(){

    // <TextField className="book-add-name" variant="outlined" name="arr-name" size="small"/>
    let tagArea = document.querySelector('.book-add');
    let new_pTag = document.createElement('input');
    
    // new_pTag.setAttribute('class', 'book-add-name');
    // new_pTag.setAttribute('type', 'text');
    // new_pTag.innerHTML = "";
    new_pTag.classList.add('book-add-name');
    tagArea.appendChild(new_pTag);

  }

  function saveDataList(){

    // let savecnt = 0;
    const bookList = document.querySelectorAll('.book-add-name');
    bookList.forEach(b => {
      if(b.value !== ''){
        let booksave={
          id:'',
          name: b.value,
          delyn:'N',
          bookcollect:{id:colid, name:''}
        }
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/book`, booksave)
        .then(response => {
          // savecnt+=1;
          // console.log(savecnt)
        }).catch(error => {
          console.log(error);
        })
      }
    })
    alert("저장했습니다.");
    navigate(-1)
  }
 
  if(isLoading)
  return(<>...</>)

  return(
    <div className="BookDetail">
      <Card className="bookDetail" sx={{ maxWidth: 345, m:1 }} variant="outlined">
				<CardHeader title={"책 관리"} />
				<CardContent>
          <Box sx={{ display: 'grid', alignItems: 'center' }}>
            <CollectCombo collectId={collectId} setCollectId={setCollectId} />
            <TextField id="outlined-basic" label="이름" variant="outlined" name="name" size="small"
                  onChange={changeHandler} defaultValue={book.name} />
            <Typography> 
              사용안함 : 
              <Checkbox name="delyn" color="error" checked={book.delyn === "Y" ? true: false}
                              onChange={changeHandler}/>
            </Typography>
          </Box>

          <Button variant="outlined" color="success" onClick={()=>{navigate(-1)}}>목록</Button>{' '}
          {id !== undefined ? 
            <Button variant="outlined" color="error" onClick={deleteData}>삭제</Button> : <></> }{' '}
          <Button variant="outlined" color="primary" onClick={saveData}>저장</Button>

				</CardContent>
			</Card>
      
      {id === undefined ?
      <Card className="bookDetailAdd" sx={{ maxWidth: 345, m:1, pt:1 }} variant="outlined" >
        <Typography>목록으로 저장</Typography><Button color="primary" onClick={create_pTag}>추가</Button>
        <Box className="book-add">
        </Box>
        <Button color="primary" onClick={saveDataList}>저장</Button>
      </Card>
      : ''}
    </div>
    )
}

export default BookDetail;