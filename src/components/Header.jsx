import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  AiOutlineHome, 
  AiOutlineSearch, 
  AiOutlinePlus,
  AiOutlineStar,
  AiOutlinePlayCircle,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineEllipsis
} from 'react-icons/ai'
import { BiTv } from 'react-icons/bi'
import HeaderItem from './HeaderItem'
import logo from '../assets/Images/logo.png'
import profileImage from '../assets/Images/103.png'

function Header() {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
  const location = useLocation()

  const navigationItems = [
    { icon: AiOutlineHome, text: 'Home', path: '/' },
    { icon: AiOutlineSearch, text: 'Search', path: '/search' },
    { icon: AiOutlinePlus, text: 'Watchlist', path: '/watchlist' },
    { icon: AiOutlineStar, text: 'Originals', path: '/originals' },
    { icon: AiOutlinePlayCircle, text: 'Movies', path: '/movies' },
    { icon: BiTv, text: 'Series', path: '/series' }
  ]

  const visibleItems = navigationItems.slice(0, 3)
  const hiddenItems = navigationItems.slice(3)

  const handleMoreClick = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen)
  }

  const handleItemClick = () => {
    setIsMoreMenuOpen(false)
  }

  return (
    <div className="w-full">
      {/* Main Header - Always visible navigation */}
      <div className="flex items-center justify-between px-4 py-2 lg:px-6 lg:py-2">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-4 lg:space-x-8 flex-1 min-w-0">
          {/* Logo */}
          <Link to="/">
            <img 
              src={logo} 
              className="w-[90px] lg:w-[115px] brightness-0 invert flex-shrink-0" 
              style={{ objectFit: "cover" }} 
              alt="Logo" 
            />
          </Link>
          
          {/* Full Navigation - Visible on larger screens */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-6">
            {navigationItems.map((item, index) => (
              <HeaderItem 
                key={index}
                icon={item.icon} 
                text={item.text}
                to={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>

          {/* Compact Navigation - Visible on small screens */}
          <nav className="flex md:hidden items-center space-x-2">
            {/* Always visible items */}
            {visibleItems.map((item, index) => (
              <HeaderItem 
                key={index}
                icon={item.icon} 
                text={item.text}
                to={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
            
            {/* Three dots menu for remaining items */}
            {hiddenItems.length > 0 && (
              <div className="relative">
                <div 
                  onClick={handleMoreClick}
                  className="flex items-center text-white hover:text-gray-300 transition-colors cursor-pointer"
                >
                  <span className="text-2xl font-bold text-white">⋮</span>
                </div>
                
                {/* Dropdown menu - Only show on small screens */}
                {isMoreMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-black border border-gray-800 rounded-md shadow-lg z-50 min-w-[150px] max-w-[200px] md:hidden">
                    {hiddenItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.path}
                        className={`flex items-center space-x-3 transition-colors px-4 py-3 hover:bg-gray-900 whitespace-nowrap ${
                          location.pathname === item.path 
                            ? 'text-white bg-gray-800' 
                            : 'text-white hover:text-gray-300'
                        }`}
                        onClick={handleItemClick}
                      >
                        <item.icon className="text-xl" />
                        <span>{item.text}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
        
        {/* Right side - User Profile */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="text-white text-sm hidden sm:block">Dad</span>
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default Header