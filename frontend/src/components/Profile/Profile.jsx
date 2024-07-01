import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import { format } from "date-fns";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "https://tanushri1506-kindconnect.onrender.com/api/userInfo/getUserInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(response.data.userName);
      }
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (username) {
        const response = await axios.get(
          `https://tanushri1506-kindconnect.onrender.com/api/userposts/${username}`
        );
        setPosts(response.data);
      }
    };

    fetchPosts();
  }, [username]);

  const deletePost = async (postId) => {
    await axios
      .delete(`https://tanushri1506-kindconnect.onrender.com/api/delete/${postId}`)
      .then((response) => {
        setPosts((prevPost) => prevPost.filter((post) => post._id !== postId));

        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="createPost">
          <div className="text">
            <h5>Post Something</h5>
            <p>Looking to offer help or seeking support?</p>
          </div>
          <div className="create">
            <Link to={"/add"}>
              <button className="btn">Create Post</button>
            </Link>
          </div>
        </div>

        {!posts.length ? (
  <h5 className="yourPosts">No posts here</h5>
) : (
  <h5 className="yourPosts">Your Posts</h5>
)}


        
        {posts.map((post) => {
          const formattedDate = post.createdAt
            ? format(new Date(post.createdAt), "MMMM d, yyyy h:mm a")
            : "Date not available";
          return (
            <div key={post._id} className="post-item">
              <div className="first-line">
                <p>Posted by: {post.author}</p>

                <p>
                  {post.helpType === "offer" ? "Offering Help" : "Seeking Help"}
                </p>
              </div>
              <h2>{post.title}</h2>
              <p>{post.location}</p>

              <p>{post.description}</p>
              <div className="last-line">
                <p>{post.contact}</p>
                <p>{formattedDate}</p>
              </div>

              <div className="post-actions">
                <Link to={`/edit/` + post._id} className="edit-link">
                  Edit
                </Link>
                <button
                  onClick={() => deletePost(post._id)}
                  className="btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
