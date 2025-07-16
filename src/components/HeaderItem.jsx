import React from 'react'
import { Link } from 'react-router-dom'

function HeaderItem({ icon: Icon, text, to, isActive = false }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 transition-colors relative group pb-1 ${
        isActive 
          ? 'text-white' 
          : 'text-white hover:text-gray-300'
      }`}
    >
      <Icon className="text-xl" />
      <span>{text}</span>
      {/* Animated underline */}
      <div className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ease-in-out ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`}></div>
    </Link>
  )
}

export default HeaderItem 