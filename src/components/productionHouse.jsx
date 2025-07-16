import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import disneyImage from '../assets/Images/disney.png'
import pixarImage from '../assets/Images/pixar.png'
import marvelImage from '../assets/Images/marvel.png'
import starWarsImage from '../assets/Images/starwar.png'
import nationalGImage from '../assets/Images/nationalG.png'
import disneyVideo from '../assets/Videos/disney.mp4'
import pixarVideo from '../assets/Videos/pixar.mp4'
import marvelVideo from '../assets/Videos/marvel.mp4'
import starWarsVideo from '../assets/Videos/star-wars.mp4'
import nationalGVideo from '../assets/Videos/national-geographic.mp4'

function ProductionHouse() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const navigate = useNavigate()

  const productionCompanies = [
    {
      name: 'Disney',
      image: disneyImage,
      video: disneyVideo,
      description: 'The Magic Kingdom',
      path: '/disney'
    },
    {
      name: 'Pixar',
      image: pixarImage,
      video: pixarVideo,
      description: 'Animation Excellence',
      path: '/pixar'
    },
    {
      name: 'Marvel',
      image: marvelImage,
      video: marvelVideo,
      description: 'Superhero Universe',
      path: '/marvel'
    },
    {
      name: 'Star Wars',
      image: starWarsImage,
      video: starWarsVideo,
      description: 'Galaxy Far Away',
      path: '/star-wars'
    },
    {
      name: 'National Geographic',
      image: nationalGImage,
      video: nationalGVideo,
      description: 'Explore the World',
      path: '/national-geographic'
    }
  ]

  const handleCardClick = (path) => {
    navigate(path)
  }

  return (
    <div className="text-white pt-0 pb-2 px-6">
        <div className="flex flex-wrap justify-center gap-8 max-w-[1800px] mx-auto">
            {productionCompanies.map((company, index) => (
                <div 
                    key={index}
                    className="relative h-40 w-[290px] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-3xl shadow-black/60 hover:shadow-black/80 border-4 border-transparent hover:border-white group"
                    style={{ backgroundColor: '#1a1a1a' }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => handleCardClick(company.path)}
                >
                    {/* Video Background */}
                    <video
                        src={company.video}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            hoveredCard === index ? 'opacity-100' : 'opacity-0'
                        }`}
                        muted
                        loop
                        playsInline
                        ref={(el) => {
                            if (el) {
                                if (hoveredCard === index) {
                                    el.play().catch(e => console.log('Video play failed:', e));
                                } else {
                                    el.pause();
                                }
                            }
                        }}
                    />
                    
                    {/* Image Background - Larger and fits perfectly to edges */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                        hoveredCard === index ? 'opacity-0' : 'opacity-100'
                    }`}>
                        <img
                            src={company.image}
                            alt={company.name}
                            className="w-full h-full object-contain p-2"
                        />
                    </div>


                </div>
            ))}
        </div>
    </div>
)
}

export default ProductionHouse