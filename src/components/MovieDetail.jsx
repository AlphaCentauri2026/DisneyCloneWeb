import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import { IoClose, IoPlay, IoStar, IoTime, IoCalendar, IoHeart, IoHeartOutline } from 'react-icons/io5';

const MovieDetail = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await globalAPI.getMovieDetails(movieId);
        setMovie(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(`Failed to fetch movie details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    } else {
      console.error('No movie ID provided to MovieDetail component');
      setError('No movie ID provided');
    }
  }, [movieId]);

  // Check if movie is in watchlist
  useEffect(() => {
    if (movie) {
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setIsInWatchlist(watchlist.some(item => item.id === movie.id));
    }
  }, [movie]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleWatchlistToggle = () => {
    if (!movie) return;

    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = watchlist.filter(item => item.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(false);
    } else {
      // Add to watchlist
      const movieToAdd = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average
      };
      const updatedWatchlist = [...watchlist, movieToAdd];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-xl">Loading movie details...</div>
        <button
          onClick={handleCloseClick}
          className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2 z-50"
        >
          <IoClose size={32} />
        </button>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-red-400 text-xl">{error || 'Movie not found'}</div>
        <button
          onClick={handleCloseClick}
          className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2 z-50"
        >
          <IoClose size={32} />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 overflow-y-auto z-50"
      onClick={handleBackdropClick}
    >
      {/* Close Button */}
      <button
        onClick={handleCloseClick}
        className="fixed top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors z-[60] bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
        style={{ zIndex: 9999 }}
      >
        <IoClose size={32} />
      </button>

      {/* Movie Backdrop */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: movie.backdrop_path 
              ? `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
              : 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%)'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex-1 flex items-end p-8">
            <div className="max-w-6xl mx-auto w-full">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/320x480/1a1a1a/ffffff?text=No+Image'
                    }
                    alt={movie.title}
                    className="w-80 h-auto rounded-lg shadow-2xl"
                    onError={(e) => {
                      console.error(`Failed to load poster for movie: ${movie.title}`);
                      e.target.src = 'https://via.placeholder.com/320x480/1a1a1a/ffffff?text=No+Image';
                    }}
                  />
                </div>

                {/* Movie Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <IoStar className="text-yellow-400" />
                      <span>{movie.vote_average?.toFixed(1)}/10</span>
                    </div>
                    {movie.runtime && (
                      <div className="flex items-center gap-2">
                        <IoTime />
                        <span>{formatRuntime(movie.runtime)}</span>
                      </div>
                    )}
                    {movie.release_date && (
                      <div className="flex items-center gap-2">
                        <IoCalendar />
                        <span>{formatDate(movie.release_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-sm">
                        {movie.adult ? 'R' : 'PG'}
                      </span>
                    </div>
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tagline */}
                  {movie.tagline && (
                    <p className="text-xl text-gray-400 italic mb-6">"{movie.tagline}"</p>
                  )}

                  {/* Overview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {movie.overview || 'No overview available.'}
                    </p>
                  </div>

                  {/* Cast */}
                  {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3">Cast</h3>
                      <div className="flex flex-wrap gap-2">
                        {movie.credits.cast.slice(0, 10).map((actor) => (
                          <span
                            key={actor.id}
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                          >
                            {actor.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors">
                      <IoPlay />
                      Watch Now
                    </button>
                    <button 
                      onClick={handleWatchlistToggle}
                      className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
                        isInWatchlist 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-gray-700 hover:bg-gray-600 text-white'
                      }`}
                    >
                      {isInWatchlist ? <IoHeart /> : <IoHeartOutline />}
                      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 