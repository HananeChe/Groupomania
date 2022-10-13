import React, { Component } from 'react'
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <div className='headerTitle'>
        <h1 className='title'>Groupomania</h1>
        <h2 className=' welcomeTitle'>Bienvenue sur le réseau sociale de Groupomania !</h2>
      </div>
    )
  }
}
