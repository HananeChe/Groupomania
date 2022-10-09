import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

export default function Post() {

    const [data, setData]= useState([]); 
    const { id } = useParams();
    console.log(id);
    

    const getAllPost = () => {

        return fetch('http://localhost:3001/api/posts/' + id,)
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
        let path = `/delete`; 
        navigate(path);
    }
    const updateRoute = () =>{ 
        let path = `/update`; 
        navigate(path);
    }


  return (
    <div>
        <h1>{data.userName} dit:</h1>

            <div key={data._id}>
                <p key={data._id}>{data.content}</p>
                <button onClick={updateRoute}>Modifier</button>
                <button onClick={deleteRoute}>Supprimer</button>
            </div>

    </div>
  )
}
