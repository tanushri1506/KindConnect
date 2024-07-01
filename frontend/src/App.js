import './App.css';
import {Route, Routes ,Navigate} from "react-router-dom";
import Home from './components/Home/Home';
import UpdatePost from './components/UpdatePost/UpdatePost';
import AddPost from './components/AddPost/AddPost';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';


function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
			{user && <Route path="/" exact element={<Register/>} />}
			<Route path="/home" exact element={<Home/>} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/home" element={<Navigate replace to="/login" />} />
      <Route path='/' element={<Register/>}/>
      <Route path='/add' element={<AddPost/>}/>
      <Route path='/edit/:id' element={<UpdatePost/>}/>
      <Route path='/profile' element={<Profile/>}/>
		</Routes>
  );
}

export default App;
