import axios from "axios";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardSubtitle } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login({user, setUser}) {
	
	const navigate = useNavigate();

	const fnSetUser = ((e)=>{
		setUser({
      ...user,
      [e.target.name]: e.target.value
    })
		 console.log(user);
	})

	return (
			<div className="Login">
				<Card bg={'Light'} style={{ width: '18rem' }} className="mb-2">
					<CardHeader>
						<h1 className="h3 mb-3 fw-normal">Login</h1>
					</CardHeader>
					<CardBody>
						<div className="userid">
							<input type="radio" className="btn-check" id="min" name="userid" value="MIN" onChange={fnSetUser} />
							<label className="btn btn-outline-primary" for="min">민찬</label>
							<input type="radio" className="btn-check" id="do" name="userid" value="DO" onChange={fnSetUser} />
							<label className="btn btn-outline-danger" for="do">도현</label>
							<br/>
							<input type="radio" className="btn-check" id="mom" name="userid" value="MOM" onChange={fnSetUser} />
							<label className="btn btn-outline-success" for="mom">엄마</label>
							<input type="radio" className="btn-check" id="dad" name="userid" value="DAD" onChange={fnSetUser} />
							<label className="btn btn-outline-warning" for="dad">아빠</label>
						</div>
						<br/>
						<div className="password">
							<input type="password" name="password" placeholder="Password" onChange={fnSetUser}/>
						</div>
						<br/>
						<div className="col-12">
							<Button className="btn btn-primary w-100" onClick={()=> {
								axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, 
									{params: {"userid": user.userid, "password": user.password}})
								.then(response => {
									setUser(response.data);
									sessionStorage.setItem("user", JSON.stringify(user))
									alert("로그인 완료!");
									navigate("/");
								}).catch(error => {
								console.log(error);
									alert(error);
								})
							}}>Login</Button>
						</div>
							
						
					</CardBody>
				</Card>
					
			</div>
	)

}

export default Login;