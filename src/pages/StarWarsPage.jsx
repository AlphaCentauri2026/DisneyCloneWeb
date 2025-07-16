import React from 'react';
import ProductionHousePage from '../components/ProductionHousePage';
import globalAPI from '../services/globalAPI';

const StarWarsPage = () => {
  return (
    <ProductionHousePage
      companyName="Star Wars"
      description="Journey to a galaxy far, far away with Star Wars. Experience legendary tales of heroes, villains, and the Force."
      apiFunction={globalAPI.getStarWarsMovies}
      categoryName="Star Wars"
      videoSrc="/star-warsbacckGround.mp4"
    />
  );
};

export default StarWarsPage; 