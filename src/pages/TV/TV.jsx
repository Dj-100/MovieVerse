import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';

const TV = () => {
  return (
    <div className='tv-page page-content'>
      <Navbar />
      <div className="more-cards">
        <TitleCards title={"Popular TV Shows"} mediaType="tv" category={"popular"}/>
        <TitleCards title={"Top Rated TV Shows"} mediaType="tv" category={"top_rated"}/>
        <TitleCards title={"Currently Airing"} mediaType="tv" category={"on_the_air"}/>
      </div>
      <Footer />
    </div>
  );
};

export default TV;



