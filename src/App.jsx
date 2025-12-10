import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import Coffee from './pages/store/Coffee'
import Accesories from './pages/store/Accesories'
import ProductCoffee from './pages/store/ProductCoffee'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/tienda/cafe" element={<Coffee />} />
          <Route path="/tienda/accesorios" element={<Accesories />} />
          <Route path="/tienda/producto" element={<ProductCoffee />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
