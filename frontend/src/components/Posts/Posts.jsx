import React from 'react'
import './Posts.css'
import axios from "axios";
import toast from 'react-hot-toast';


const Posts = () => {
  const [posts,setPosts]= useState([]);


  useEffect(()=>{
    const API = process.env.REACT_APP_API_URL;
    const fetchData = async()=>{
      const response = await axios.get(`${API}/api/getall`)
      setPosts(response.data);
    }

    fetchData();
},[])

const deletePost=async (postId) =>{
  const API = process.env.REACT_APP_API_URL;
  await axios.delete(`${API}/api/delete/${postId}`)
  .then((response)=>{
    setPosts((prevPost)=>prevPost.filter((post)=>post._id !== postId))
    
      toast.success(response.data.msg,{position:"top-right"});
  })
  .catch((error)=>{
    console.log(error);
  })
}

  return (
    <div>
        <table>
        
        <tbody>
          {
            filteredPosts.map((post)=>{
              return(
                <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.location}</td>
                <td>
                    <button onClick={()=>deletePost(post._id)}>Delete</button>
                    <Link to={`/edit/`+post._id}>Edit</Link>
                </td>
            </tr>
              )
            })
          }
            
        </tbody>
      </table>
    </div>
  )
}

export default Posts
