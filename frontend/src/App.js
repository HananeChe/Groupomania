import React from 'react';
import {Routes, Route} from "react-router-dom"
import './App.css';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Login';
import Signup from './pages/Signup';
//import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
      
      <Routes>
        <Route path="/login" element={<Login /> } />
        <Route path='/signup' element={<Signup />} />
        <Route path="/accueil" element={<Posts /> } />
        <Route path='/post' element={<Post />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
