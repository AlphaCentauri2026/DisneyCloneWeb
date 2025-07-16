import axios from "axios";

const movieBaseURL = "https://api.themoviedb.org/3";
const api_key = '8352a0db43740127f95e4fed5bc1007f';

// Disney Movies APIs
const getPopularMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=2&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

const getRecommendedMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=2&sort_by=vote_average.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Pixar Movies API
const getPixarMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=3&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Pixar TV Series API
const getPixarTVSeries = () => {
  return axios.get(`${movieBaseURL}/discover/tv?with_companies=3&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Marvel Movies API
const getMarvelMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=420&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Marvel TV Series API
const getMarvelTVSeries = () => {
  return axios.get(`${movieBaseURL}/discover/tv?with_companies=420&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Star Wars Movies API
const getStarWarsMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=1&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Star Wars TV Series API
const getStarWarsTVSeries = () => {
  return axios.get(`${movieBaseURL}/discover/tv?with_companies=1&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// National Geographic Movies API
const getNationalGeographicMovies = () => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=7521&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// National Geographic TV Series API
const getNationalGeographicTVSeries = () => {
  return axios.get(`${movieBaseURL}/discover/tv?with_companies=7521&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

// Search API
const searchMulti = (query) => {
  return axios.get(`${movieBaseURL}/search/multi?api_key=${api_key}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
};

const getMovieGenres = () => {
  return axios.get(`${movieBaseURL}/genre/movie/list?api_key=${api_key}&language=en-US`);
};

const getMoviesByGenre = (genreId) => {
  return axios.get(`${movieBaseURL}/discover/movie?with_companies=2&with_genres=${genreId}&sort_by=popularity.desc&language=en-US&page=1&api_key=${api_key}`);
};

const getMovieDetails = (movieId) => {
  return axios.get(`${movieBaseURL}/movie/${movieId}?api_key=${api_key}&language=en-US&append_to_response=credits,videos`);
};

const getTVShowDetails = (showId) => {
  return axios.get(`${movieBaseURL}/tv/${showId}?api_key=${api_key}&language=en-US&append_to_response=credits,videos`);
};

export default {
    getPopularMovies,
    getRecommendedMovies,
    getPixarMovies,
    getPixarTVSeries,
    getMarvelMovies,
    getMarvelTVSeries,
    getStarWarsMovies,
    getStarWarsTVSeries,
    getNationalGeographicMovies,
    getNationalGeographicTVSeries,
    searchMulti,
    getMovieGenres,
    getMoviesByGenre,
    getMovieDetails,
    getTVShowDetails
};