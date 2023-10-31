import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import DatePreiod from "../DatePreiod";
import axios from "axios";
import { getFormettedDate } from "../../util/util_date";

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
      // console.log(response.data);
      setList(response.data);
      setIsLoading(false);

      }).catch(error => {
      console.log(error);
      })
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

              <Accordion sx={{ m:1 }} variant="outlined" key={data.id} expanded={expanded === `panel${i}`} data-id={data.id} onChange={handleChange(`panel${i}`)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                <Typography sx={{ width: '50%', fontSize: 14, flexShrink: 0 }}>[{data.basedate}] {data.user.name}</Typography>
                <Typography sx={{ width: '50%', fontSize: 14, color: 'text.secondary' }}>{data.book.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: 15, color: 'text.secondary' }}>{data.content}</Typography>
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