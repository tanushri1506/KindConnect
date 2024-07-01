import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import toast from "react-hot-toast";

const Register = () => {
	const [data, setData] = useState({
		userName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://tanushri1506-kindconnect.onrender.com/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			// console.log(res.message);
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
		<div className="container registerContainer">
			<div className="registerTitle">
			<h2>Welcome</h2>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="registerInputs">
				<input
					type="text"
					placeholder="User Name"
					name="userName"
					onChange={handleChange}
					value={data.userName}
					required
					className="registerInput"
				/>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
					value={data.email}
					required
					className="registerInput"
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					onChange={handleChange}
					value={data.password}
					required
					className="registerInput"
				/>
				</div>
				{error && <div className="error">{error}</div>}
				<div className="register">
				<button type="submit" className="btn">Register</button>
				</div>
			</form>
			<div className="instead">
				<p>Already have an account?
				<Link to="/login">Log In</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
