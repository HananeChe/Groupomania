import React, { createContext, useMemo, useState } from 'react'

const defaultValue = {
    token : "",
    userId: "",
    userName: "",
    userIsLogged: false,
    login: () => "",
    logout :() => ""
}

const LogContext = createContext(defaultValue);
// controle du token dans le localStorage
const tokenStorage = localStorage.getItem("token");
const userIdStorage = localStorage.getItem("userId");


//provider 
export const LogContextProvider = (props) => {
    //stockage du token 
    const [token, setToken] = useState(tokenStorage);
    const [userId, setUserId] = useState(userIdStorage);
    const [userName, setUserName] = useState([]);

    //fonction pour garder en memoire le userName 

    //const nameValue = useMemo(()=>({userName, setUserName}), [userName, setUserName])
    

    // fonction pour mettre à jour le token dans le state
    const loginHandler = (token, userId, userName) => {
        setToken(token);
        setUserId(userId);
        setUserName(userName);
        // enregistrer le token dans le localStorage
        localStorage.setItem("token", token,)
        localStorage.setItem("userId", userId)
        localStorage.setItem("userName", userName)
    };

    // se deconnecter => token = null
    const logoutHandler = () => {
        setToken(null);
        //supprimer la donnees du localStorage
        localStorage.removeItem("token", "userId");
    }

    // verification de connexion (false or true)
    const userIsLogged = !!token;
    //console.log(userIsLogged);

    //valeure du contexte
    const contextValue = {
        token : token,
        userId: userId,
        userName: userName,
        isLogged: userIsLogged,
        login : loginHandler,
        logout: logoutHandler,
    };

    return(
        <LogContext.Provider value={contextValue}>
        {props.children}
        </LogContext.Provider>

    )
}

export default LogContext;

