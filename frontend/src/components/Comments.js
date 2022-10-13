import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Comments extends Component {
    constructor (props) {
        super(props)
    
        const userIdStorage = localStorage.getItem("userId");
        const userNameStorage = localStorage.getItem("userName");

        this.state = {
            userId: userIdStorage,
            userName: userNameStorage,
            articleId: '',
            content: undefined,
            comments: [],
        }

        this.handleChange = this.onChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
        console.log(this.state.content);
        console.log(event.target.value);
      }

      onSubmit = (event) => {
        event.preventDefault()
    
        const tokenStorage = localStorage.getItem("token");
        let token = "Bearer " + tokenStorage ;
    
        return fetch(('http://localhost:3001/api/posts/comments'),{
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
            this.setState({
              content:"",
              comments:[...this.state.comments, {content: this.state.content}],
          })
      }})
      .catch(error => {
          console.error(error);
    });
      }
      renderPost =() => {
        return this.state.comments.map((comment, index) => {
            return (
                <div key={comment + this.state.userId}>
                <h4>Publié par {this.state.userName}</h4>
                <p key={"comment" + comment.id} className="content-comment">{comment.content}</p>
                </div>
            )
        }
      )}

  render() {
    return (
      <div>
            <div>
                <form controlId="exampleForm.ControlTextarea1" >
                        <label>Votre commentaire :</label>
                        <input type="textarea" name="content" value={this.state.content} onChange={this.onChange}/>
                    </form>
                    <div className="form-submit">
                        <button className="btn btn-outline-info" onClick={this.onSubmit}>Post</button>
                    </div>
                    {this.renderPost()}
                </div>

      </div>
    )
  }
}
