import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom' 
import Navbar from '../components/Navbar';
import LogContext from '../config/LogContext';
import './Posts.css';
import Comments from '../components/Comments';


export default function Posts() {

   const [data, setData]= useState([]); 
   const [dataUser, setDataUser] = useState([]);

// mettre le userName dans le localStorage 
localStorage.setItem("userName", dataUser.userName,)

   //contexte
  const logCtx = useContext(LogContext);

  //recup fiche user 
  const getUser = (props) => {
    return fetch('http://localhost:3001/api/auth/users/' + logCtx.userId,{
      method: "GET",
      headers:{
        "Content-type" : "application/json",
        Authorization: `Bearer ${logCtx.token}`
      }
      })
      .then((res) => res.json())
      .then((data) => {
        setDataUser(data)
        })
      .catch((error) => {
        console.error(error);
      })
    };
  useEffect(() => {
    getUser();
  },[]); 
  

// recuperer tous les posts depuis la bdd 
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
        console.log(data);
        setData(data)
        })
      .catch((error) => {
        console.error(error);
      })
    };
    useEffect(() => {
      getAllPost();
    }, []);



    return (
       <div>
        <div>
          <Navbar />
        </div>
        <div className='containerPosts'>
          <h1>Les derniers posts:</h1>
            {data.map(dataPost => (
            <div key={dataPost._id} className="post">
            <Link to={"/post/" + dataPost._id} key={"post" + dataPost._id} className="linkPost">{dataPost.userName} a posté:</Link>
            <p><img src={dataPost.imageUrl} alt={"photo" + dataPost.content }></img></p>
            <p key={"content" + dataPost.userName}>"{dataPost.content}"</p>
            <div className='comment' onClick={()=> ""}>
              <Comments id={dataPost._id} dataUser={dataPost.userName} comments={dataPost.comments} />
            </div>
            </div>
            //<p key={dataPost._id}>{dataPost.userName} dit:{dataPost.content}</p>
            ))}
         </div>
        </div>

    );
  };

