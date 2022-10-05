import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div>
        <h1>Bienvenue sur le réseau sociale de Groupomania !</h1>
        <div>
            <button className="btn" onClick={() => {<Link to="/login" />}}>Se connecter</button>
            <button className="btn" onClick={() => {<Link to="/signup" />}}>S'inscrire</button>
        </div>
    </div>
  )
}
