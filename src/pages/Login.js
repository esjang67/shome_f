import axios from "axios";
import { Button, ButtonGroup, Card, CardBody, CardHeader, CardSubtitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({user, setUser}) {
	
	const navigate = useNavigate();

	const fnSetUser = ((e)=>{
		setUser({
      ...user,
      [e.target.name]: e.target.value
    })
		// console.log(user);
	})

	return (
			<div className="Login">
				<Card bg={'Light'} style={{ width: '18rem' }} className="mb-2">
					<CardHeader>
						<h1 className="h3 mb-3 fw-normal">Login</h1>
					</CardHeader>
					<CardBody>
						<div className="userid">
							<ButtonGroup>
								<Button className="btn btn-primary" name="userid" value="DAD" onClick={fnSetUser}>DAD</Button>
								<Button className="btn btn-primary" name="userid" value="MOM" onClick={fnSetUser}>MOM</Button>
								<Button className="btn btn-primary" name="userid" value="MIN" onClick={fnSetUser}>MIN</Button>
								<Button className="btn btn-primary" name="userid" value="DO" onClick={fnSetUser}>DO</Button>
							</ButtonGroup>
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
									alert(user.name + " 로그인 완료!");
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