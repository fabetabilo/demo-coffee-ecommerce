import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Store from './pages/Store'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='tienda' element={<Store />}/>
        </Routes>
      <Footer />
    </>
  )
}

export default App
