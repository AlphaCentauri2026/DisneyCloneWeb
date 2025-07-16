import React, { useEffect, useState } from 'react'
import globalAPI from '../services/globalAPI'

function Slider() {
    const [popularMovies, setPopularMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)

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

    // Auto-advance slider every 3 seconds
    useEffect(() => {
        if (popularMovies.length > 0) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % 15)
            }, 3000)

            return () => clearInterval(interval)
        }
    }, [popularMovies])

    if (loading) {
        return <div className="text-white text-center py-2">Loading popular movies...</div>
    }

    if (error) {
        return <div className="text-red-500 text-center py-2">{error}</div>
    }

    const sliderMovies = popularMovies.slice(0, 15)

    return (
        <div className="text-white">
            {/* Large Image Slider */}
            <div className="flex justify-center px-6 py-0">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-[1800px] overflow-hidden rounded-2xl border-4 border-transparent hover:border-white transition-all duration-300 shadow-2xl hover:shadow-white/20 drop-shadow-2xl">
                    {sliderMovies.map((movie, index) => (
                        <div
                            key={movie.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay with movie info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                                <div className="absolute bottom-20 left-8 md:left-16 lg:left-24 max-w-2xl">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                        {movie.title}
                                    </h2>
                                    <p className="text-lg md:text-xl text-gray-300 mb-4 line-clamp-3">
                                        {movie.overview}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                                            {movie.release_date?.split('-')[0]}
                                        </span>
                                        <span className="text-gray-300">
                                            Rating: {movie.vote_average?.toFixed(1)}/10
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center space-x-3 py-1">
                {sliderMovies.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`text-3xl font-black cursor-pointer transition-all duration-300 ${
                            index === currentSlide
                                ? 'text-white'
                                : 'text-gray-500/50 hover:text-gray-400/70'
                        }`}
                    >
                        •
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slider