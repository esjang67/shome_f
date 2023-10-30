import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function SelectKids({kids, setKids}){

  const handleChange = (event, newAlignment) => {
    setKids(newAlignment);
  };

  return (
    <div className="SelectKids">
      <ToggleButtonGroup variant="outlined" exclusive value={kids} aria-label="Platform" onChange={handleChange} >
        <ToggleButton size="large" color="primary" name="userid" value="MIN">민찬</ToggleButton>
        <ToggleButton size="large" color="error"   name="userid" value="DO">도현</ToggleButton>
      </ToggleButtonGroup>
    </div>  
  );
}

export default SelectKids;