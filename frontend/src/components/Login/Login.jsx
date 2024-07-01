import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";
import toast from "react-hot-toast";

const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://tanushri1506-kindconnect.onrender.com/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/home";
			toast.success(res.message,{position:"top-right"});
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast.error(error.response.data.message,{position:"top-right"});
			}
		}
	};

	return (
		<div className="container loginContainer">
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className="loginTitle">
						<h2>Login to Your Account</h2>
						</div>
						<div className="loginInputs">
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="loginInput"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="loginInput"
						/>
						</div>
						{error && <div  className="error">{error}</div>}
						<div className="login">
						<button type="submit" className="btn">
							Log In
						</button>
						</div>
					</form>
				</div>
				<div className="newHere">
					<p>Not Registered? 
					<Link to="/">
						Create an Account
					</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
