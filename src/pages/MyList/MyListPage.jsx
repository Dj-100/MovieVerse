import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import myList from '../../assets/my_list_data';
import { Link } from 'react-router-dom';
import './MyListPage.css';
import hero_banner from '../../assets/hero_banner.jpg';
import '../Home/Home.css';

const MyListPage = () => {
  const [listDetails, setListDetails] = useState([]);
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const animeIds = [46260, 1429];

  useEffect(() => {
    const fetchDetails = async () => {
      const fetchPromises = myList.map(item =>
        fetch(`https://api.themoviedb.org/3/${item.type}/${item.id}?api_key=${TMDB_API_KEY}&language=en-US`)
          .then(res => res.json())
      );
      const results = await Promise.all(fetchPromises);
      setListDetails(results.filter(item => item.poster_path));
    };
    fetchDetails();
  }, []);

  const movies = listDetails.filter(item => myList.find(i => i.id === item.id)?.type === 'movie');
  const series = listDetails.filter(item => myList.find(i => i.id === item.id)?.type === 'tv' && !animeIds.includes(item.id));
  const anime = listDetails.filter(item => animeIds.includes(item.id));

  return (
    <div className='my-list-page'>
      <Navbar />
      <div className="hero">
        <div className="hero-caption" style={{width: '100%', textAlign: 'center'}}>
           <h1 style={{fontSize: '50px', fontWeight: 'bold'}}>Divyam's Picks</h1>
        </div>
      </div>
      <div className="list-content-wrapper">
        <h3>Movies</h3>
        <div className="list-grid">{movies.map(item => (
            <Link to={`/player/${item.id}`} className="list-card" key={item.id}><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} /><p>{item.title || item.name}</p></Link>
        ))}</div>
        <h3>Series</h3>
        <div className="list-grid">{series.map(item => (
            <Link to={`/player/${item.id}`} className="list-card" key={item.id}><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} /><p>{item.title || item.name}</p></Link>
        ))}</div>
        <h3>Anime</h3>
        <div className="list-grid">{anime.map(item => (
            <Link to={`/player/${item.id}`} className="list-card" key={item.id}><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} /><p>{item.title || item.name}</p></Link>
        ))}</div>
      </div>
      <Footer />
    </div>
  );
};

export default MyListPage;