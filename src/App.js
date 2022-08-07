import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import urls from './config/urls'
import { GithubProvider } from './context/github/GithubContext'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const App = () => {
  return (
    <GithubProvider>
      <Router>
        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Routes>
              <Route path={urls.front.home} element={<Home />} />
              <Route path={urls.front.about} element={<About />} />
              <Route path={urls.front.notfound} element={<NotFound />} />
              <Route path={urls.front.any} element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </GithubProvider>
  )
}

export default App
