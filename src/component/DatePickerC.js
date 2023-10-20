import { useRef, useState } from "react";
import DatePicker from "react-datepicker";

const DatePickerC = ({selDate, setSelDate}) => {
  const [startDate, setStartDate] = useState(new Date(selDate));
  const [currentDate, setCurrentDate] = useState();
  // const calendar = useRef(null);
  
  // const cancelDatePicker = () => {
  //   setStartDate(currentDate);
  //   calendar.current.setOpen(false);
  // };
  
  // const openDatePicker = () => {
  //   calendar.current.setOpen(true);
  // };
  
  const closeDatePicker = () => {
    // setCurrentDate(startDate);
    setSelDate(startDate);
    // calendar.current.setOpen(false);
  };

  return (
    <DatePicker
      selected={new Date(startDate)}
      onChange={date => setStartDate(date)}
      onCalendarClose={closeDatePicker}
      dateFormat="yyyy-MM-dd"
      // customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerC;