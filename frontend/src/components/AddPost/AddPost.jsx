import React, { useState ,useEffect} from 'react'
import './AddPost.css'
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const AddPost = () => {

  const posts={
    title:"",
    description:"",
    contact:"",
    location:"",
    helpType:'',
    author:""
  }

  const [post,setPost] = useState(posts);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('https://tanushri1506-kindconnect.onrender.com/api/userInfo/getUserInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPost(prevPost => ({ ...prevPost, author: response.data.userName }));
      }
    };

    fetchUsername();
  }, []);


  const inputHandler = (e)=>{
    const {name,value} =e.target;
    setPost({...post,[name]:value});
  }

  const handleHelpTypeChange = (e) => {
    setPost({ ...post, helpType: e.target.value });
  };

  const submitForm = async(e)=>{
    e.preventDefault();

    if (!post.title || !post.description || !post.contact || !post.location) {
      toast.error('Fields cannot be empty', { position: 'top-right' });
      return;
    }

    await axios.post("http://localhost:8000/api/create",post)
    .then((response)=>{
        toast.success(response.data.msg,{position:"top-right"});
        navigate("/home");
    })
    .catch(error=>{
        console.log(error);
      })
  }

  return (
    <div className='addContainer'>
      <form onSubmit={submitForm}>
        <div className="addInputs">
        <div className='addInpu'>
            <label htmlFor='title'>Title</label><br/>
            <input type='text' onChange={inputHandler} id='title' name='title' autoComplete='off' placeholder='Title'
            maxLength={50}
            className='addInput'/>
        </div>
        
        <div className='inputs'>
            <label htmlFor='email'>Contact</label><br/>
            <input type='text' maxLength={40} onChange={inputHandler} id='contact' name='contact' autoComplete='off' placeholder='Contact' className='addInput'/>
        </div>
        <div className='inputs'>
            <label htmlFor='password'>Location</label><br/>
            <textarea type='text' rows={2} maxLength={70} onChange={inputHandler} id='location' name='location' autoComplete='off' placeholder='Location' className='addInput'/>
        </div>
        
        <div className="inputs">
            <label>Select type</label>
            <br />
            <label>
              <input
                type="radio"
                name="helpType"
                value="offer"
                checked={post.helpType === 'offer'}
                onChange={handleHelpTypeChange}
              />{' '}
              Offer Help
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="helpType"
                value="seek"
                checked={post.helpType === 'seek'}
                onChange={handleHelpTypeChange}
              />{' '}
              Seek Help
            </label>
          </div>
        <div className='inputs'>
            <label htmlFor='title'>Description</label><br/>
            <textarea type='text' maxLength={300} rows={5} onChange={inputHandler} id='description' name='description' autoComplete='off' placeholder='Description' className='addInput'/>
        </div>
        </div>
        <div className='create'>
            <button type='submit' className='btn'>Create Post</button>
        </div>
      </form>
    </div>
  )
}

export default AddPost
