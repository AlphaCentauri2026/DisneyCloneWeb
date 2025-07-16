import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import MovieDetail from './MovieDetail';

const ProductionHousePage = ({ 
  companyName, 
  description, 
  apiFunction, 
  categoryName,
  videoSrc
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await apiFunction();
        
        if (response.data && response.data.results) {
          const movieResults = response.data.results.slice(0, 20);
          setMovies(movieResults);
        } else {
          console.error(`No results found for ${companyName} movies`);
          setError(`No movies found for ${companyName}`);
        }
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${companyName} movies:`, err);
        setError(`Failed to fetch ${companyName} movies: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiFunction, companyName]);

  const handleMovieClick = (movieId) => {
    if (movieId) {
      setSelectedMovieId(movieId);
    } else {
      console.error('Invalid movie ID:', movieId);
    }
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovieId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading {companyName} content...</div>
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

  return (
    <>
      {/* Video Background */}
      {videoSrc && (
        <video
          className="video-bg"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {/* Overlay */}
      <div className="overlay" />

      <div className="main relative min-h-screen">
        {/* Hero Section - Left Side Content */}
        <div className="content relative z-10 pt-20 px-8 pb-60">
          <div className="max-w-2xl">
            {/* Hero Header */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">{companyName}</h1>
              <p className="text-xl text-gray-200 leading-relaxed drop-shadow-lg">{description}</p>
            </div>

            {/* Additional Content - Stats or Features */}
            <div className="mt-8">
              <div className="flex gap-8">
                <div className="text-white">
                  <div className="text-2xl font-bold mb-1">{movies.length}+</div>
                  <div className="text-gray-300 text-sm">Amazing Movies</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold mb-1">4.8★</div>
                  <div className="text-gray-300 text-sm">Average Rating</div>
                </div>
                <div className="text-white">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-gray-300 text-sm">Streaming Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Section - Horizontal Cards */}
        <div className="content relative z-10 px-8 pb-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-4">Featured {categoryName} Movies</h2>
            <div className="relative">
              <div className="flex gap-4 py-2 overflow-x-auto scrollbar-hide">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0 w-48 h-72 bg-gray-900 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-white transform-gpu cursor-pointer relative rounded"
                    style={{ transformOrigin: 'center center' }}
                    onClick={() => handleMovieClick(movie.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleMovieClick(movie.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${movie.title}`}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(`Failed to load image for movie: ${movie.title}`);
                        e.target.src = 'https://via.placeholder.com/192x288/1a1a1a/ffffff?text=No+Image';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                      <h3 className="text-white text-xs font-semibold truncate text-center">{movie.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedMovieId && (
        <MovieDetail
          movieId={selectedMovieId}
          onClose={handleCloseMovieDetail}
        />
      )}
    </>
  );
};

export default ProductionHousePage;