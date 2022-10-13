import React, {useEffect, useState, useContext, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LogContext from '../config/LogContext';
import './Post.css';

export default function Post() {

    const [data, setData]= useState([]);
    const [update, setUpdate] = useState(false);
    const [likes, setLikes] = useState(0); 
    const [dislikes, setDislikes] = useState(0); 
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);
    const { id } = useParams();
    const numberOfLikes = data.likes;
    const numberOfDislikes = data.dislikes;
    const updatePost = useRef();

    let isAllowed = true;
    
       //contexte
    const logCtx = useContext(LogContext);


    if (data.userId === logCtx.userId) {
      isAllowed = true;
    }
    // ou role admnin a ajouter 


    const getAllPost = () => {

        return fetch('http://localhost:3001/api/posts/' + id,{
          method: "GET",
          headers:{
            "Content-type" : "application/json",
            Authorization: `Bearer ${logCtx.token}`
          }
        
        })
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
        },[]);

    let navigate = useNavigate(); 
  const deleteRoute = () =>{ 
      fetch('http://localhost:3001/api/posts/' + id, {
        method: "DELETE",
        headers:{
          "Content-type" : "application/json",
          Authorization: `Bearer ${logCtx.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          }, console.log(data))
        .catch((error) => {
          console.error(error);
        })

        let path = `/`; 
        navigate(path); 
    };


    const updateRoute = () =>{ 
      fetch('http://localhost:3001/api/posts/' + id, {
        method: "PUT",
        headers:{
          "Content-type" : "application/json",
          Authorization: `Bearer ${logCtx.token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          }, console.log(data))
        .catch((error) => {
          console.error(error);
        })
        /*let path = `/create`; 
        navigate(path);*/
        setUpdate((update) => !update)
        console.log(update);
    }

    const updateHandler = () => {
      const newInput = updatePost.current.value;
      console.log(newInput);
    }

  const removeLike = () => {
    fetch('http://localhost:3001/api/posts/' + id + "/like/", {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${logCtx.token}`
      },
      body: JSON.stringify({
          id: id,
          userId: logCtx.userId,
          like: 0,
          userLiked: [],
          userDisliked: []

      })
  })
  .then(res => res.json())
  .then(
      (data) => {
        console.log(data);
  })
  .catch((error) => {
    console.error(error);
  })
  console.log(data);
}

const dislike = () => {
  fetch('http://localhost:3001/api/posts/' + id + "/like/", {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${logCtx.token}`
    },
    body: JSON.stringify({
        id: id,
        userId: logCtx.userId,
        like: -1,
        userLiked: [],
        userDisliked: []

    })
})
.then(res => res.json())
.then(
    (data) => {
      console.log(data);
})
.catch((error) => {
  console.error(error);
})
}

const like = () => {
  fetch('http://localhost:3001/api/posts/' + id + "/like/", {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${logCtx.token}`
    },
    body: JSON.stringify({
        id: id,
        userId: logCtx.userId,
        like: 1,
        userLiked: [],
        userDisliked: []

    })
})
.then(res => res.json())
.then(
    (data) => {
      console.log(data);
})
.catch((error) => {
  console.error(error);
})
}

const handleLike = () => {
  if (!likeActive){
    setLikeActive(true)
    like()
  } else {
    setLikeActive(false)
    setLikes(removeLike)
  }
}
const handleDislike = () => {
  if(!dislikeActive){
    setDislikeActive(true)
    dislike()
  } else {
    setDislikeActive(false)
    setDislikes(removeLike)
  }
}


  return (
    <div>
      <div>
      <Navbar />
      </div>

      <div className='containerPost'>
        <h1>{data.userName} {data.userId} dit:</h1>

            <div key={data._id}>
                {!update && <p key={data._id}>{data.content}</p>}
                {update && <input type="text" value={data.content} onChange={updateHandler} ref={updatePost}></input>}
                {isAllowed ?
                <div className='btn'>
                <button onClick={updateRoute}>Modifier</button>
                <button onClick={deleteRoute}>Supprimer</button>
                </div> : 
                <div className='btn'>
                <button onClick={handleLike} className={[likeActive?'activeLike': 'button'].join('')}>Like {numberOfLikes}</button>
                <button onClick={handleDislike} className={[dislikeActive?'activeDislike': 'button'].join('')}>Dislike {numberOfDislikes}</button>
                </div>
                }

            </div>
      </div>

    </div>
  )
}