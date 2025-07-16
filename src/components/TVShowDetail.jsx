import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import { IoClose, IoPlay, IoStar, IoTime, IoCalendar, IoHeart, IoHeartOutline } from 'react-icons/io5';

const TVShowDetail = ({ showId, onClose }) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const response = await globalAPI.getTVShowDetails(showId);
        setShow(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching TV show details:', err);
        setError(`Failed to fetch TV show details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      fetchShowDetails();
    } else {
      console.error('No show ID provided to TVShowDetail component');
      setError('No show ID provided');
    }
  }, [showId]);

  // Check if show is in watchlist
  useEffect(() => {
    if (show) {
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
      setIsInWatchlist(watchlist.some(item => item.id === show.id));
    }
  }, [show]);

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
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
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
    if (!show) return;

    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    
    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = watchlist.filter(item => item.id !== show.id);
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(false);
    } else {
      // Add to watchlist
      const showToAdd = {
        id: show.id,
        title: show.name,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date,
        vote_average: show.vote_average,
        media_type: 'tv'
      };
      const updatedWatchlist = [...watchlist, showToAdd];
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setIsInWatchlist(true);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-xl">Loading TV show details...</div>
        <button
          onClick={handleCloseClick}
          className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2 z-50"
        >
          <IoClose size={32} />
        </button>
      </div>
    );
  }

  if (error || !show) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-red-400 text-xl">{error || 'TV show not found'}</div>
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

      {/* Show Backdrop */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: show.backdrop_path 
              ? `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.9) 100%), url('https://image.tmdb.org/t/p/original${show.backdrop_path}')`
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
                    src={show.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                      : 'https://via.placeholder.com/320x480/1a1a1a/ffffff?text=No+Image'
                    }
                    alt={show.name}
                    className="w-80 h-auto rounded-lg shadow-2xl"
                    onError={(e) => {
                      console.error(`Failed to load poster for show: ${show.name}`);
                      e.target.src = 'https://via.placeholder.com/320x480/1a1a1a/ffffff?text=No+Image';
                    }}
                  />
                </div>

                {/* Show Info */}
                <div className="flex-1 text-white">
                  <h1 className="text-5xl font-bold mb-4">{show.name}</h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <IoStar className="text-yellow-400" />
                      <span>{show.vote_average?.toFixed(1)}/10</span>
                    </div>
                    {show.episode_run_time && show.episode_run_time.length > 0 && (
                      <div className="flex items-center gap-2">
                        <IoTime />
                        <span>{formatRuntime(show.episode_run_time[0])}</span>
                      </div>
                    )}
                    {show.first_air_date && (
                      <div className="flex items-center gap-2">
                        <IoCalendar />
                        <span>{formatDate(show.first_air_date)}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-700 rounded text-sm">
                        {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Genres */}
                  {show.genres && show.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {show.genres.map((genre) => (
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
                  {show.tagline && (
                    <p className="text-xl text-gray-400 italic mb-6">"{show.tagline}"</p>
                  )}

                  {/* Overview */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3">Overview</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {show.overview || 'No overview available.'}
                    </p>
                  </div>

                  {/* Cast */}
                  {show.credits?.cast && show.credits.cast.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3">Cast</h3>
                      <div className="flex flex-wrap gap-2">
                        {show.credits.cast.slice(0, 10).map((actor) => (
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

export default TVShowDetail; 