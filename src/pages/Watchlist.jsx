import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiOutlineDelete } from 'react-icons/ai';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // TODO: Load watchlist from localStorage or API
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">My Watchlist</h1>
        
        {watchlist.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <AiOutlineHeart className="text-6xl mx-auto mb-4 text-gray-600" />
            <h2 className="text-2xl font-semibold mb-2">Your watchlist is empty</h2>
            <p>Start adding movies and TV shows to your watchlist to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlist.map((movie) => (
              <div key={movie.id} className="relative group">
                <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => removeFromWatchlist(movie.id)}
                      className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all duration-300"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
                <h3 className="text-white text-sm mt-2 truncate">{movie.title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist; 