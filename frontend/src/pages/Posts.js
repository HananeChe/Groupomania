import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Posts = () => {
    const [error] = useState(null);
    const [posts] = useState([]);
    const [users] = useState([]);

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else {
        return (
            <React.Fragment>   
                <div className="container">
                    <h1>Tous les posts publiés</h1>
                    <div className="">
                        <button className="btn" onClick={() => {<Link to=""/>}}>Publier un post</button>
                    </div>
                    {posts.map((post) => (
                        <div className="card" key={"articleCard" + post.id}>
                            {users.map((user) => {
                                    if (user.id === post.userId && user.imageUrl) {
                                    return <img src={"http://localhost:8080/images/" + user.imageUrl} alt="user" key={"userImage" + post.id} />
                                    } else if (user.id === post.userId && !user.imageUrl) {
                                        return <img src="" alt="user" key={"userImage" + post.id} />
                                    } else {
                                        return null
                                    }
                            })}
                            <div className= "" key={"" + post.id}>
                                {users.map((user) => {
                                    if(user.id === post.userId){
                                        return <h2 key={"h2" +user.id}>Publié par <Link to={"/users/" + user.id} key={user.id + post.id}className="">{user.firstname} {user.lastname}</Link></h2>
                                    } else {
                                        return null
                                    }
                                })}
                                <Link to={"/post/" + post.id} key={"post" + post.id} className="nav-link">{post.title}</Link>
                                <p key={"content" + post.id}>{post.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    } 
};

export default Posts;




    /*const storage = JSON.parse(localStorage.getItem('userConnect'));
    let token = "Bearer " + storage.token;

    useEffect(() => {
      fetch("http://localhost:8080/api/articles", 
        {headers: 
            {"Authorization" : token}
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPosts(result.data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [token])

    useEffect(() => {
        fetch("http://localhost:8080/api/users/", 
            {headers: 
                {"Authorization" : token}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUsers(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [token])*/
