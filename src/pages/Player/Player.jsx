import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  const [error, setError] = useState(false);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2UyYzVkZTBjZjNjMTBiNWQxYTJmYzM3OGU5ZTI0MyIsIm5iZiI6MTcxNzUxNzg1NS4wODYwMDAyLCJzdWIiOiI2NjVmM2UxZmE5ZGFhOGRiMDU4MGRlYjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RTXFztCDAcKRLKeIooFKMRJ3FUgGMwODnrNG6TS-od0'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          setError(true);
          console.error("No video data found for this ID.");
        }
      })
      .catch(err => {
        setError(true);
        console.error(err);
      });
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => { navigate(-1) }} />
      {!error ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="player-error">
          <h2>Video Not Available</h2>
          <p>We couldn't find a trailer for this title.</p>
        </div>
      )}
      
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;