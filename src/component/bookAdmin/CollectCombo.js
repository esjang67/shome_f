import { useEffect, useState } from "react";
import fnCollectList from "./fnCollectList";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function CollectCombo({collectId, setCollectId}){

  const [colList, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setCollectId(e.target.value);
  };

  useEffect(()=>{
    fnCollectList()
    .then(result => {
      // console.log(result);
      setList(result)
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  
  },[])
  
  if(isLoading)
    return(<>...</>)

  return (

    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">전집 선택</InputLabel>
        <Select value={collectId} onChange={handleChange} >
          {
            colList.map((data) => {
              return (
                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
              );
            })
          }          
        </Select>
      </FormControl>
    </Box>


    // <Form.Select className="collectCombobox" onChange={handleSelect} value={collectId}>
    //       <option>전집 선택</option>
    //       {
    //         colList.map((data) => {
    //           return (
    //             <option key={data.id} value={data.id}>{data.name}</option>
    //           );
    //         })
    //       }
    //     </Form.Select>
  )
}

export default CollectCombo;