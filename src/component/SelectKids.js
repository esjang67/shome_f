import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

function SelectKids({kids, setKids}){

  const handleChange = (event, newAlignment) => {
    setKids(newAlignment);
  };

  return (
    <div className="SelectKids">
      <Box sx={{ m:1 }}>
      <ToggleButtonGroup exclusive value={kids} aria-label="Platform" onChange={handleChange} >
        <ToggleButton sx={{ width: "60px", fontWeight:'bold', borderRadius:'12px',
                            color: 'primary.main', borderColor:'primary.main' }} 
                      size="small" color="primary" name="userid" value="MIN">민찬</ToggleButton>
        <ToggleButton sx={{ width: "60px", fontWeight:'bold', borderRadius:'12px',
                            color: 'error.main', borderColor:'error.main' }} 
                      size="small" color="error"   name="userid" value="DO">도현</ToggleButton>
      </ToggleButtonGroup>
      </Box>
    </div>  
  );
}

export default SelectKids;