import React, {useEffect, useState, useContext, useRef} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LogContext from '../config/LogContext';
import './Post.css';

export default function Post(data) {
    const [dataUpdate, setDataUpdate]= useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [update, setUpdate] = useState(false);
    const [likes, setLikes] = useState(0); 
    const [dislikes, setDislikes] = useState(0); 
    const [likeActive, setLikeActive] = useState(false);
    const [dislikeActive, setDislikeActive] = useState(false);
    const { id } = useParams();
    const updatePost = useRef();

    let navigate = useNavigate(); 
    let isAllowed = false;
    
       //contexte
    const logCtx = useContext(LogContext);
    //console.log(logCtx.userId);

    // si utilisateur est le meme que userId du post ou admin , acces autorisé 
    if (dataUpdate.userId === logCtx.userId || dataUser.isAdmin === true) {
      isAllowed = true;
    }


    // function recuperer un post avec l'id
    const getOnePost = (data) => {
        return fetch('http://localhost:3001/api/posts/' + id,{
          method: "GET",
          headers:{
            "Content-type" : "application/json",
            Authorization: `Bearer ${logCtx.token}`
          }
          })
          .then((res) => res.json())
          .then((data) => {
            setDataUpdate(data)
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          })
      };
      // eviter boucle infini 
        useEffect(() => {
          getOnePost();
        },[]);
        

  // supprimer un post 
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
          setDataUpdate(data)
          }, console.log(data))
          alert('Votre publication à bien été effacée')
      .catch((error) => {
          console.error(error);
      })
        let path = `/`; 
        navigate(path); 
    };

// envoi la nouvelle image dans la dataUpdate
    const updateImgHandler = (event) => {
      const newImg = event.target.files[0];
      setDataUpdate({
        ...dataUpdate,
        "imageUrl":  newImg,
      })
    }
// envoyer le nouveau post dans la data
const updateHandler = () => {
  const newInput = updatePost.current.value;
  setDataUpdate({
    ...dataUpdate,
    "content":  newInput,
  })
}

// modifier un post 
    const updateRoute = (event) =>{ 
      const content = dataUpdate.content;
      const img = dataUpdate.imageUrl;
      const userId = dataUpdate.userId;
      const userName = dataUpdate.userName;
    //envoi du state dans le formData 
    const formData = new FormData();
    formData.append('image', img);
    formData.append('content', content);
    formData.append('userId', userId);
    formData.append('userName', userName);
      fetch('http://localhost:3001/api/posts/' + id, {
        method: "PUT",
        headers:{
          Authorization: `Bearer ${logCtx.token}`
        },
        body : formData
      })
      .then((res) => res.json())
      .then((data) => {
          setDataUpdate(dataUpdate);
          }, console.log(dataUpdate))
          alert('Votre post à été modifié avec succés!')
      .catch((error) => {
          console.error(error);
      })
        setUpdate((update) => !update)
    }




//ajouter un like 
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
        like: 1
    })
  })
  .then(res => res.json())
    .then(
    (data) => {
      setLikes(data.data.like)
      console.log(data.data.like);
  })
  .catch((error) => {
  console.error(error);
  })
}

  // ajouter un dislike 
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
      })
    })
    .then(res => res.json())
    .then(
      (data) => {
        setDislikes(+1)
        console.log(data.data.dislike);
    })
    .catch((error) => {
    console.error(error);
    })
  }

// remettre le like à 0 
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
      })
    })
    .then(res => res.json())
    .then(
      (data) => {
        console.log(data.data.like);
        console.log(data.data.dislike);;
    })
    .catch((error) => {
    console.error(error);
    })
  }


// si j'appui sur like une 1ere fois = fonction like() sinon remove like = 0 
const handleLike = () => {
  if (!likeActive){
    setLikeActive(true)
    like()
  } else {
    setLikeActive(false)
    setLikes(removeLike)
  }
}
// si j'appui sur dislike une 1ere fois = fonction like() sinon remove dislike = 0
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
        <h1>{dataUpdate.userName} dit:</h1>
          <div key={"post" + dataUpdate._id} className="onePost">
              {!update && <p key={dataUpdate._id}onChange={updateHandler}>"{dataUpdate.content}"</p>}
              {!update && <p><img src={dataUpdate.imageUrl} alt={"photo" + dataUpdate.content }></img></p>}
              {update && <input type="text" onChange={updateHandler} ref={updatePost}></input>
              }
              {update && <input type="file"onChange={updateImgHandler}></input>}
              {isAllowed ?
                <div className='btn'>
                <button onClick={updateRoute}>Modifier</button>
                <button onClick={deleteRoute}>Supprimer</button>
                </div> : 
                <div className='btn'>
                <button onClick={handleLike} className={[likeActive?'activeLike': 'button'].join('')}>Like {dataUpdate.likes}</button>
                <button onClick={handleDislike} className={[dislikeActive?'activeDislike': 'button'].join('')}>Dislike {dataUpdate.dislikes}</button>
                </div>
              }
          </div>
      </div>

  </div>
)
}


//