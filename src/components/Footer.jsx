import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AiOutlineGithub, 
  AiOutlineLinkedin, 
  AiOutlineTwitter, 
  AiOutlineMail,
  AiOutlineHeart
} from 'react-icons/ai';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-white text-xl font-bold mb-2">Potentia Labs</h3>
              <p className="text-sm leading-relaxed mb-4">
                A leading development studio specializing in cutting-edge web applications, 
                innovative user experiences, and scalable software solutions.
              </p>
            </div>
            
            {/* Educational Disclaimer */}
            <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="text-yellow-400 font-semibold mb-2">Educational Project</h4>
              <p className="text-xs leading-relaxed">
                This Disney+ clone is created for educational purposes only. All content, 
                trademarks, and intellectual property belong to their respective owners. 
                This project demonstrates modern web development techniques and is not 
                intended for commercial use.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-white transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/series" className="hover:text-white transition-colors">
                  TV Series
                </Link>
              </li>
              <li>
                <Link to="/originals" className="hover:text-white transition-colors">
                  Originals
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="hover:text-white transition-colors">
                  My Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/movies?filter=Disney" className="hover:text-white transition-colors">
                  Disney
                </Link>
              </li>
              <li>
                <Link to="/movies?filter=Pixar" className="hover:text-white transition-colors">
                  Pixar
                </Link>
              </li>
              <li>
                <Link to="/movies?filter=Marvel" className="hover:text-white transition-colors">
                  Marvel
                </Link>
              </li>
              <li>
                <Link to="/movies?filter=Star Wars" className="hover:text-white transition-colors">
                  Star Wars
                </Link>
              </li>
              <li>
                <Link to="/movies?filter=National Geographic" className="hover:text-white transition-colors">
                  National Geographic
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-semibold mb-4">Built With</h4>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full">React 18</span>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full">Vite</span>
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full">Tailwind CSS</span>
            <span className="bg-green-600 text-white px-3 py-1 rounded-full">TMDB API</span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full">JavaScript</span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full">React Router</span>
          </div>
        </div>

        {/* Social Links & Contact */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/potentialabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AiOutlineGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/potentialabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AiOutlineLinkedin size={24} />
              </a>
              <a 
                href="https://twitter.com/potentialabs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AiOutlineTwitter size={24} />
              </a>
              <a 
                href="mailto:hello@potentialabs.com" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AiOutlineMail size={24} />
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm">
                <span className="text-gray-500">Made with</span>
                <AiOutlineHeart className="inline mx-1 text-red-500" />
                <span className="text-gray-500">by Potentia Labs</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div className="text-center md:text-left">
              <p>&copy; {currentYear} Potentia Labs. All rights reserved.</p>
              <p className="text-gray-500 mt-1">
                This is a demo project for educational purposes only.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-gray-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookie Policy</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 