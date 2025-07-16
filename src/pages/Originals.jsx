import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import MovieDetail from '../components/MovieDetail';

const Originals = () => {
  const [originals, setOriginals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    const fetchOriginals = async () => {
      try {
        setLoading(true);
        
        // Fetch high-rated content from all categories to represent "originals"
        const [disneyMovies, pixarMovies, marvelMovies, starWarsMovies] = await Promise.all([
          globalAPI.getPopularMovies(),
          globalAPI.getPixarMovies(),
          globalAPI.getMarvelMovies(),
          globalAPI.getStarWarsMovies()
        ]);

        // Combine all movies and filter for high-rated content (8.0+ rating)
        const allMovies = [
          ...disneyMovies.data.results.map(movie => ({ ...movie, category: 'Disney' })),
          ...pixarMovies.data.results.map(movie => ({ ...movie, category: 'Pixar' })),
          ...marvelMovies.data.results.map(movie => ({ ...movie, category: 'Marvel' })),
          ...starWarsMovies.data.results.map(movie => ({ ...movie, category: 'Star Wars' }))
        ];

        // Filter for high-rated content and sort by rating
        const highRatedMovies = allMovies
          .filter(movie => movie.vote_average >= 7.5)
          .sort((a, b) => b.vote_average - a.vote_average)
          .slice(0, 50); // Top 50 high-rated movies

        setOriginals(highRatedMovies);
        setError(null);
      } catch (err) {
        setError('Failed to fetch originals');
        console.error('Error fetching originals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOriginals();
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovieId(null);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Disney': return 'bg-blue-600';
      case 'Pixar': return 'bg-green-600';
      case 'Marvel': return 'bg-red-600';
      case 'Star Wars': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading Disney+ Originals...</div>
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
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Disney+ Originals</h1>
          <p className="text-gray-400 mb-8">Premium content featuring the best of Disney, Pixar, Marvel, and Star Wars</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {originals.map((movie) => (
              <div
                key={movie.id}
                className="relative group cursor-pointer"
                onClick={() => handleMovieClick(movie.id)}
              >
                <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-white">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                    ORIGINAL
                  </div>
                  <div className={`absolute top-2 left-2 ${getCategoryColor(movie.category)} text-white text-xs px-2 py-1 rounded font-semibold`}>
                    {movie.category}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                    {movie.vote_average?.toFixed(1)}
                  </div>
                </div>
                <h3 className="text-white text-sm mt-2 truncate">{movie.title}</h3>
                <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
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

export default Originals; 