import React, { useState, useEffect } from 'react';
import globalAPI from '../services/globalAPI';
import GenreMovies from './GenreMovies';

const GenreSections = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Popular genres to display (we'll use these IDs directly)
  const popularGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ];

  // We'll display a subset of popular genres
  const displayGenres = popularGenres.slice(0, 6); // Show first 6 genres

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await globalAPI.getMovieGenres();
        setGenres(response.data.genres);
        setError(null);
      } catch (err) {
        setError('Failed to fetch genres');
        console.error('Error fetching genres:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-xl">Loading genres...</div>
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
    <div>
      {displayGenres.map((genre) => (
        <GenreMovies
          key={genre.id}
          genreId={genre.id}
          genreName={genre.name}
        />
      ))}
    </div>
  );
};

export default GenreSections; 