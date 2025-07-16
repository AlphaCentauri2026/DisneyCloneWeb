import React from 'react';
import ProductionHousePage from '../components/ProductionHousePage';
import globalAPI from '../services/globalAPI';

const DisneyPage = () => {
  return (
    <ProductionHousePage
      companyName="Disney"
      description="Where dreams come true. Experience the magic of Disney's timeless stories, beloved characters, and unforgettable adventures that have captured hearts for generations."
      apiFunction={globalAPI.getPopularMovies}
      categoryName="Disney"
      videoSrc="/disney backGround.mp4"
    />
  );
};

export default DisneyPage; 