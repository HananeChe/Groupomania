import React, { Component } from 'react';
import './Comments.css'

export default class Comments extends Component {
    constructor (props) {
        super(props)

        const userIdStorage = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // state à récuperer pour les commentaires
        this.state = {
          id: props.id,
          userId: userIdStorage,
          userName: "",
          articleId: '',
          content: undefined,
          comments: props.comments,
        }
      
      // recupération userName pour voir qui a posté le com
       fetch('http://localhost:3001/api/auth/users/' + userIdStorage, {
          method: "GET",
          headers:{
            "Content-type" : "application/json",
            Authorization: `Bearer` + token
          }
          })
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              userName: data.userName
            })
          })
          .catch((error) => {
            console.error(error);
          })

        // liaison pour l'utilisation de `this` dans la fonction de rappel
        this.handleChange = this.onChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        

    }

    // au changement de l'input com recup des values
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }


    onSubmit = (event) => {
        event.preventDefault()
        const tokenStorage = localStorage.getItem("token");
        let token = "Bearer " + tokenStorage ;
    //envoi du com a la bdd
        return fetch((`http://localhost:3001/api/posts/${this.state.id}/comments`),{
          method: "POST",
          headers:{
            "Content-type" : "application/json",
            Authorization: token
          },
            body: JSON.stringify(this.state)
          })
          .then(res => res.json())
          .then(
            (data) => {
          if (data.error) { 
              alert("Votre commentaire n'a pas pu être publié : " + data.error); 
          } else { 
            alert('Commentaire publié!');
            // recuperation des data du com pour les implementer dans le html 
            this.setState({
              userId: data.data.userId,
              content:data.data.content,
              comments: data.data.comments,
              userName: data.data.userName,
          })
          console.log(this.state.userName);
          console.log(this.state.comments);
          }})
          .catch(error => {
              console.error(error);
          });
    } 




  render() {
    return (
      <div>
        <div>
          <form>
            <label>Ecrire un commentaire :</label>
            <input aria-label = "comments" className='inputCom' type="textarea" name="content" value={this.state.content} onChange={this.onChange}/>
            <div>
              <button className='comsBtn' onClick={this.onSubmit}>Publier un commentaire</button>
            </div>
          </form>
        </div>
        <div>
          {this.state.comments.map(element => 
          <div key={"name" + element.content} className="newCom">
            <h4>Publié par {element.userName}:</h4>
            <p key={"comment" + this.state.id} className="content-comment">{element.content}</p>
          </div>
          )}
        </div>
      </div>
    )
  }
}
