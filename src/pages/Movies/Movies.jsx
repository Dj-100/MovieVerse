import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';

const Movies = () => {
  return (
    <div className='movies-page page-content'>
      <Navbar />
      <div className="more-cards">
        <TitleCards title={"Popular Movies"} mediaType="movie" category={"popular"}/>
        <TitleCards title={"Top Rated Movies"} mediaType="movie" category={"top_rated"}/>
        <TitleCards title={"Upcoming Movies"} mediaType="movie" category={"upcoming"}/>
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
