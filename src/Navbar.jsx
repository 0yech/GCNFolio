import React from 'react';
import './navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
		<a href="#" className="navbar-logo">
        <img
          src="gcLogoWhite.png"
          alt="Logo"
          width="35"
          height="40"
          style={{ marginRight: '8px' }}
        />
      </a>
      <a href="https://github.com/0yech" target="_blank" rel="noopener noreferrer">
	  <img
          src="https://img.icons8.com/m_sharp/200/FFFFFF/github.png"
          alt="GitHub"
          width="40"
		  height="40"
    	/>
      </a>
    <p className='navtext'>Use arrow keys to move around ↑↓← →</p>
    </div>
  );
}
