
function SelectKids({kids, setKids}){

  function findUser(str){
    let f = false;
    if(kids === str){
      f = true;
    }
    return f
  }

  function selData(e){
    setKids(e.target.value)
  }

  return (
    <div className="SelectKids">
      <div className="userid-radio">    
        <input type="radio" className="btn-check" id="min" name="user.userid" value="MIN" defaultChecked={findUser("MIN")} checked={findUser("MIN")} onChange={selData} onClick={selData} />
        <label className="btn btn-outline-primary" htmlFor="min">민찬</label>{'  '}
        <input type="radio" className="btn-check" id="do" name="user.userid" value="DO" defaultChecked={findUser("DO")} checked={findUser("DO")} onChange={selData} onClick={selData} />
        <label className="btn btn-outline-danger" htmlFor="do">도현</label>
      </div>  
    </div>  
  );
}

export default SelectKids;