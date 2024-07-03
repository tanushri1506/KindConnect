import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const Navbar = () => {
	const [username, setUsername] = useState('');
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isProfilePage, setIsProfilePage] = useState(false);
  

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	  };
	
	  const handleProfileClick = () => {
		setIsProfilePage(true);
		navigate('/profile');
		setDropdownOpen(false); 
	  };
	
	  const handleHomeClick = () => {
		setIsProfilePage(false);
		navigate('/home');
		setDropdownOpen(false);
	  };

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
		setDropdownOpen(false); 
		localStorage.removeItem("token");
		navigate("/login");
		window.location.reload();
	};

	return (
		<nav className='navbar'>
			<div className="logo">
				KindConnect.
			</div>
			
				
					<div className="nameBtn" onClick={toggleDropdown}>
						<div className="profile-icon"><PersonIcon/></div> 
					    <div className="profile-name">{username}</div> 
						<ArrowDropDownIcon/>
					</div>
					{dropdownOpen && (
          <div className="dropdown">
            
            {isProfilePage ? (
          <div className="dropdown-item item1" onClick={handleHomeClick}>
            Home
          </div>
        ) : (
          <div className="dropdown-item item1" onClick={handleProfileClick}>
            Profile
          </div>
        )}
		<div className="dropdown-item item2" onClick={handleLogout}>Logout</div>
          </div>
        )}
					
			
		</nav>
	);
};

export default Navbar;
