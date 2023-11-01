import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useState } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

export default function LabelBottomNavigation({user, page, setPage}) {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setPage(newValue);
  };

  return (
    <Box className="Footer" >
    <BottomNavigation sx={{ width: '100%' }} value={page} onChange={handleChange}>
      <BottomNavigationAction sx={{ width: '20%', minWidth:"50px" }}
        label="Schedule" value="schedule"
        icon={<CalendarMonthIcon />} 
        onClick={()=>{navigate("/"); setPage("schedule")}}
        />
      <BottomNavigationAction sx={{ width: '20%', minWidth:"50px" }}
        label="Do It" value="doit"
        icon={<ChecklistRtlIcon />} 
        onClick={()=>{navigate("/doit"); setPage("doit")}}
      />
      <BottomNavigationAction sx={{ width: '20%', minWidth:"50px" }}
        label="Library" value="library"
        icon={<AutoStoriesIcon />} 
        onClick={()=>{
          if(user.grade === "P"){
            navigate("/library/admin")
          } else {
            navigate("/library")
          } 
          setPage("library")
        }}
      />
      <BottomNavigationAction sx={{ width: '20%', minWidth:"50px" }} 
        label="Suggest" value="suggest" 
        icon={<ThumbUpOffAltIcon />} 
        onClick={()=>{navigate("/suggest"); ; setPage("suggest")}}
      />
      <BottomNavigationAction sx={{ width: '20%', minWidth:"50px" }} 
        label="Coupon" value="coupon" 
        icon={<ExtensionIcon />} 
        onClick={()=>{
          if(user.grade === "P"){
            navigate("/coupon/admin")
          } else {
            navigate("/coupon")
          } 
          setPage("coupon")
        }}
      />
    </BottomNavigation>
    </Box>
  );
}