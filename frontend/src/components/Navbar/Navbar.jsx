import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = () => {
	const [username, setUsername] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsername = async () => {
			try {
				const token = localStorage.getItem('token');
				if (!token) {
					navigate('/login');
					return;
				}
				const response = await axios.get('https://tanushri1506-kindconnect.onrender.com/api/userInfo/getUserInfo', {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				setUsername(response.data.userName);
			} catch (error) {
				console.error('Error fetching username:', error);
				navigate('/login');
			}
		};

		fetchUsername();
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
		window.location.reload();
	};

	return (
		<nav className='navbar'>
			<div className="logo">
				KindConnect.
			</div>
			<div className="navButtons">
				<Link to="/profile">
					<button className='btn nameBtn'>{username}</button>
				</Link>
				<Link to="/login">
					<button className='btn logout' onClick={handleLogout}>Logout</button>
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
