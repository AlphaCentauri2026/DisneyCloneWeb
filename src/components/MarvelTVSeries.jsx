import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import TVShowDetail from './TVShowDetail';

const MarvelTVSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    const fetchMarvelTVSeries = async () => {
      try {
        setLoading(true);
        const response = await globalAPI.getMarvelTVSeries();
        setSeries(response.data.results.slice(0, 30)); // Get up to 30 series
        setError(null);
      } catch (err) {
        console.error('Error fetching Marvel TV series:', err);
        setError('Failed to fetch Marvel TV series');
      } finally {
        setLoading(false);
      }
    };

    fetchMarvelTVSeries();
  }, []);

  const handleShowClick = (showId) => {
    if (showId) {
      setSelectedShowId(showId);
    } else {
      console.error('Invalid show ID:', showId);
    }
  };

  const handleCloseShowDetail = () => {
    setSelectedShowId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading Marvel TV series...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <h2 className="text-white text-2xl font-bold mb-6 ml-4">Marvel TV Series</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-8 overflow-y-visible">
            {series.map((show) => (
              <div
                key={show.id}
                className="flex-shrink-0 w-64 h-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-white transform-gpu cursor-pointer relative"
                style={{ transformOrigin: 'center center' }}
                onClick={() => handleShowClick(show.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleShowClick(show.id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${show.name}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image for show: ${show.name}`);
                    e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold truncate">{show.name}</h3>
                  <p className="text-gray-300 text-sm">
                    {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedShowId && (
        <TVShowDetail
          showId={selectedShowId}
          onClose={handleCloseShowDetail}
        />
      )}
    </>
  );
};

export default MarvelTVSeries; 