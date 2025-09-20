import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category, mediaType = 'movie' }) => { 
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2UyYzVkZTBjZjNjMTBiNWQxYTJmYzM3OGU5ZTI0MyIsIm5iZiI6MTcxNzUxNzg1NS4wODYwMDAyLCJzdWIiOiI2NjVmM2UxZmE5ZGFhOGRiMDU4MGRlYjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RTXFztCDAcKRLKeIooFKMRJ3FUgGMwODnrNG6TS-od0'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${mediaType}/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category, mediaType]); 

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.original_title || card.name} />
              <p>{card.original_title || card.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;