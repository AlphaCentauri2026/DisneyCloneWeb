import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import TVShowDetail from '../components/TVShowDetail';

const Series = () => {
  const [allSeries, setAllSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [selectedShowId, setSelectedShowId] = useState(null);

  useEffect(() => {
    const fetchAllSeries = async () => {
      try {
        setLoading(true);
        
        // Fetch TV series from all categories
        const [pixarSeries, marvelSeries, starWarsSeries, natGeoSeries] = await Promise.all([
          globalAPI.getPixarTVSeries(),
          globalAPI.getMarvelTVSeries(),
          globalAPI.getStarWarsTVSeries(),
          globalAPI.getNationalGeographicTVSeries()
        ]);

        const series = [
          ...pixarSeries.data.results.map(show => ({ ...show, category: 'Pixar' })),
          ...marvelSeries.data.results.map(show => ({ ...show, category: 'Marvel' })),
          ...starWarsSeries.data.results.map(show => ({ ...show, category: 'Star Wars' })),
          ...natGeoSeries.data.results.map(show => ({ ...show, category: 'National Geographic' }))
        ];

        // Remove duplicates based on show ID
        const uniqueSeries = series.filter((show, index, self) => 
          index === self.findIndex(s => s.id === show.id)
        );

        setAllSeries(uniqueSeries);
        setError(null);
      } catch (err) {
        console.error('Error fetching series:', err);
        setError('Failed to fetch series');
      } finally {
        setLoading(false);
      }
    };

    fetchAllSeries();
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

  const getFilteredSeries = () => {
    if (filter === 'all') return allSeries;
    return allSeries.filter(show => show.category === filter);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Pixar': return 'bg-green-600';
      case 'Marvel': return 'bg-red-600';
      case 'Star Wars': return 'bg-yellow-600';
      case 'National Geographic': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading Series...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  const filteredSeries = getFilteredSeries();

  return (
    <>
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">TV Series</h1>
          <p className="text-gray-400 mb-6">Discover TV series from Pixar, Marvel, Star Wars, and National Geographic</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              All Series
            </button>
            <button
              onClick={() => setFilter('Pixar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Pixar' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Pixar
            </button>
            <button
              onClick={() => setFilter('Marvel')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Marvel' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Marvel
            </button>
            <button
              onClick={() => setFilter('Star Wars')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Star Wars' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Star Wars
            </button>
            <button
              onClick={() => setFilter('National Geographic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'National Geographic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              National Geographic
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredSeries.map((show) => (
              <div
                key={show.id}
                className="relative group cursor-pointer"
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
                <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-white">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image for show: ${show.name}`);
                      e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                    {show.vote_average?.toFixed(1)}
                  </div>
                  <div className={`absolute top-2 left-2 ${getCategoryColor(show.category)} text-white text-xs px-2 py-1 rounded font-semibold`}>
                    {show.category}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-sm font-semibold truncate">{show.name}</h3>
                    <p className="text-gray-300 text-xs">
                      {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
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

export default Series; 