import React, { createContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const defaultValue = {
    token : "",
    userId: "",
    userName: "",
    userIsLogged: false,
    login: () => "",
    logout :() => ""
}

const LogContext = createContext(defaultValue);
// controle du token & userId dans le localStorage
const tokenStorage = localStorage.getItem("token");
const userIdStorage = localStorage.getItem("userId");

//provider 
export const LogContextProvider = (props) => {
    //stockage du token 
    const [token, setToken] = useState(tokenStorage);
    const [userId, setUserId] = useState(userIdStorage);
    const [userName, setUserName] = useState([]);
    
    // fonction pour mettre à jour les données d 'auth dans le state
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
    const LogoutHandler = () => {
        setToken(null);
        //supprimer la donnees du localStorage
        localStorage.removeItem("token", "userId");
        // retourner sur page d'authentification 
        let navigate = useNavigate(); 
        let path = `/`; 
              navigate(path);
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
        logout: LogoutHandler,
    };

    return(
        <LogContext.Provider value={contextValue}>
        {props.children}
        </LogContext.Provider>

    )
}
export default LogContext;

