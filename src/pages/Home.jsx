import React from 'react';
import Slider from '../components/slider';
import ProductionHouse from '../components/productionHouse';
import RecommendedMovies from '../components/RecommendedMovies';
import PixarMovies from '../components/PixarMovies';
import PixarTVSeries from '../components/PixarTVSeries';
import MarvelMovies from '../components/MarvelMovies';
import MarvelTVSeries from '../components/MarvelTVSeries';
import StarWarsMovies from '../components/StarWarsMovies';
import StarWarsTVSeries from '../components/StarWarsTVSeries';
import NationalGeographicMovies from '../components/NationalGeographicMovies';
import NationalGeographicTVSeries from '../components/NationalGeographicTVSeries';
import GenreSections from '../components/GenreSections';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Slider/>
      <ProductionHouse/>
      <RecommendedMovies/>
      <PixarMovies/>
      <PixarTVSeries/>
      <MarvelMovies/>
      <MarvelTVSeries/>
      <StarWarsMovies/>
      <StarWarsTVSeries/>
      <NationalGeographicMovies/>
      <NationalGeographicTVSeries/>
      <GenreSections/>
    </div>
  );
};

export default Home; 