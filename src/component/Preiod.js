// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import { ko } from "date-fns/esm/locale";
// // import { getMonth, getDate, getDay } from "date-fns";
// // import "./Preiod.css"

// function Preiod(){
//   // const [selDate, setSeltDate] = useState(new Date());

// //   function seletTime() {
// //     let Days = ['일', '월', '화', '수', '목', '금', '토'];
// //     let Month = getMonth(selDate) + 1;
// //     let Date = getDate(selDate);
// //     let Day = Days[getDay(selDate)];
// //     // 오브젝트는 전달 안돼서 string으로 변환
// //     console.log(String(Month + "." + Date + " (" + Day + ")"));
// // }

//   return (
//     <DatePicker selected={new Date()} 
//                 locale={ko}                   // 한글로 변경
//                 dateFormat="yyyy-MM-dd (eee)" // 시간 포맷 변경
//                 showPopperArrow={false}       // 화살표 변경
//       //onChange={(date) => setSeltDate(date)}
//       // onSelect={seletTime}
//     />
//   );
// }

// export default Preiod;