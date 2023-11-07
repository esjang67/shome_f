import axios from "axios";

// 커스텀 axios
const axiosC = axios.create({
  baseURL:`${process.env.REACT_APP_SERVER_URL}`,
  headers: {
      'Content-Type':'application/json; charset=utf-8'
  }
});

// // 토큰포함 config에 request를 담아야함
// function addJwtToRequest(config){
//   const jwt = sessionStorage.getItem('jwt');
//   if(jwt){
//     config.headers['Authorization'] = `Bearer ${jwt}`;
//   }
//   return config;
// }

// 요청전 인터셉트할것
axiosC.interceptors.request.use(
  // (config) => addJwtToRequest(config),
  (error)  => Promise.reject(error)
);

export default axiosC;

