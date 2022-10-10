import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 
import Navbar from '../components/Navbar';
import State from '../components/State';

//import { Loader } from '../components/Loader';


export default function Posts() {
   //const [isLoading, setLoading] = useState(true);
   const [data, setData]= useState([]); 

  
  const getAllPost = () => {
    return fetch('http://localhost:3001/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        }, console.log(data))
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
        <div>
          <State />
        </div>
        <div>
          <h1>Les derniers posts:</h1>
            {data.map(dataPost => (
            <div key={dataPost._id}>
            <Link to={"/post/" + dataPost._id} key={"post" + dataPost._id}>{dataPost.userName}</Link>
            <p key={"content" + dataPost._id}>{dataPost.content}</p>
            </div>
            //<p key={dataPost._id}>{dataPost.userName} dit:{dataPost.content}</p>
            ))}
         </div>
        </div>

    );
  };

