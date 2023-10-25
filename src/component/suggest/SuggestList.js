import axios from 'axios';

function SuggestList({list, grade}){
  
  function onRowHandler(e) {
    if(grade === 'K')
      return
    if(e.target.name !== "okflag")
      return

    const getID = e.target.parentNode.parentNode.dataset.id;
    alert(getID)

    const chk = e.target.checked;
    if(chk) {
      if(window.confirm("일정에 등록할까요?")){
        axios.put(`${process.env.REACT_APP_SERVER_URL}/suggest/ok/` + getID)
        .then(response => {
          console.log(response.data);
          alert(response.data)
        }).catch(error => {
          console.log(error);
        })
      }
    }
  }

  return (
    <div className="SuggestList">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>기준일자</th>
            <th>이름</th>
            <th>내용</th>
            <th>OK</th>
          </tr>
        </thead>
        <tbody>
        {
          list.map((data) => {
            return (
              <tr key={data.id} data-id={data.id} >
                <td>{data.id}</td>
                <td>{data.basedate}</td>
                <td>{data.user.userid} {data.user.name}</td>
                <td>{data.content}</td>
                <td>
                  <input type="checkbox" name="okflag" value={data.done} 
                          defaultChecked={data.done==="Y"? true : false} 
                          onChange={onRowHandler} />
                </td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
    )
}

export default SuggestList;