import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css' 
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import Watchlist from './pages/Watchlist'
import Originals from './pages/Originals'
import Movies from './pages/Movies'
import Series from './pages/Series'
import DisneyPage from './pages/DisneyPage'
import PixarPage from './pages/PixarPage'
import MarvelPage from './pages/MarvelPage'
import StarWarsPage from './pages/StarWarsPage'
import NationalGeographicPage from './pages/NationalGeographicPage'

function App() {
  return (
    <Router>
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 55, 72, 0.7) 0%, rgba(26, 32, 44, 0.8) 25%, rgba(23, 25, 35, 0.85) 50%, rgba(15, 20, 25, 0.9) 75%, rgba(0, 0, 0, 0.95) 100%), url('https://image.tmdb.org/t/p/original/1E5baAaEse26fej7uHcjOgEE2t2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/originals" element={<Originals />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/disney" element={<DisneyPage />} />
              <Route path="/pixar" element={<PixarPage />} />
              <Route path="/marvel" element={<MarvelPage />} />
              <Route path="/star-wars" element={<StarWarsPage />} />
              <Route path="/national-geographic" element={<NationalGeographicPage />} />
            </Routes>
          </main>
          <Footer/>
        </div>
      </div>
    </Router>
  )
}

export default App
