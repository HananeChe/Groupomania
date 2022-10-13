import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom' 
import Navbar from '../components/Navbar';
import LogContext from '../config/LogContext';
import './Posts.css';

//import { Loader } from '../components/Loader';


export default function Posts() {

   //const [isLoading, setLoading] = useState(true);
   const [data, setData]= useState([]); 


   //contexte
  const logCtx = useContext(LogContext);
  
  const getAllPost = () => {
    return fetch('http://localhost:3001/api/posts',{
      method: "GET",
      headers:{
        "Content-type" : "application/json",
        Authorization: `Bearer ${logCtx.token}`
      }
    
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        })
      .catch((error) => {
        console.error(error);
      })
  };
  
    useEffect(() => {
      getAllPost();
    }, );
    

    return (
       <div>
        <div>
          <Navbar />
        </div>
        <div className='containerPosts'>
          <h1>Les derniers posts:</h1>
            {data.map(dataPost => (
            <div key={dataPost._id} className="post">
            <Link to={"/post/" + dataPost._id} key={"post" + dataPost._id} className="linkPost">{dataPost.userName} {dataPost.userId}:</Link>
            <p key={"content" + dataPost._id}>{dataPost.content}</p>
            <div className='comment'>
            <label htmlFor='comment'>Commentaires:</label>
            <input type="text" name="comment"/>
            </div>
            <div className='btn'>
              <button>Like</button>
              <button>Dislike</button>
            </div>
            </div>
            //<p key={dataPost._id}>{dataPost.userName} dit:{dataPost.content}</p>
            ))}
         </div>
        </div>

    );
  };

