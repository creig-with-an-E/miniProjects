import React from 'react';

const Navbar = () =>{
  return (
    <nav className ="navbar navbar-dark mb-5" style={{backgroundColor: "#264E36"}}>
      <span className="navbar-brand mb-0 h1 mx-auto" style={style.headerStyle}>LyricFinder</span>
    </nav>)
}

export default Navbar

const style={
  headerStyle :{
    fontFamily: 'Wendy One',
    fontSize:26
  }
}