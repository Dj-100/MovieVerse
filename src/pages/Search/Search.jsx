import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './Search.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Search = () => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchAiResults = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      const cachedResults = sessionStorage.getItem(`search_${searchQuery}`);
      if (cachedResults) {
        setResults(JSON.parse(cachedResults));
        setLoading(false);
        return;
      }

      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Based on the user's request for "${searchQuery}", provide a comma-separated list of up to 20 relevant movie or TV series titles. If the request is for an actor or director, list their most popular works. Only provide the list of titles, nothing else.`;
        
        const geminiResult = await model.generateContent(prompt);
        const responseText = await geminiResult.response.text();
        const movieTitles = responseText.split(',').map(title => title.trim());

        const tmdbPromises = movieTitles.map(title =>
          fetch(`https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`)
            .then(res => res.json())
            .then(data => data.results[0])
        );

        const tmdbResults = await Promise.all(tmdbPromises);
        
        const validResults = tmdbResults.filter(item => 
          item && (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );

        setResults(validResults);
        sessionStorage.setItem(`search_${searchQuery}`, JSON.stringify(validResults));

      } catch (err) {
        console.error("Error fetching AI search results:", err);

        if (err.message && err.message.includes('429')) {
          setError("AI search limit reached for today. Please try again later.");
        } else {
          setError("Sorry, we couldn't fetch results. Please try again.");
        }

      } finally {
        setLoading(false);
      }
    };

    fetchAiResults();
  }, [searchQuery]);

  return (
    <>
      <Navbar />
      <div className='search-page'>
        {loading && (
          <div className="search-spinner">
            <img src={netflix_spinner} alt="Loading..." />
          </div>
        )}
        {error && <p className="search-error">{error}</p>}
        {!loading && !error && (
          <>
            <h2 className='search-results-title'>AI Search Results for "{searchQuery}"</h2>
            <div className="search-results-grid">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link to={`/player/${item.id}`} className="search-card" key={item.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} />
                    <p>{item.title || item.name}</p>
                  </Link>
                ))
              ) : (
                <p>No results found for your query.</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;





