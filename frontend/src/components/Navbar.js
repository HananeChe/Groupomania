import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LogContext from '../config/LogContext';



export default function Navbar() {

  //contexte
const logCtx = useContext(LogContext);
const isLogged = logCtx.isLogged;

  const userName = localStorage.getItem("userName");

  return (
    <div>
      <nav className='navbar'>
        <div className='container'>
          <p>Bonjour {userName}</p>
          {isLogged && <button className="disconnect" onClick={logCtx.logout}>Se deconnecter</button>}
        </div>
        <ul className='navbar-nav'>
          <Link to="/" className='nav-item'>Accueil</Link>
          <Link to="/create" className='nav-item'>Publier un post</Link>
        </ul>
      </nav>
    </div>
  )
}



//<li onClick={() => useNavigate('/create') }>Publier une publication</li>