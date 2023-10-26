import { Button, Card, CardContent, CardHeader, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login({user, setUser}) {
	
	const [alignment, setAlignment] = useState('');
	const [password, setPassword] = useState('');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

	const handleChange2 = (e) => {
    setPassword(e.target.value);
  };

	const navigate = useNavigate();

	function login(){
		console.log(alignment + "/" + password);
		axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, 
			{params: {"userid": alignment, "password": password}})
		.then(response => {
			setUser(response.data);
			sessionStorage.setItem("user", JSON.stringify(response.data))
			alert("로그인 완료!");
			navigate("/");
		}).catch(error => {
		console.log(error);
			alert(error);
		})
	}

	return (
		<div className="Login">
			<br/>
			<Card sx={{ maxWidth: 345 }}>
				<CardHeader title="LOGIN" />

				<CardContent>
					<ToggleButtonGroup variant="outlined" exclusive value={alignment} aria-label="Platform" onChange={handleChange} >
							<ToggleButton size="large" color="primary" name="userid" value="MIN">민찬</ToggleButton>
							<ToggleButton size="large" color="error"   name="userid" value="DO">도현</ToggleButton>
							<ToggleButton size="large" color="success" name="userid" value="MOM">엄마</ToggleButton>
							<ToggleButton size="large" color="success" name="userid" value="DAD">아빠</ToggleButton>
						</ToggleButtonGroup>
						<br/><br/>
						
						<TextField id="outlined-password-input" size="small" label="Password" 
												type="password" autoComplete="current-password" onChange={handleChange2} />
						<br/><br/>

					<Button variant="outlined" color="error" onClick={()=> navigate("/")}>Cancel</Button>{'  '}
					<Button variant="outlined" color="primary" onClick={login}>Login</Button>
				</CardContent>
			</Card>
		</div>
	)

}

export default Login;