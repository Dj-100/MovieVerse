import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_img from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

useEffect(() => {
  const handleScroll = () => {
    if (!navRef.current) {
      return;
    }

    if (window.scrollY >= 80) {
      navRef.current.classList.add('nav-dark');
    } else {
      navRef.current.classList.remove('nav-dark');
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${searchInput}`);
    }
  };

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <Link to='/'>
          <img src={logo} alt="Logo" />
        </Link>
        <ul>
          <Link to='/'><li>Home</li></Link>
          <Link to='/tv'><li>TV Shows</li></Link>
          <Link to='/movies'><li>Movies</li></Link>
          <Link to='/my-list'><li>Divyam's Picks</li></Link>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="AI Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className='search-btn'>
            <img src={search_icon} alt="search" className='icons' />
          </button>
        </form>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className='icons' />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className='profile' />
          <img src={caret_img} alt="Dropdown" />
          <div className="dropdown">
            <p onClick={() => { logout() }}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;