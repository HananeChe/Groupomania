import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import './Publish.css'

export default class State extends Component {
  
  
  constructor (props) {
    super(props)

    //localstorage 
    const userIdStorage = localStorage.getItem("userId");
    const userNameStorage = localStorage.getItem("userName");
 
    // données du state necessaire pour faire une publication
    this.state = {
      userId: userIdStorage,
      userName: userNameStorage,
      content:"",
      imageUrl: null,
      items: []

  }

    // liaison pour l'utilisation de `this` dans la fonction de rappel.
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  }
  
  //handle des données type string
  onChange = (event) => {
    this.setState({
        [event.target.name] : event.target.value,
    });
  }

//handle de l'image 
onChangeImg = (event) => {
  this.setState({
    imageUrl: event.target.files[0]
  })
  console.log(event.target.files[0]);
}
  
  onSubmit = (event) => {
    event.preventDefault()

    const tokenStorage = localStorage.getItem("token");
    const token = "Bearer " + tokenStorage ;
    const content = this.state.content;
    const img = this.state.imageUrl;
    const userId = this.state.userId;
    const userName = this.state.userName;

    //envoi du state dans le formData 
    const formData = new FormData();
    formData.append('image', img);
    formData.append('content', content);
    formData.append('userId', userId);
    formData.append('userName', userName);
    console.log(content);
    console.log(img);
    console.log(userId);
    console.log(userName);

  return fetch(('http://localhost:3001/api/posts'),{
      method: "POST",
      headers:{
        Authorization: token
      },
      body: formData
    })
    .then(res => res.json())
    .then((data) => {
      console.log(formData)
      alert('Votre post à été publié avec succés!');
    })
    .catch(error => {
      console.error(error);
    });
}
  
    render() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
        <form onSubmit={this.onSubmit}>
        <div className='publish'>
            <label htmlFor='post'>Publier un post:</label>
            <input type="text" name="content" aria-label="text post" onChange={this.onChange} value={this.state.content} className="inputText"/>
            <input type="file" aria-label="image post" onChange={this.onChangeImg} name={this.state.imageUrl}className="inputFile"/>
            <button className='btn'>Valider</button>
        </div>
        <div>

        </div>
        </form>
      </div>
    )
}
}
