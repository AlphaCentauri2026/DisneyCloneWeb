import React from 'react';
import ProductionHousePage from '../components/ProductionHousePage';
import globalAPI from '../services/globalAPI';

const MarvelPage = () => {
  return (
    <ProductionHousePage
      companyName="Marvel"
      description="Marvel Studios delivers epic superhero adventures, bringing iconic characters and thrilling stories from the Marvel Universe to the big screen."
      apiFunction={globalAPI.getMarvelMovies}
      categoryName="Marvel"
      videoSrc="/marvelbackGround.mp4"
    />
  );
};

export default MarvelPage; 