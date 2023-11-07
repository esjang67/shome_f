import CollectCombo from "../component/bookAdmin/CollectCombo";
import { useEffect, useState } from "react";
import BookList from "../component/bookAdmin/BookList";
import { getFormettedDate } from "../util/util_date";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";

function Library({user}){
  const [collectId, setCollectId] = useState('');
  const [todayList, setTodayList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // 오늘 쓴 독후감 리스트
  function todayReport(){
    const tmpEdDate = getFormettedDate(new Date());
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/report/user`, 
      {params: {"userid": user.userid, "selDate": tmpEdDate}})
      .then(response => {
      // console.log(response.data);
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
      <h3>독후감을 써보자</h3>
      <Paper sx={{ m:1,border: '1px dashed grey' }} elevation={0}  >
        <Typography sx={{ fontSize: 15 }} >-- 오늘 썼어요 --</Typography>
        <Box sx={{ m:1, display: 'flxed' }}>
          {
            todayList.map((data) => {
              return (
                <Typography sx={{ fontSize: 12, color: 'text.secondary' }} key={data.id} >
                  [{data.book.name}]{' '}
                </Typography>
              );
            })
          }
        </Box>
      </Paper>

      <Box sx={{ mt:2 }}>
        <CollectCombo collectId={collectId} setCollectId={setCollectId} />{' '}
        {collectId !== '' ? <BookList collectId={collectId} clickUser={user} /> : ''}
       </Box>
    </div>
  )
}

export default Library;