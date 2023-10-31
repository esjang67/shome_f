import { Button, Card, CardContent, CardHeader, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({user, setUser, setPage}) {
	
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
		axios.get(`${process.env.REACT_APP_SERVER_URL}/login`, 
			{params: {"userid": alignment, "password": password}})
		.then(response => {
			setUser(response.data);
			sessionStorage.setItem("user", JSON.stringify(response.data))
			if(response.data.grade === "K"){
				alert("안녕? 어서와. " + response.data.name + "아 반가워 ^__________^");
			} else {
				alert(response.data.name + " 로그인 완료!");
			}

			navigate("/");
			setPage('schedule');

		}).catch(error => {
		console.log(error);
			alert(error);
		})
	}

	return (
		<div className="Login">
			<Card sx={{ maxWidth: 345, m:1 }}>
				<CardHeader title="LOGIN" />
				<CardContent>
					<ToggleButtonGroup variant="outlined" exclusive value={alignment} aria-label="Platform" onChange={handleChange} >
							<ToggleButton size="large" color="primary" name="userid" value="MIN">민찬</ToggleButton>
							<ToggleButton size="large" color="error"   name="userid" value="DO">도현</ToggleButton>
							<ToggleButton size="large" color="success" name="userid" value="MOM">엄마</ToggleButton>
							<ToggleButton size="large" color="success" name="userid" value="DAD">아빠</ToggleButton>
						</ToggleButtonGroup>
						<br/><br/>
						
						<TextField id="outlined-password-input" label="Password" variant="outlined"
												type="password" autoComplete="current-password" onChange={handleChange2} />
						<br/><br/>

					<Button variant="outlined" color="warning" onClick={()=> navigate(-1)}>Cancel</Button>{'  '}
					<Button variant="outlined" color="primary" onClick={login}>Login</Button>
				</CardContent>
			</Card>
		</div>
	)

}

export default Login;