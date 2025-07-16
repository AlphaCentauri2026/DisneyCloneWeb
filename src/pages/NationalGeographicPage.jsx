import React from 'react';
import ProductionHousePage from '../components/ProductionHousePage';
import globalAPI from '../services/globalAPI';

const NationalGeographicPage = () => {
  return (
    <ProductionHousePage
      companyName="National Geographic"
      description="Explore the wonders of our world with National Geographic. Inspiring curiosity and discovery through breathtaking documentaries and stories."
      apiFunction={globalAPI.getNationalGeographicMovies}
      categoryName="National Geographic"
      videoSrc="/national-geographicbackGround.mp4"
    />
  );
};

export default NationalGeographicPage; 