import React, { useContext, useRef, useState } from 'react';
import LogContext from '../config/LogContext';
import './Login.css';

export default function Login() {
  
const userNameInputRef = useRef();
const emailInputRef = useRef();
const passwordInputRef = useRef();

//utilisation du contexte 
const logCtx = useContext(LogContext)
console.log(logCtx.userName);

const [data, setData]= useState([]); 
const [hasAccount, setHasAcount] = useState(true);



//passer de se connecter à creer un compte 
const toggleLog = () => {
  setHasAcount((prevState) => (!prevState))
}

 const onSubmit = (event) => {
  
  // creer un compte
  if(!hasAccount){
    event.preventDefault();
    const userNameValue = userNameInputRef.current.value
    console.log(userNameValue);
    const emailValue = emailInputRef.current.value
    console.log(emailValue);
    const passwordValue = passwordInputRef.current.value
    console.log(passwordValue); 
  
  // gestion error de connexion
  if (emailValue.trim().length === 0 || passwordValue.trim().length === 0 || userNameValue.trim().length === 0 ) {
    return (
      alert("Veuillez entrez vos identifiants")
    )
  }
  //regex
  const regexEmail = (value) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
  }
  if (!regexEmail(emailValue)){
    return (
      alert("adresse e-mail incorrect")
    )
  }
  
  //recup api 
  let url;
  url = "http://localhost:3001/api/auth/signup";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      userName: userNameValue,
      email: emailValue,
      password: passwordValue
    }),
    headers:{
      "Content-type" : "application/json"
    }
  })
  .then((res) => res.json())
  .then((data) => {
    setData(data)
    logCtx.login(data.token, data.userId, data.userName)
  })
  .catch((error)=> console.log(error) )
  
  
  // remettre à 0 le form
    userNameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  } 

  //se connecter
  else {
    event.preventDefault();
    const emailValue = emailInputRef.current.value
    const passwordValue = passwordInputRef.current.value
  
  // gestion erreur de connexion
  if (emailValue.trim().length === 0 || passwordValue.trim().length === 0) {
    return (
      alert("Veuillez entrez vos identifiants")
    )
  }
  //regex
  const regexEmail = (value) => {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
  }
  if (!regexEmail(emailValue)){
    return (
      alert("adresse e-mail incorrect")
    )
  }
  
  //recup api 
  let url;
  url = "http://localhost:3001/api/auth/login";

  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      email: emailValue,
      password: passwordValue
    }),
    headers:{
      "Content-type" : "application/json"
    }
  
  })
  .then((res) => res.json())
  .then((data) => {
    setData(data)
    logCtx.login(data.token, data.userId)
  })
  .catch((error)=> console.log(error) )
  
  
  // remettre à 0 le form
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }
}
  return (
    <div className='log'>
      {hasAccount? <h1>Connectez-vous</h1> : <h1>Créer un compte</h1>}
      <form onSubmit={onSubmit}>

      {!hasAccount && <div className='control'>
        <label htmlFor='name'>Votre identifiant:</label>
        <input type="name" ref={userNameInputRef}></input>
        </div>}

        <div className='control'>
        <label htmlFor='email'>Votre email:</label>
        <input type="email" ref={emailInputRef}></input>
        </div>

        <div className='control'>
        <label htmlFor='password'>Votre mot de passe:</label>
        <input type="password" ref={passwordInputRef}></input>
        </div>

        <div className='btnClick'>
        <button className='btn' onClick={() => {}}>Go</button>
        </div>
      </form>
      {<p  className='toggle' onClick={toggleLog}>{hasAccount ? "Cliquez ici pour créer un compte" : "Cliquez ici pour vous connectez-vous"}</p>}
    </div>
  )
}
