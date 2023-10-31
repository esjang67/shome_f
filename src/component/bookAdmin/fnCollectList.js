import axios from "axios";

async function fnCollectList() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/collect/all`)
    // console.log(response.data)
    return response.data

  } catch(err) {
    
    throw(err)

  }
}

export default fnCollectList;
