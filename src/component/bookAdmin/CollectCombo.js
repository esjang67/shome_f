import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import fnCollectList from "./fnCollectList";

function CollectCombo({collectId, setCollectId}){
  console.log("CollectCombo")
  const [colList, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (e) => {
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
console.log(colList);

  return (
    <Form.Select className="collectCombobox" onChange={handleSelect} value={collectId}>
          <option>전집 선택</option>
          {
            colList.map((data) => {
              return (
                <option key={data.id} value={data.id}>{data.name}</option>
              );
            })
          }
        </Form.Select>
  )
}

export default CollectCombo;