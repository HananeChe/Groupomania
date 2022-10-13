import React, { useContext } from 'react'
import LogContext from '../config/LogContext';

export default function Test() {

//contexte
const logCtx = useContext(LogContext);
const isLogged = logCtx.isLogged;


  return (
    <div>
      {isLogged && <p>Vous etes connecté</p>}
      {isLogged && <p>Token: {logCtx.token}</p>}
      {isLogged && <p>userId: {logCtx.userId}</p>}
      {isLogged && <p>userName: {logCtx.userName}</p>}
      {!isLogged && <p>Vous n'etes pas connecté</p>}
      {isLogged && <button onClick={logCtx.logout}>Se deconnecter</button>}
    </div>
  )
}
