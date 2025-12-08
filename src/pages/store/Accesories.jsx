import React from 'react'
import Banner from '../../components/ui/Banner'
import ProductCarousel from '../../components/ui/ProductCarousel'
import { demoproducts } from '../../data/demo/demo-products'
import accesoriesHero from '../../assets/img/sections/accesorios.jpg'
import '../../css/page.css'

function Accesories() {
    // tipos que consideramos "accesorio"
    const accessoryTypes = ['metodos', 'filtros', 'molinos', 'balanzas', 'teteras', 'accesorios']

    const accessoryProducts = demoproducts.filter((prod) => {
        // categoria, o subcategoria
        if (prod.categoria === 'accesorios') return true
        return accessoryTypes.includes(String(prod.subcategoria || '').toLowerCase())
    })

    return (
        <main>
            <Banner
                type="image"
                src={accesoriesHero}
                alt="accesorios"
                className="section"
                sectionTitle="ACCESORIOS"
                description="Métodos, filtros, molinos y más para preparar tu mejor taza."
                darkOverlay
            />
            <div className="main-container">
                <section className="page-section">
                    <ProductCarousel items={accessoryProducts} />
                </section>
            </div>
        </main>
    )
}

export default Accesories
