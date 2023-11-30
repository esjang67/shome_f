import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import axios from "axios";
import { getFormettedDate } from "../../util/util_date";
import ClearIcon from '@mui/icons-material/Clear';

function ReportList(){

  let startdate = new Date() 
  startdate.setDate(1);
  
  const [stdate, setStdate] = useState(getFormettedDate(new Date(startdate)));
  const [eddate, setEddate] = useState(getFormettedDate(new Date()));
  
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  function getList(){
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/report/all`, 
      {params: {"startDate": stdate, "endDate": eddate}})
      .then(response => {
      
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
  }

  function deleteData(e){

    const getID = e.target.parentNode.dataset.id;
    
    if(window.confirm("삭제할까요?")){
      setIsLoading(false);
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/report/` + getID)
      .then(response => {
        // console.log(response.data);
        alert("삭제했습니다.")
        setIsLoading(true);
      }).catch(error => {
        console.log(error);
      })
    }
  
  }

  useEffect(()=> {
    getList();
  }, [])

  if(isLoading)
    return(<>...</>)

  return(
    <div className="ReportList">
      <DatePreiod stdate={stdate} setStdate={setStdate} eddate={eddate} setEddate={setEddate} getList={getList}/>
      
      <div className="reportList">
        {
          list.map((data, i) => {
            return (

              <Accordion sx={{ m:1 }} variant="outlined" key={data.id} 
                         expanded={expanded === `panel${i}`} data-id={data.id} 
                         onChange={handleChange(`panel${i}`)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                <Typography sx={{ width: '50%', fontSize: 14, flexShrink: 0 }}>[{data.basedate}] {data.username}</Typography>
                <Typography sx={{ width: '50%', fontSize: 14, color: 'text.secondary' }}>{data.bookname}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>{data.content}</Typography>
                <Button size="large" color="error" 
                                data-id={data.id} 
                                onClick={deleteData}><ClearIcon/></Button>
              </AccordionDetails>
            </Accordion>

            );
          })
        }

      </div>
    </div>
  )
}
export default ReportList;