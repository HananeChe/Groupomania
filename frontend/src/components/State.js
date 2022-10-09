import React, { Component } from 'react'
import { Link } from 'react-router-dom';
//import Login from '../pages/Login';

export default class State extends Component {
 
    state = {
    userName:"",
    content:"",
    items: []
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
    this.setState({
        userName:"",
        content:"",
        items:[...this.state.items, {userName: this.state.userName, content: this.state.content}]
    });
  }

  renderPost =() => {
    return this.state.items.map((item, index) => {
        console.log(item.userName);
        return (
            <div key={index}>
            <Link to={"/post/" + index} key={"post" + index}>{item.userName}</Link>
            <p key={"content" + index}>{item.content}</p>
            </div>
        )
    }
  )}

    render() {
    return (
        <div>
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
