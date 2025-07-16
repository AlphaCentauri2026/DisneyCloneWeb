import React from 'react';
import ProductionHousePage from '../components/ProductionHousePage';
import globalAPI from '../services/globalAPI';

const PixarPage = () => {
  return (
    <ProductionHousePage
      companyName="Pixar"
      description="Pixar Animation Studios brings imagination to life with groundbreaking animation and heartwarming stories that inspire audiences of all ages."
      apiFunction={globalAPI.getPixarMovies}
      categoryName="Pixar"
      videoSrc="/pixarbackGround.mp4"
    />
  );
};

export default PixarPage; 