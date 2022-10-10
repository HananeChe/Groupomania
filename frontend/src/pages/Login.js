import React, { useRef, useState } from 'react';
import './Login.css';

export default function Login() {

const emailInputRef = useRef();
const passwordInputRef = useRef();
const [data, setData]= useState([]); 

 const onSubmit = (event) => {
  event.preventDefault();
  const emailValue = emailInputRef.current.value
  console.log(emailValue);
  const passwordValue = passwordInputRef.current.value
  console.log(passwordValue);

// logique de connexion

if (emailValue.trim().length === 0 || passwordValue.trim().length === 0) {
  return (
    alert("Veuillez entrez vos identifiants")
  )
}

const regexEmail = (value) => {
  return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
}
if (!regexEmail(emailValue)){
  return (
    alert("adresse e-mail incorrect")
  )
}

//recup api 
const url = "http://localhost:3001/api/auth/login"

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
.then((data) => setData(data))
.catch((error)=> console.log(error) )

// remettre à 0 le form
  emailInputRef.current.value = "";
  passwordInputRef.current.value = "";

 }

console.log(data);
  return (
    <div className='log'>
      <h1>Connectez-vous</h1>
      <form onSubmit={onSubmit}>
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
    </div>
  )
}
