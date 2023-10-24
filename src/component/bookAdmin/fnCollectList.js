import axios from "axios";

export function fnCollectList() {

  let list = null;
  axios.get(`${process.env.REACT_APP_SERVER_URL}/collect/all`)
  .then(response => {
    console.log("fnCollectList")
    console.log(response.data);
    // setList(response.data)
    return response.data;
  }).catch(error => {
    console.log(error);
  })

}
