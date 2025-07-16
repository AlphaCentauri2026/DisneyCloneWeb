# Disney+ Clone - Portfolio Project

A modern, responsive Disney+ clone built with React, featuring real movie and TV show data from TMDB API. This project demonstrates advanced React development skills, API integration, and modern web development practices.

![Disney+ Clone Preview](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Disney+Clone+Preview)

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.com)

## ✨ Features

### 🎬 **Content Management**
- **Real Movie & TV Data**: Integrated with TMDB API for authentic content
- **Multiple Production Houses**: Disney, Pixar, Marvel, Star Wars, National Geographic
- **Genre-based Filtering**: Browse content by categories like Action, Comedy, Drama, etc.
- **Advanced Search**: Search across movies and TV shows with real-time results

### 🎨 **User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Video Backgrounds**: Custom video backgrounds for each production house
- **Interactive Cards**: Hover effects, animations, and smooth transitions
- **Modal Details**: Rich movie/TV show detail overlays with cast, ratings, and descriptions

### 📱 **Interactive Features**
- **Watchlist Management**: Add/remove movies and TV shows to personal watchlist
- **Local Storage**: Persistent user preferences and watchlist data
- **Keyboard Navigation**: Full accessibility support with keyboard controls
- **Loading States**: Professional loading indicators and error handling

### 🎯 **Technical Excellence**
- **Modern React**: Built with React 18, hooks, and functional components
- **Performance Optimized**: Efficient rendering and API call management
- **Error Handling**: Comprehensive error states and fallback content
- **Accessibility**: ARIA labels, semantic HTML, and screen reader support

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **API**: TMDB (The Movie Database)
- **Icons**: React Icons
- **State Management**: React Hooks (useState, useEffect)
- **Build Tool**: Vite

## 📁 Project Structure

```
disney-clone-web/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Footer.jsx       # Site footer
│   │   ├── MovieDetail.jsx  # Movie detail modal
│   │   ├── TVShowDetail.jsx # TV show detail modal
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Movies.jsx      # All movies page
│   │   ├── Series.jsx      # All TV series page
│   │   ├── Search.jsx      # Search functionality
│   │   └── ...
│   ├── services/           # API services
│   │   └── globalAPI.js    # TMDB API integration
│   └── assets/             # Static assets
├── public/                 # Public assets and videos
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/disney-clone-web.git
   cd disney-clone-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Key Features Explained

### Production House Pages
Each production house (Disney, Pixar, Marvel, Star Wars, National Geographic) has its own dedicated page featuring:
- Custom video backgrounds
- Brand-specific content filtering
- Horizontal scrolling movie/TV show cards
- Interactive hover effects

### Search & Filtering
- **Multi-category search**: Search across movies and TV shows simultaneously
- **Genre filtering**: Filter content by specific genres
- **Production house filtering**: Browse content by specific studios
- **Real-time results**: Instant search results with loading states

### Watchlist Management
- **Add/Remove**: Toggle movies and TV shows in personal watchlist
- **Persistent Storage**: Watchlist saved in browser localStorage
- **Cross-page Sync**: Watchlist updates across all pages
- **Visual Feedback**: Clear indicators for watchlist status

## 🎨 Design Highlights

### Responsive Design
- **Mobile-first approach**: Optimized for all screen sizes
- **Flexible layouts**: Adaptive grid systems and card layouts
- **Touch-friendly**: Optimized for mobile interactions

### Visual Effects
- **Smooth animations**: CSS transitions and hover effects
- **Video backgrounds**: Custom video loops for production house pages
- **Gradient overlays**: Professional visual hierarchy
- **Loading states**: Skeleton screens and progress indicators

## 🔧 API Integration

### TMDB API Features
- **Movie Discovery**: Popular movies, top-rated content
- **TV Show Data**: Series information, episode details
- **Company Filtering**: Content by production companies
- **Genre Classification**: Categorized content browsing
- **Search Functionality**: Multi-parameter search

### Error Handling
- **Graceful degradation**: Fallback content for failed API calls
- **User feedback**: Clear error messages and retry options
- **Loading states**: Professional loading indicators

## 📱 Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG compliant color schemes

## 🚀 Deployment

This project can be deployed to any static hosting service:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from /docs
```

## 🤝 Contributing

This is a portfolio project, but contributions are welcome for educational purposes.

## 📄 License

This project is for educational purposes only. All movie and TV show data is provided by TMDB API.

## 🙏 Acknowledgments

- **TMDB API**: For providing comprehensive movie and TV show data
- **React Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **Disney**: For the original inspiration (this is a fan project)

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

**Note**: This is an educational project created for portfolio purposes. All content and branding rights belong to their respective owners.
