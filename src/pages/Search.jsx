import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import globalAPI from '../services/globalAPI';
import MovieDetail from '../components/MovieDetail';
import TVShowDetail from '../components/TVShowDetail';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      try {
        const response = await globalAPI.searchMulti(searchQuery);
        // Filter results to only include movies and TV shows
        const filteredResults = response.data.results.filter(
          item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const getMediaTypeColor = (mediaType) => {
    return mediaType === 'movie' ? 'bg-blue-600' : 'bg-green-600';
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4">
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Search</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies, TV shows, and more..."
                className="w-full px-4 py-4 pl-12 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
              />
              <AiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search Results */}
          {isSearching && (
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p>Searching...</p>
            </div>
          )}

          {searchResults.length === 0 && !isSearching && searchQuery && (
            <div className="text-center text-gray-400">
              <p>No results found for "{searchQuery}"</p>
            </div>
          )}

          {!searchQuery && !isSearching && (
            <div className="text-center text-gray-400">
              <p>Search for your favorite movies and TV shows</p>
            </div>
          )}

          {/* Results Grid */}
          {searchResults.length > 0 && !isSearching && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Search Results for "{searchQuery}" ({searchResults.length} results)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((item) => (
                  <div
                    key={`${item.media_type}-${item.id}`}
                    className="relative group cursor-pointer"
                    onClick={() => handleItemClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleItemClick(item);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details for ${item.title || item.name}`}
                  >
                    <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-transparent hover:border-white">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error(`Failed to load image for: ${item.title || item.name}`);
                          e.target.src = 'https://via.placeholder.com/256x384/1a1a1a/ffffff?text=No+Image';
                        }}
                      />
                      <div className={`absolute top-2 right-2 ${getMediaTypeColor(item.media_type)} text-white text-xs px-2 py-1 rounded font-semibold`}>
                        {item.media_type === 'movie' ? 'MOVIE' : 'TV'}
                      </div>
                      {item.vote_average && (
                        <div className="absolute bottom-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded font-semibold">
                          {item.vote_average.toFixed(1)}
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <h3 className="text-white text-sm font-semibold truncate">
                          {item.title || item.name}
                        </h3>
                        <p className="text-gray-300 text-xs">
                          {item.release_date ? new Date(item.release_date).getFullYear() : 
                           item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedItem && selectedItem.media_type === 'movie' && (
        <MovieDetail
          movieId={selectedItem.id}
          onClose={handleCloseDetail}
        />
      )}

      {selectedItem && selectedItem.media_type === 'tv' && (
        <TVShowDetail
          showId={selectedItem.id}
          onClose={handleCloseDetail}
        />
      )}
    </>
  );
};

export default Search; 