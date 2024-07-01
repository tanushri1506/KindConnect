import React, { useEffect, useState } from 'react'
import './UpdatePost.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdatePost = () => {

  const posts={
    title:"",
    description:"",
    contact:"",
    location:"",
    helpType:''
  }

  const {id} = useParams();
  const [post,setPost] = useState(posts);
  const navigate = useNavigate();

  const inputChangeHandler = (e)=>{
      const{name,value} = e.target;
      setPost({...post,[name]:value});
  }
   const handleHelpTypeChange = (e) => {
    setPost({ ...post, helpType: e.target.value });
  };


  useEffect(()=>{
    axios.get(`https://tanushri1506-kindconnect.onrender.com/api/getone/${id}`)
    .then((response)=>{
        setPost(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[id])

  const submitForm = async(e)=>{
    e.preventDefault();

    if (!post.title || !post.description || !post.contact || !post.location) {
      toast.error('Fields cannot be empty', { position: 'top-right' });
      return;
    }

    await axios.put(`https://tanushri1506-kindconnect.onrender.com/api/update/${id}`,post)
    .then((response)=>{
        toast.success(response.data.msg,{position:"top-right"});
        navigate("/profile");
    })
    .catch(error=>console.log(error))
    
  }

  return (
    <div className='updateContainer'>
      <form onSubmit={submitForm}>
        <div className="updateInputs">
        <div className='inputs'>
            <label htmlFor='title'>Title</label>
            <input type='text' maxLength={50} className='updateInput' value={post.title} onChange={inputChangeHandler} id='title' name='title' autoComplete='off' placeholder='Title'/>
        </div>
        
        <div className='inputs'>
            <label htmlFor='contact'>Contact</label>
            <input type='text' maxLength={40} className='updateInput' value={post.contact} onChange={inputChangeHandler} id='contact' name='contact' autoComplete='off' placeholder='Contact'/>
        </div>
        <div className='inputs'>
            <label htmlFor='location'>Location</label>
            <textarea type='text' maxLength={70} rows={2}  className='updateInput' value={post.location} onChange={inputChangeHandler} id='location' name='location' autoComplete='off' placeholder='Location'/>
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
            <label htmlFor='description'>Description</label>
            <textarea type='text' maxLength={300} rows={5} className='updateInput' value={post.description} onChange={inputChangeHandler} id='description' name='description' autoComplete='off' placeholder='Description'/>
        </div>
        </div>
        <div className='update'>
            <button type='submit'>Update Post</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePost
