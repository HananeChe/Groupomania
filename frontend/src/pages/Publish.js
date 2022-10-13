import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
//import Login from '../pages/Login';

export default class State extends Component {
  constructor (props) {
    super(props)

    const userIdStorage = localStorage.getItem("userId");
 
    this.state = {
      userId: userIdStorage,
      userName:"",
      content:"",
      items: []

  }

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

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

    return fetch(('http://localhost:3001/api/posts'),{
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
          alert("Votre post n'a pas pu être publié : " + data.error); 
      } else { 
        this.setState({
          userName:"",
          content:"",
          items:[...this.state.items, {userName: this.state.userName, content: this.state.content}],
      })
  }})
  .catch(error => {
      console.error(error);
});
    /*this.setState({
        userName:"",
        content:"",
        items:[...this.state.items, {userName: this.state.userName, content: this.state.content}]
    });*/
  }

  renderPost =() => {
    return this.state.items.map((item, index) => {
        return (
            <div key={index}>
            <h3>{this.state.userId} vient de publier:</h3>
            <Link to={"/post/" + this.state.userId} key={"post" + this.state.userId}>{this.state.userId}</Link>
            <p key={"content" + index}>{item.content}</p>
            </div>
        )
    }
  )}

//<Link to={"/post/" + index} key={"post" + index}>{item.userName}</Link>

    render() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
        <form onSubmit={this.onSubmit}>
        <div>

            <label htmlFor='post'>Publier un post:</label>
            <input type="text" name="content" onChange={this.onChange} value= {this.state.content} />
          
        </div>
        <div className="">
          <button>Valider</button>
        </div>
        </form>
        {this.renderPost()}
      </div>
    )
}
}
