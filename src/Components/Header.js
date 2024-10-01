import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
        <div className='container'>
        <img className="logo" src="drug-master-logo.png"></img>
        <nav className="nav-menu">
            <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        </div>
    </header>
  );
}

export default Header;