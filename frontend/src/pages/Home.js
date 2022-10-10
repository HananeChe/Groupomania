import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {

    const navigate = useNavigate();
  
  return (
    <div className='home'>
        <h1>Bienvenue sur le réseau sociale de Groupomania !</h1>
          <div>
              <button className='btn' onClick={() => navigate('/login') }>Se connecter</button>
              <button className='btn' onClick={() => navigate('/signup') }>S'inscrire</button>
          </div>
    </div>
  )
}
