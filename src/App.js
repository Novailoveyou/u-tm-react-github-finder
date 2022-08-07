import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import urls from './config/urls'
import { GithubProvider } from './context/github/GithubContext'
import { AlertProvider } from './context/alert/AlertContext'
import Home from './pages/Home'
import About from './pages/About'
import User from './pages/User'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Alert from './components/layout/Alert'

const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path={urls.front.home} element={<Home />} />
                <Route path={urls.front.about} element={<About />} />
                <Route path={urls.front.userLogin} element={<User />} />
                <Route path={urls.front.notfound} element={<NotFound />} />
                <Route path={urls.front.any} element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  )
}

export default App
