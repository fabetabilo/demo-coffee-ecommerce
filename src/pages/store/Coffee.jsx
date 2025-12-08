import React from 'react'
import Banner from '../../components/ui/Banner'
import ProductCarousel from '../../components/ui/ProductCarousel'
import { demoproducts } from '../../data/demo/demo-products'
import coffeeHero from '../../assets/img/sections/cafes.jpg'
import '../../css/page.css'

function Coffee() {
    // !!! TEMPORAL, luego el backend se encarga de GET coffees.
    const coffeeProducts = demoproducts.filter((product) => product.categoria === 'cafes')

    return (
        <main>
            <Banner
                type="image"
                src={coffeeHero}
                alt="cafes-origenes"
                className="section"
                sectionTitle="CAFÉ"
                description="Lotes frescos, perfiles únicos y tostados diseñados para tu barra en casa."
                darkOverlay
            />
            <div className="main-container">
                <section className="page-section">
                    <ProductCarousel items={coffeeProducts} />
                </section>
            </div>
        </main>
    )
}

export default Coffee