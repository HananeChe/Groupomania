import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar'>
            <div className='container'>
                <p>Bonjour name</p>
                <button>Déconnection</button>
            </div> 
            <ul className='navbar-nav'>
                <Link to="/" className='nav-item'>Accueil</Link>
                <Link to="/post" className='nav-item'>Profil</Link>

            </ul>
        </nav>
      </div>
    )
  }
}
