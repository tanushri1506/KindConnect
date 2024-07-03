import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { format } from "date-fns";
import RoomIcon from '@mui/icons-material/Room';
import Loading from "../Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://tanushri1506-kindconnect.onrender.com/api/getall");
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    };
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 2000);


    fetchData();
    return () => clearTimeout(timer);

  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
     {loading ? (
        <Loading/>
      ) : (
        <div>
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

        <div className="search">
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {filteredPosts.map((post) => {
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
              <div className="location">
             <RoomIcon/>
              <p>{post.location}</p>
              </div>
            

              <p>{post.description}</p>
              <div className="last-line">
                <p>{post.contact}</p>
                <p>{formattedDate}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      )}
    </>
  );
};

export default Home;
