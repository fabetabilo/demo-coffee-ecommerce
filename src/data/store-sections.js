// img/sections: imagenes de las secciones
import subscription from '../assets/img/sections/subscripcion.jpg'
import coffee from '../assets/img/sections/cafes.jpg'
import coffeemethod from '../assets/img/sections/cafeteras.jpg'
import accesories from '../assets/img/sections/accesorios.jpg'
import filters from '../assets/img/sections/filtros.jpg'
import grinders from '../assets/img/sections/molinos.jpg'
import packs from '../assets/img/sections/packs.jpg'

// export centralizado de colecciones/secciones de la tienda
export const STORE_SECTIONS = [
  {
    id: 'subscripcion',
    title: 'Subscripción',
    to: '/tienda/subscripcion',
    image: subscription,
    darkOverlay: false,
  },
  {
    id: 'cafe',
    title: 'Café',
    to: '/tienda/cafe',
    image: coffee,
    darkOverlay: false,
  },
  {
    id: 'metodos',
    title: 'Métodos',
    to: '/tienda/metodos',
    image: coffeemethod,
    darkOverlay: false,
  },
  {
    id: 'accesorios',
    title: 'Accesorios',
    to: '/tienda/accesorios',
    image: accesories,
    darkOverlay: false,
  },
  {
    id: 'filtros',
    title: 'Filtros',
    to: '/tienda/filtros',
    image: filters,
    darkOverlay: false,
  },
  {
    id: 'molinos',
    title: 'Molinos',
    to: '/tienda/molinos',
    image: grinders,
    darkOverlay: false,
  },
  {
    id: 'packs',
    title: 'Packs+',
    to: '/tienda/packs',
    image: packs,
    darkOverlay: false,
  },
]

export default STORE_SECTIONS
