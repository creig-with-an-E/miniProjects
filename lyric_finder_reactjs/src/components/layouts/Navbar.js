import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () =>{
  return (
    <nav className ="navbar navbar-dark mb-5" style={{backgroundColor: "#2B2D42"}}>
      <Link to={"/"} className="navbar-brand mb-0 h1 mx-auto" style={style.headerStyle}>LyricFinder</Link>
    </nav>)
}

export default Navbar

const style={
  headerStyle :{
    fontFamily: 'Wendy One',
    fontSize:26
  }
}