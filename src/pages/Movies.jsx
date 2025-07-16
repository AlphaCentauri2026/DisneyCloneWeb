import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import globalAPI from '../services/globalAPI';
import MovieDetail from '../components/MovieDetail';

const Movies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState('all');

  // Initialize filter from URL params
  useEffect(() => {
    const urlFilter = searchParams.get('filter');
    if (urlFilter) {
      setFilter(urlFilter);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch movies from all categories
        const [disneyMovies, pixarMovies, marvelMovies, starWarsMovies, natGeoMovies] = await Promise.all([
          globalAPI.getPopularMovies(),
          globalAPI.getPixarMovies(),
          globalAPI.getMarvelMovies(),
          globalAPI.getStarWarsMovies(),
          globalAPI.getNationalGeographicMovies()
        ]);

        const movies = [
          ...disneyMovies.data.results.map(movie => ({ ...movie, category: 'Disney' })),
          ...pixarMovies.data.results.map(movie => ({ ...movie, category: 'Pixar' })),
          ...marvelMovies.data.results.map(movie => ({ ...movie, category: 'Marvel' })),
          ...starWarsMovies.data.results.map(movie => ({ ...movie, category: 'Star Wars' })),
          ...natGeoMovies.data.results.map(movie => ({ ...movie, category: 'National Geographic' }))
        ];

        // Remove duplicates based on movie ID
        const uniqueMovies = movies.filter((movie, index, self) => 
          index === self.findIndex(m => m.id === movie.id)
        );

        setAllMovies(uniqueMovies);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovieId(null);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter: newFilter });
    }
  };

  const getFilteredMovies = () => {
    if (filter === 'all') return allMovies;
    return allMovies.filter(movie => movie.category === filter);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Disney': return 'bg-blue-600';
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
        <div className="text-white text-xl">Loading Movies...</div>
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

  const filteredMovies = getFilteredMovies();

  return (
    <>
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>
          <p className="text-gray-400 mb-6">Discover movies from Disney, Pixar, Marvel, Star Wars, and National Geographic</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              All Movies
            </button>
            <button
              onClick={() => handleFilterChange('Disney')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Disney' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Disney
            </button>
            <button
              onClick={() => handleFilterChange('Pixar')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Pixar' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Pixar
            </button>
            <button
              onClick={() => handleFilterChange('Marvel')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Marvel' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Marvel
            </button>
            <button
              onClick={() => handleFilterChange('Star Wars')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'Star Wars' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Star Wars
            </button>
            <button
              onClick={() => handleFilterChange('National Geographic')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'National Geographic' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              National Geographic
            </button>
          </div>

          {/* Results count */}
          {filter !== 'all' && (
            <div className="mb-6">
              <p className="text-gray-400">
                Showing {filteredMovies.length} {filter} movies
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredMovies.map((movie) => (
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
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                    {movie.vote_average?.toFixed(1)}
                  </div>
                  <div className={`absolute top-2 left-2 ${getCategoryColor(movie.category)} text-white text-xs px-2 py-1 rounded font-semibold`}>
                    {movie.category}
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

export default Movies; 