import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Doit({user}) {

  const navigate = useNavigate();

  function loginCheck() {
    if(user.userid === '') {
      alert(" login first");
      navigate("/");
      return;
    }
  }

    return (
      <div className="Doit">
          {loginCheck()}

          <div>할일</div>
          <Button onClick={()=> {
            navigate("/doit/batch")
          }}>할일등록</Button>


      </div>
    )

}

export default Doit;