import { useState } from "react";
import DatePicker from "react-datepicker";

const DatePickerC = ({selDate}) => {
  const [startDate, setStartDate] = useState(new Date(selDate));
  // const ExampleCustomInput = ({ value, onClick }) => (
  //   <button className="example-custom-input" onClick={onClick}>
  //     {value}
  //   </button>
  // );

  return (
    <DatePicker
      selected={startDate}
      onChange={date => setStartDate(date)}
      // customInput={<ExampleCustomInput />}
    />
  );
};

export default DatePickerC;