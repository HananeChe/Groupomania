import React, { useContext }from 'react';
import {Routes, Route} from "react-router-dom"
import './App.css';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import LogContext from './config/LogContext';
import Publish from './pages/Publish';



function App() {
//contexte
const logCtx = useContext(LogContext);
const isLogged = logCtx.isLogged;



  return (
    <div className="App">

      <Header />
      <Routes>
      <Route path="/" element={isLogged ? <Posts /> : <Login /> }>
      </Route>
      </Routes>
      
      <Routes>
      <Route path="/create" element={<Publish />} />
      <Route path="/post/:id" element={<Post />} />
      </Routes>
      <Footer />

    </div>
  );
}

export default App;