import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Store from './pages/Store'
import Coffee from './pages/store/Coffee'
import Accesories from './pages/store/Accesories'
import ProductCoffee from './pages/store/ProductCoffee'
import ProductAccesory from './pages/store/ProductAccesory'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/tienda/cafe" element={<Coffee />} />
          <Route path="/tienda/accesorios" element={<Accesories />} />
          <Route path="/tienda/producto/cafe" element={<ProductCoffee />} />
          <Route path="/tienda/producto/accesorio" element={<ProductAccesory />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
