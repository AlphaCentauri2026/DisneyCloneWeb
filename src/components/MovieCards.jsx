import React, { useEffect, useState } from 'react'
import globalAPI from '../services/globalAPI'

function MovieCards() {
    const [popularMovies, setPopularMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                setLoading(true)
                const response = await globalAPI.getPopularMovies()
                setPopularMovies(response.data.results)
                setLoading(false)
            } catch (err) {
                console.error('Error fetching popular movies:', err)
                setError('Failed to fetch popular movies')
                setLoading(false)
            }
        }

        fetchPopularMovies()
    }, [])

    if (loading) {
        return <div className="text-white text-center py-8">Loading popular movies...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>
    }

    return (
        <div className="text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-16">
                {popularMovies.map((movie) => (
                    <div 
                        key={movie.id} 
                        className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl shadow-black/60 hover:shadow-black/80 border-4 border-transparent hover:border-white"
                    >
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto"
                        />
                        <div className="p-3">
                            <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                            <p className="text-gray-400 text-xs">{movie.release_date?.split('-')[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovieCards 