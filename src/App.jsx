import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
