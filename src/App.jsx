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
import Packs from './pages/store/Packs'
import ProductPack from './pages/store/ProductPack'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/tienda/cafe" element={<Coffee />} />
          <Route path="/tienda/accesorios" element={<Accesories />} />
          <Route path="/tienda/packs" element={<Packs />} />
          <Route path="/tienda/producto/cafe" element={<ProductCoffee />} />
          <Route path="/tienda/producto/accesorio" element={<ProductAccesory />} />
          <Route path="/tienda/producto/pack" element={<ProductPack />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
