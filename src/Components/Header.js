import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();
  return (
    <header className="header">
        <div className='container'>
        <img className="logo" src="drug-master-logo.png" onClick={() => navigate('/')}></img>
        <nav className="nav-menu">
            <ul>
            <li><a href="/">메인 화면</a></li>
            <li><a href="/introduction">다제약물 관리사업 소개</a></li>
            </ul>
        </nav>
        </div>
    </header>
  );
}

export default Header;