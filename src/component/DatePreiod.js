import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { getFormettedDate } from "../util/util_date";

function DatePreiod({stdate, setStdate, eddate, setEddate, getList}){
  // console.log("DatePreiod " + stdate + " / " + dayjs(stdate))

  function ButtonField(props) {
    const {
      setOpen,
      label,
      id,
      disabled,
      InputProps: { ref } = {},
      inputProps: { 'aria-label': ariaLabel } = {},
    } = props;
  
    return (
      <Button
        variant="outlined"
        id={id}
        disabled={disabled}
        ref={ref}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
      >
        {label ? `${getFormettedDate(new Date(label))}` : 'Pick a date'}
      </Button>
    );
  }
  
  function ButtonDatePicker(props) {
    const [open, setOpen] = useState(false);
  
    return (
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      />
    );
  }

  return (
    <div className="DatePreiod">
      <Box sx={{ mb:1 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ButtonDatePicker
            label={stdate == null ? null : stdate}  
            value={dayjs(stdate)}
            onChange={(stValue)=> setStdate(stValue) }/>
          {' '}
          <ButtonDatePicker
            label={eddate == null ? null : eddate}  
            value={dayjs(eddate)}
            onChange={(edValue)=> setEddate(edValue) }/>
          {' '}
          <Button variant="outlined" onClick={getList} > 
            <Typography><FontAwesomeIcon icon={faMagnifyingGlass} /></Typography>
          </Button>
        </LocalizationProvider>
      </Box>
      </div>
    )
}

export default DatePreiod;