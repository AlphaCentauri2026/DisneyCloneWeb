import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import MovieDetail from './MovieDetail';

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        setLoading(true);
        const response = await globalAPI.getRecommendedMovies();
        setMovies(response.data.results.slice(0, 30)); // Get up to 30 movies
        setError(null);
      } catch (err) {
        setError('Failed to fetch recommended movies');
        console.error('Error fetching recommended movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovieId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading recommended movies...</div>
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
        <h2 className="text-white text-2xl font-bold mb-6 ml-4">Recommended for You</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide gap-4 px-4 py-8 overflow-y-visible">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex-shrink-0 w-64 h-96 bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-white transform-gpu cursor-pointer"
                style={{ transformOrigin: 'center center' }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                  }}
                />
              </div>
            ))}
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

export default RecommendedMovies; 