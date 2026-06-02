import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-bg via-bg to-surface">
        {/* Animated background gradient */}
        <div className="fixed inset-0 -z-20 opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-alt/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}
